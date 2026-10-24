import json
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from sarvamai import SarvamAI

from .config import AgentConfig, V2_MODELS
from .tools import TOOL_DEFINITIONS, execute_tool
from .ui import (
    confirm_tool,
    console,
    end_assistant_stream,
    print_assistant_chunk,
    print_assistant_markdown,
    print_error,
    print_reasoning,
    print_system,
    print_tool_call,
    print_tool_result,
    print_warning,
    spinner,
)


class AgentEngine:
    """Manages conversation state and communicates with Sarvam AI API."""

    def __init__(self, config: AgentConfig):
        self.config = config
        self.client = SarvamAI(api_subscription_key=config.api_key)
        self.messages: List[Dict[str, Any]] = []
        self._init_system_prompt()

    def _init_system_prompt(self):
        """Set initial system prompt message."""
        self.messages = [{"role": "system", "content": self.config.system_prompt}]

    def reset_conversation(self):
        """Clear conversation history keeping system prompt."""
        self._init_system_prompt()

    def update_system_prompt(self, new_prompt: str):
        """Update system prompt and refresh first message."""
        self.config.system_prompt = new_prompt
        if self.messages and self.messages[0].get("role") == "system":
            self.messages[0]["content"] = new_prompt
        else:
            self.messages.insert(0, {"role": "system", "content": new_prompt})

    def _call_sarvam_api(self, messages_payload: List[Dict[str, Any]], use_tools: bool):
        """Invoke Sarvam AI API via completions or completions_v2."""
        tools_param = TOOL_DEFINITIONS if use_tools else None
        model_name = self.config.model

        # Route to completions_v2 for v2 models
        if model_name in V2_MODELS:
            return self.client.chat.completions_v2(
                model=model_name,
                messages=messages_payload,
                tools=tools_param,
                temperature=self.config.temperature,
                max_tokens=self.config.max_tokens,
            )
        else:
            return self.client.chat.completions(
                model=model_name,
                messages=messages_payload,
                tools=tools_param,
                temperature=self.config.temperature,
                max_tokens=self.config.max_tokens,
            )

    def process_turn(self, user_input: str, max_tool_iterations: int = 8) -> Optional[str]:
        """Execute a full turn including multi-step tool invocations."""
        self.messages.append({"role": "user", "content": user_input})

        current_iteration = 0
        use_tools = self.config.tool_mode != "off"

        while current_iteration < max_tool_iterations:
            current_iteration += 1

            # Prepare API request
            with spinner(f"Waiting for {self.config.model}..."):
                try:
                    response = self._call_sarvam_api(self.messages, use_tools=use_tools)
                except Exception as e:
                    err_msg = str(e)
                    if "401" in err_msg or "unauthorized" in err_msg.lower():
                        print_error("Invalid or expired SARVAM_API_KEY. Please verify your key.")
                    elif "rate limit" in err_msg.lower() or "429" in err_msg:
                        print_error("Rate limit reached on Sarvam AI API. Please wait a moment.")
                    else:
                        print_error(f"Sarvam AI API request failed: {err_msg}")
                    # Remove last user message if it failed on first turn
                    if current_iteration == 1 and self.messages and self.messages[-1].get("role") == "user":
                        self.messages.pop()
                    return None

            if not response.choices:
                print_error("Received empty response from Sarvam AI.")
                return None

            choice = response.choices[0]
            msg = choice.message
            content = msg.content or ""
            reasoning = getattr(msg, "reasoning_content", None)
            tool_calls = getattr(msg, "tool_calls", None)

            # Display reasoning if available
            if reasoning:
                print_reasoning(reasoning)

            # Check if model requested tool execution
            if tool_calls and len(tool_calls) > 0 and use_tools:
                # Record assistant message with tool calls
                asst_entry: Dict[str, Any] = {
                    "role": "assistant",
                    "content": content,
                    "tool_calls": [],
                }
                for tc in tool_calls:
                    asst_entry["tool_calls"].append(
                        {
                            "id": tc.id,
                            "type": "function",
                            "function": {
                                "name": tc.function.name,
                                "arguments": tc.function.arguments,
                            },
                        }
                    )
                self.messages.append(asst_entry)

                # Process each tool call
                for tc in tool_calls:
                    tool_name = tc.function.name
                    raw_args = tc.function.arguments
                    try:
                        args = json.loads(raw_args) if isinstance(raw_args, str) else raw_args
                    except json.JSONDecodeError:
                        args = {"raw": raw_args}

                    print_tool_call(tool_name, args)

                    # Check permission if mode is 'ask'
                    execute_allowed = True
                    if self.config.tool_mode == "ask":
                        execute_allowed = confirm_tool(tool_name, args)

                    if execute_allowed:
                        with spinner(f"Executing {tool_name}..."):
                            tool_result = execute_tool(
                                name=tool_name,
                                arguments=args,
                                working_dir=self.config.working_dir,
                            )
                        print_tool_result(tool_result)
                    else:
                        tool_result = "Execution cancelled by user."
                        print_warning(f"Skipped execution of {tool_name}.")

                    # Add tool response to conversation
                    self.messages.append(
                        {
                            "role": "tool",
                            "tool_call_id": tc.id,
                            "content": tool_result,
                        }
                    )

                # Continue loop to send tool results back to model
                continue

            # No tool calls: final assistant answer
            if content:
                print_assistant_markdown(content)
                self.messages.append({"role": "assistant", "content": content})
                return content
            else:
                print_warning("Model did not return text content.")
                return ""

        print_warning(f"Reached maximum tool execution steps ({max_tool_iterations}).")
        return None
