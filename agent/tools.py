import json
import os
import subprocess
import sys
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

TOOL_DEFINITIONS = [
    {
        "type": "function",
        "function": {
            "name": "bash",
            "description": "Execute a bash shell command in the working directory and return stdout, stderr, and exit code.",
            "parameters": {
                "type": "object",
                "properties": {
                    "command": {
                        "type": "string",
                        "description": "The command string to execute (e.g. 'ls -la', 'git status', 'pytest').",
                    }
                },
                "required": ["command"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "Read the contents of a text file, optionally specifying start and end line numbers.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "The path to the file to read.",
                    },
                    "start_line": {
                        "type": "integer",
                        "description": "Optional starting line number (1-based).",
                    },
                    "end_line": {
                        "type": "integer",
                        "description": "Optional ending line number (inclusive).",
                    },
                },
                "required": ["path"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "write_file",
            "description": "Write or overwrite content into a file at the specified path.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "The path of the file to create or overwrite.",
                    },
                    "content": {
                        "type": "string",
                        "description": "The full text content to write into the file.",
                    },
                },
                "required": ["path", "content"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "edit_file",
            "description": "Find and replace an exact string inside an existing file.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "The path of the file to edit.",
                    },
                    "target": {
                        "type": "string",
                        "description": "The exact existing text to replace.",
                    },
                    "replacement": {
                        "type": "string",
                        "description": "The new replacement text.",
                    },
                },
                "required": ["path", "target", "replacement"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "list_directory",
            "description": "List files and directories in a given path with their types and sizes.",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "The directory path to list (defaults to '.').",
                    }
                },
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "python_eval",
            "description": "Execute a Python script or expression in an isolated subprocess and return its stdout, stderr, and result.",
            "parameters": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string",
                        "description": "The Python code snippet to execute.",
                    }
                },
                "required": ["code"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "web_search",
            "description": "Perform an internet search for documentation, packages, error messages, or questions.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query string.",
                    }
                },
                "required": ["query"],
            },
        },
    },
]


def tool_bash(command: str, cwd: Optional[Path] = None, timeout: int = 45) -> str:
    """Execute bash command."""
    try:
        res = subprocess.run(
            command,
            shell=True,
            cwd=cwd or Path.cwd(),
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        out = res.stdout
        err = res.stderr
        exit_code = res.returncode

        output_parts = []
        if out:
            output_parts.append(out.strip())
        if err:
            output_parts.append(f"[stderr]\n{err.strip()}")
        if not output_parts:
            output_parts.append("(command completed with no output)")

        res_str = "\n".join(output_parts)
        if len(res_str) > 6000:
            res_str = res_str[:6000] + f"\n... [truncated {len(res_str) - 6000} characters]"

        return f"Exit code: {exit_code}\nOutput:\n{res_str}"
    except subprocess.TimeoutExpired:
        return f"Error: Command timed out after {timeout} seconds."
    except Exception as e:
        return f"Error executing command: {e}"


def tool_read_file(path: str, start_line: Optional[int] = None, end_line: Optional[int] = None) -> str:
    """Read file content with line numbers."""
    try:
        p = Path(path).expanduser().resolve()
        if not p.exists():
            return f"Error: File '{path}' does not exist."
        if not p.is_file():
            return f"Error: '{path}' is not a regular file."

        with open(p, "r", encoding="utf-8", errors="replace") as f:
            lines = f.readlines()

        total = len(lines)
        start = (start_line - 1) if (start_line and start_line > 0) else 0
        end = end_line if (end_line and end_line <= total) else total

        selected = lines[start:end]
        output = [f"{start + i + 1:4d} | {line.rstrip()}" for i, line in enumerate(selected)]
        header = f"File: {p} (showing lines {start + 1}-{min(end, total)} of {total})\n"
        return header + "\n".join(output)
    except Exception as e:
        return f"Error reading file '{path}': {e}"


def tool_write_file(path: str, content: str) -> str:
    """Write or overwrite file."""
    try:
        p = Path(path).expanduser().resolve()
        p.parent.mkdir(parents=True, exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            f.write(content)
        return f"Successfully wrote {len(content)} characters to '{p}'."
    except Exception as e:
        return f"Error writing file '{path}': {e}"


def tool_edit_file(path: str, target: str, replacement: str) -> str:
    """Find and replace text in a file."""
    try:
        p = Path(path).expanduser().resolve()
        if not p.exists():
            return f"Error: File '{path}' does not exist."
        with open(p, "r", encoding="utf-8") as f:
            content = f.read()

        if target not in content:
            return f"Error: Target text was not found in '{path}'."

        count = content.count(target)
        new_content = content.replace(target, replacement, 1)
        with open(p, "w", encoding="utf-8") as f:
            f.write(new_content)
        return f"Successfully replaced 1 occurrence (of {count} total) in '{p}'."
    except Exception as e:
        return f"Error editing file '{path}': {e}"


def tool_list_directory(path: str = ".") -> str:
    """List directory contents."""
    try:
        p = Path(path).expanduser().resolve()
        if not p.exists():
            return f"Error: Directory '{path}' does not exist."
        if not p.is_dir():
            return f"Error: '{path}' is not a directory."

        entries = sorted(list(p.iterdir()), key=lambda x: (not x.is_dir(), x.name.lower()))
        rows = []
        for e in entries:
            kind = "DIR " if e.is_dir() else "FILE"
            size = f"{e.stat().st_size:,} B" if e.is_file() else "-"
            rows.append(f"[{kind}] {e.name:<30} {size}")

        res = f"Contents of {p} ({len(entries)} items):\n" + "\n".join(rows)
        if len(res) > 6000:
            res = res[:6000] + "\n... [truncated]"
        return res
    except Exception as e:
        return f"Error listing directory '{path}': {e}"


def tool_python_eval(code: str) -> str:
    """Evaluate python code in subprocess."""
    try:
        res = subprocess.run(
            [sys.executable, "-c", code],
            capture_output=True,
            text=True,
            timeout=30,
        )
        out = res.stdout
        err = res.stderr
        output = []
        if out:
            output.append(out.strip())
        if err:
            output.append(f"[stderr]\n{err.strip()}")
        if not output:
            output.append("(code executed with no output)")
        return f"Exit code: {res.returncode}\n" + "\n".join(output)
    except subprocess.TimeoutExpired:
        return "Error: Python execution timed out (30s)."
    except Exception as e:
        return f"Error executing Python code: {e}"


def tool_web_search(query: str) -> str:
    """Search web using DuckDuckGo Instant Answer API."""
    try:
        encoded = urllib.parse.urlencode({"q": query, "format": "json", "no_html": "1", "skip_disambig": "1"})
        url = f"https://api.duckduckgo.com/?{encoded}"
        req = urllib.request.Request(url, headers={"User-Agent": "SarvamAgent/1.0"})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode("utf-8"))

        abstract = data.get("AbstractText", "")
        heading = data.get("Heading", "")
        answer = data.get("Answer", "")
        related = data.get("RelatedTopics", [])

        results = []
        if heading and abstract:
            results.append(f"**{heading}**: {abstract}")
        elif answer:
            results.append(f"**Answer**: {answer}")

        for topic in related[:4]:
            if isinstance(topic, dict) and "Text" in topic:
                results.append(f"- {topic['Text']}")

        if not results:
            return f"No direct summary found for '{query}'. Try a more specific search or consult documentation."
        return f"Search results for '{query}':\n" + "\n".join(results)
    except Exception as e:
        return f"Search failed: {e}"


def execute_tool(name: str, arguments: Dict[str, Any], working_dir: Optional[Path] = None) -> str:
    """Dispatch tool call by name and arguments."""
    try:
        if name == "bash":
            return tool_bash(command=arguments.get("command", ""), cwd=working_dir)
        elif name == "read_file":
            return tool_read_file(
                path=arguments.get("path", ""),
                start_line=arguments.get("start_line"),
                end_line=arguments.get("end_line"),
            )
        elif name == "write_file":
            return tool_write_file(path=arguments.get("path", ""), content=arguments.get("content", ""))
        elif name == "edit_file":
            return tool_edit_file(
                path=arguments.get("path", ""),
                target=arguments.get("target", ""),
                replacement=arguments.get("replacement", ""),
            )
        elif name == "list_directory":
            return tool_list_directory(path=arguments.get("path", "."))
        elif name == "python_eval":
            return tool_python_eval(code=arguments.get("code", ""))
        elif name == "web_search":
            return tool_web_search(query=arguments.get("query", ""))
        else:
            return f"Error: Unknown tool '{name}'."
    except Exception as e:
        return f"Error executing tool '{name}': {e}"
