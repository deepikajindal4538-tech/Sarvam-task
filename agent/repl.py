import datetime
import os
import sys
from pathlib import Path
from typing import Optional

from prompt_toolkit import PromptSession
from prompt_toolkit.completion import WordCompleter
from prompt_toolkit.history import FileHistory
from prompt_toolkit.styles import Style

from .config import AVAILABLE_MODELS, AgentConfig
from .engine import AgentEngine
from .tools import TOOL_DEFINITIONS, execute_tool
from .ui import (
    console,
    print_banner,
    print_error,
    print_help_table,
    print_success,
    print_system,
    print_tool_result,
    print_tools_table,
    print_warning,
)

COMMANDS = [
    "/help",
    "/model",
    "/mode",
    "/tools",
    "/system",
    "/history",
    "/clear",
    "/save",
    "/bash",
    "/exit",
    "/quit",
]


class AgentREPL:
    """Interactive Read-Eval-Print Loop for Sarvam AI Agent."""

    def __init__(self, engine: AgentEngine):
        self.engine = engine
        self.config = engine.config

        history_file = Path.home() / ".sarvam_agent_history"
        self.completer = WordCompleter(COMMANDS + AVAILABLE_MODELS, ignore_case=True)

        self.style = Style.from_dict(
            {
                "prompt": "ansicyan bold",
                "model-badge": "ansigreen bold",
            }
        )

        self.session: PromptSession = PromptSession(
            history=FileHistory(str(history_file)),
            completer=self.completer,
        )

    def handle_command(self, cmd_line: str) -> bool:
        """Handle slash command. Returns True if command was handled, False to continue normal loop."""
        parts = cmd_line.strip().split(maxsplit=1)
        cmd = parts[0].lower()
        arg = parts[1].strip() if len(parts) > 1 else ""

        if cmd in ("/exit", "/quit"):
            print_system("Goodbye! Have a productive day.")
            sys.exit(0)

        elif cmd == "/help":
            print_help_table()
            return True

        elif cmd == "/tools":
            print_tools_table(TOOL_DEFINITIONS)
            return True

        elif cmd == "/model":
            if not arg:
                print_system(f"Active model: [bold green]{self.config.model}[/bold green]")
                console.print(f"[dim]Available models:[/dim] {', '.join(AVAILABLE_MODELS)}")
                console.print("[dim]Use [/dim][yellow]/model <name>[/yellow][dim] to change.[/dim]")
            else:
                self.config.model = arg
                print_success(f"Model switched to: [bold green]{arg}[/bold green]")
            return True

        elif cmd == "/mode":
            valid_modes = ["auto", "ask", "off"]
            if not arg:
                print_system(f"Current tool mode: [bold green]{self.config.tool_mode}[/bold green]")
                console.print(f"[dim]Options:[/dim] {', '.join(valid_modes)}")
                console.print("[dim]Use [/dim][yellow]/mode <auto|ask|off>[/yellow][dim] to change.[/dim]")
            elif arg.lower() in valid_modes:
                self.config.tool_mode = arg.lower()
                print_success(f"Tool mode updated to: [bold green]{self.config.tool_mode}[/bold green]")
            else:
                print_error(f"Invalid mode '{arg}'. Choose from: {', '.join(valid_modes)}")
            return True

        elif cmd == "/system":
            if not arg:
                print_system("Current System Prompt:")
                console.print(f"[italic]{self.config.system_prompt}[/italic]\n")
                console.print("[dim]Use [/dim][yellow]/system <new prompt>[/yellow][dim] to update.[/dim]")
            else:
                self.engine.update_system_prompt(arg)
                print_success("System prompt updated.")
            return True

        elif cmd == "/clear":
            self.engine.reset_conversation()
            print_success("Conversation history cleared. Fresh session started.")
            return True

        elif cmd == "/history":
            msgs = self.engine.messages
            print_system(f"Current conversation has {len(msgs)} message entries (including system & tool calls).")
            # Preview last 6 turns
            preview = msgs[-6:]
            for i, m in enumerate(preview, start=max(1, len(msgs) - 5)):
                role = m.get("role", "unknown")
                content = str(m.get("content", ""))
                snippet = content[:90].replace("\n", " ") + ("..." if len(content) > 90 else "")
                console.print(f" [dim]{i}.[/dim] [bold cyan]{role:<10}[/bold cyan]: {snippet}")
            return True

        elif cmd == "/bash":
            if not arg:
                print_warning("Usage: /bash <command>")
            else:
                print_system(f"Running terminal command: {arg}")
                out = execute_tool("bash", {"command": arg}, working_dir=self.config.working_dir)
                print_tool_result(out)
            return True

        elif cmd == "/save":
            filename = arg if arg else f"conversation_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
            filepath = Path(filename).expanduser().resolve()
            try:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(f"# Sarvam AI Conversation Transcript\n")
                    f.write(f"- Date: {datetime.datetime.now().isoformat()}\n")
                    f.write(f"- Model: {self.config.model}\n\n---\n\n")
                    for m in self.engine.messages:
                        role = m.get("role", "").upper()
                        f.write(f"### {role}\n\n")
                        if m.get("content"):
                            f.write(f"{m['content']}\n\n")
                        if m.get("tool_calls"):
                            f.write(f"```json\n{m['tool_calls']}\n```\n\n")
                print_success(f"Saved conversation history to [bold green]{filepath}[/bold green]")
            except Exception as e:
                print_error(f"Failed to save history: {e}")
            return True

        else:
            print_error(f"Unknown command '{cmd}'. Type [bold yellow]/help[/bold yellow] for available commands.")
            return True

    def run(self):
        """Main interaction loop."""
        print_banner(
            model=self.config.model,
            tool_mode=self.config.tool_mode,
            working_dir=self.config.working_dir,
        )

        while True:
            try:
                # Custom prompt display
                prompt_text = f"[{self.config.model}] sarvam > "
                user_input = self.session.prompt(prompt_text)

                if not user_input.strip():
                    continue

                # Handle slash commands
                if user_input.strip().startswith("/"):
                    self.handle_command(user_input.strip())
                    continue

                # Process turn with the engine
                self.engine.process_turn(user_input)

            except KeyboardInterrupt:
                console.print("\n[dim]Action cancelled. (Press Ctrl+D or type /exit to quit)[/dim]")
                continue
            except EOFError:
                print_system("\nExiting agent. Goodbye!")
                break
            except Exception as e:
                print_error(f"Unexpected error: {e}")
