# Sarvam AI Interactive CLI Agent

An autonomous, tool-equipped interactive terminal agent powered by the **Sarvam AI SDK**.

---

## ✨ Features

- **Interactive REPL**: Powered by `prompt_toolkit` and `rich`, featuring persistent history (`~/.sarvam_agent_history`), auto-completion for slash commands and models, syntax-highlighted Markdown, and graceful `Ctrl+C` interrupt handling.
- **Autonomous Tool Calling**:
  - `bash`: Execute terminal commands with captured stdout/stderr and exit codes.
  - `read_file`: Inspect files with line numbering and range selection.
  - `write_file`: Create and overwrite files.
  - `edit_file`: Targeted search-and-replace text modifications.
  - `list_directory`: Explore filesystem directories and file metadata.
  - `python_eval`: Execute arbitrary Python code snippets in an isolated subprocess.
  - `web_search`: Perform web queries via DuckDuckGo.
- **Permission Modes**:
  - `auto`: Agent invokes tools autonomously to accomplish user tasks.
  - `ask`: Prompts the user for interactive confirmation before executing tools.
  - `off`: Standard chat completion without tool invocation.
- **Multi-Model Support**:
  - `sarvam-105b-conversations` (Default conversational model)
  - `sarvam-105b` (Base language model)
  - `deepseekv4.1-flash` (via completions v2)
  - `glm5.3` (via completions v2)
  - `gemma4` (via completions v2)
- **Built-in In-Session Slash Commands**:
  - `/help`: Display help reference table.
  - `/model [name]`: View or switch active model.
  - `/mode [auto|ask|off]`: Switch tool execution mode.
  - `/tools`: List registered tools and parameter descriptions.
  - `/system [prompt]`: Inspect or update the agent's system prompt.
  - `/history`: Preview conversation turns and message count.
  - `/save [path]`: Export conversation transcript to a Markdown file.
  - `/bash <command>`: Directly run a terminal command.
  - `/clear`: Reset dialogue memory and start fresh.
  - `/exit` or `/quit`: Cleanly exit the session.

---

## 🚀 Quick Start

### 1. Requirements

Install required dependencies:

```bash
pip install sarvamai rich prompt_toolkit
```

### 2. Configure API Key

Ensure your `SARVAM_API_KEY` is in your `.env` file or environment:

```bash
export SARVAM_API_KEY="your-sarvam-api-key"
```

> **Note:** If `SARVAM_API_KEY` is not found, the agent will interactively prompt you for it on startup and optionally save it to `.env`.

### 3. Launch Interactive Session

```bash
python main.py
```
or:
```bash
./agent.py
```

### 4. Command Line Flags

You can also pass arguments directly:

```bash
# Launch with specific model and permission mode
python main.py --model sarvam-105b-conversations --mode ask

# Run a one-shot query non-interactively
python main.py "List all python files in this repo and explain what they do"
```

---

## 🛠 Project Structure

```
sarvam/
├── agent/
│   ├── __init__.py
│   ├── config.py    # Configuration, models, and .env handling
│   ├── tools.py     # Tool definitions and execution dispatchers
│   ├── engine.py    # Multi-turn reasoning and tool-calling agent loop
│   ├── ui.py        # Rich console formatting, cards, banners, and spinners
│   └── repl.py      # Prompt-toolkit REPL, history, and slash command handling
├── main.py          # Primary entrypoint CLI
├── agent.py         # Executable shortcut
└── README.md
```
# Sarvam-task
