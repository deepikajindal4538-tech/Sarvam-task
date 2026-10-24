#!/usr/bin/env python3
"""
Sarvam AI Interactive CLI Agent
An autonomous, tool-equipped terminal assistant powered by Sarvam AI.
"""

import argparse
import os
import sys
from pathlib import Path

from agent.config import AgentConfig, AVAILABLE_MODELS, load_env, save_api_key_to_env
from agent.engine import AgentEngine
from agent.repl import AgentREPL
from agent.ui import console, print_error, print_success, print_system


def get_api_key(cli_key: str = None) -> str:
    """Retrieve or interactively prompt for Sarvam API key."""
    load_env()
    key = cli_key or os.environ.get("SARVAM_API_KEY")

    if key and key.strip():
        return key.strip()

    # Prompt user interactively
    console.print()
    console.print("[bold yellow]🔑 Sarvam AI API Key Required[/bold yellow]")
    console.print(
        "No [cyan]SARVAM_API_KEY[/cyan] was detected in your environment or [cyan].env[/cyan] file.\n"
        "You can get an API key from [link=https://www.sarvam.ai]https://www.sarvam.ai[/link]."
    )
    console.print()

    try:
        from rich.prompt import Confirm, Prompt

        entered_key = Prompt.ask("Enter your Sarvam API Key", password=True)
        if not entered_key.strip():
            print_error("API key cannot be empty. Exiting.")
            sys.exit(1)

        entered_key = entered_key.strip()
        should_save = Confirm.ask("Save this key to .env for future sessions?", default=True)
        if should_save:
            save_api_key_to_env(entered_key)
            print_success("Saved key to .env")

        return entered_key
    except (KeyboardInterrupt, EOFError):
        console.print("\nAborted.")
        sys.exit(1)


def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Sarvam AI Interactive CLI Agent - Autonomous terminal assistant with local tool calling."
    )
    parser.add_argument(
        "-m",
        "--model",
        default="sarvam-105b-conversations",
        choices=AVAILABLE_MODELS,
        help="Model to use (default: sarvam-105b-conversations).",
    )
    parser.add_argument(
        "--mode",
        choices=["auto", "ask", "off"],
        default="auto",
        help="Tool execution mode: 'auto' (run automatically), 'ask' (confirm before running), 'off' (plain chat).",
    )
    parser.add_argument(
        "--key",
        dest="api_key",
        default=None,
        help="Sarvam AI subscription API key (overrides .env).",
    )
    parser.add_argument(
        "prompt",
        nargs="*",
        help="Optional initial prompt. If omitted, opens interactive REPL mode.",
    )
    return parser.parse_args()


def main():
    """Main program entry point."""
    args = parse_args()

    api_key = get_api_key(args.api_key)

    config = AgentConfig(
        api_key=api_key,
        model=args.model,
        tool_mode=args.mode,
        working_dir=Path.cwd(),
    )

    engine = AgentEngine(config=config)

    # If prompt arguments were passed, run once and exit
    if args.prompt:
        query = " ".join(args.prompt)
        print_system(f"Running query with model [bold green]{config.model}[/bold green]...")
        engine.process_turn(query)
        sys.exit(0)

    # Otherwise start interactive REPL session
    repl = AgentREPL(engine)
    repl.run()


if __name__ == "__main__":
    main()
