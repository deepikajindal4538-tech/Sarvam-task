import json
from pathlib import Path
from typing import Any, Dict, Optional

from rich.box import ROUNDED
from rich.console import Console
from rich.markdown import Markdown
from rich.panel import Panel
from rich.prompt import Confirm
from rich.status import Status
from rich.syntax import Syntax
from rich.table import Table
from rich.text import Text

console = Console()


def print_banner(model: str, tool_mode: str, working_dir: Path):
    """Display startup banner."""
    title_text = Text("⚡ SARVAM AI INTERACTIVE CLI AGENT ⚡", style="bold cyan")
    content = Text()
    content.append("• Model:        ", style="dim")
    content.append(f"{model}\n", style="bold green")
    content.append("• Tool Mode:    ", style="dim")
    mode_color = "green" if tool_mode == "auto" else ("yellow" if tool_mode == "ask" else "red")
    content.append(f"{tool_mode.upper()}\n", style=f"bold {mode_color}")
    content.append("• Working Dir:  ", style="dim")
    content.append(f"{working_dir}\n\n", style="italic")
    content.append("Type ", style="dim")
    content.append("/help", style="bold yellow")
    content.append(" to see all commands. Press ", style="dim")
    content.append("Ctrl+C", style="bold magenta")
    content.append(" to interrupt, ", style="dim")
    content.append("Ctrl+D", style="bold magenta")
    content.append(" to exit.", style="dim")

    panel = Panel(
        content,
        title=title_text,
        title_align="center",
        border_style="bright_blue",
        box=ROUNDED,
        padding=(1, 2),
    )
    console.print(panel)


def print_assistant_chunk(chunk: str):
    """Stream assistant token directly."""
    console.print(chunk, end="", highlight=False)


def end_assistant_stream():
    """Print newline after stream finishes."""
    console.print()


def print_assistant_markdown(content: str):
    """Render full markdown block for assistant."""
    md = Markdown(content)
    console.print()
    console.print(md)
    console.print()


def print_reasoning(content: str):
    """Display reasoning / thought process."""
    if not content:
        return
    text = Text(content.strip(), style="dim italic")
    panel = Panel(
        text,
        title="🤔 Thinking Process",
        border_style="magenta",
        box=ROUNDED,
        padding=(0, 1),
    )
    console.print(panel)


def print_tool_call(tool_name: str, args: Dict[str, Any]):
    """Render a visual card for tool execution."""
    args_json = json.dumps(args, indent=2)
    syntax = Syntax(args_json, "json", theme="monokai", word_wrap=True)
    panel = Panel(
        syntax,
        title=f"🛠️ Tool Call: [bold yellow]{tool_name}[/bold yellow]",
        border_style="cyan",
        box=ROUNDED,
        padding=(0, 1),
    )
    console.print(panel)


def print_tool_result(result: str, max_lines: int = 15):
    """Render a card for tool output."""
    lines = result.strip().splitlines()
    if len(lines) > max_lines:
        display_text = "\n".join(lines[:max_lines]) + f"\n... [{len(lines) - max_lines} more lines]"
    else:
        display_text = result.strip()

    text = Text(display_text, style="dim white")
    panel = Panel(
        text,
        title="📋 Tool Result",
        border_style="green",
        box=ROUNDED,
        padding=(0, 1),
    )
    console.print(panel)


def confirm_tool(tool_name: str, args: Dict[str, Any]) -> bool:
    """Prompt user to confirm executing a tool."""
    console.print(f"[bold yellow]⚠️  Action required:[/bold yellow] Agent wants to run [bold cyan]{tool_name}[/bold cyan]")
    try:
        return Confirm.ask("Execute this tool?", default=True)
    except (KeyboardInterrupt, EOFError):
        return False


def print_system(msg: str):
    """Print system notification."""
    console.print(f"[bold blue]ℹ[/bold blue]  {msg}")


def print_warning(msg: str):
    """Print warning notification."""
    console.print(f"[bold yellow]⚠️[/bold yellow]  {msg}")


def print_error(msg: str):
    """Print error notification."""
    console.print(f"[bold red]❌ Error:[/bold red] {msg}")


def print_success(msg: str):
    """Print success notification."""
    console.print(f"[bold green]✔[/bold green]  {msg}")


def print_help_table():
    """Print formatted help commands table."""
    table = Table(title="Interactive CLI Agent Commands", box=ROUNDED, border_style="cyan")
    table.add_column("Command", style="bold yellow", width=22)
    table.add_column("Description", style="white")

    table.add_row("/help", "Show this help table")
    table.add_row("/model [name]", "Show or change active model (e.g. /model sarvam-105b)")
    table.add_row("/mode [auto|ask|off]", "Change tool execution mode (auto, ask, off)")
    table.add_row("/tools", "List all available agent tools and descriptions")
    table.add_row("/system [prompt]", "View or update the agent's system prompt")
    table.add_row("/history", "View message count and recent dialogue history")
    table.add_row("/clear", "Clear chat memory and reset conversation")
    table.add_row("/save [path]", "Export conversation transcript to Markdown file")
    table.add_row("/bash <cmd>", "Directly run a bash command in terminal")
    table.add_row("/exit or /quit", "Exit the agent")

    console.print()
    console.print(table)
    console.print()


def print_tools_table(tools_defs: list):
    """Print table of available tools."""
    table = Table(title="Available Agent Tools", box=ROUNDED, border_style="cyan")
    table.add_column("Tool Name", style="bold green", width=18)
    table.add_column("Description", style="white")
    table.add_column("Required Args", style="cyan")

    for t in tools_defs:
        fn = t.get("function", {})
        name = fn.get("name", "")
        desc = fn.get("description", "")
        req = ", ".join(fn.get("parameters", {}).get("required", [])) or "none"
        table.add_row(name, desc, req)

    console.print()
    console.print(table)
    console.print()


def spinner(text: str = "Thinking...") -> Status:
    """Return status spinner."""
    return console.status(f"[bold cyan]{text}[/bold cyan]", spinner="dots")
