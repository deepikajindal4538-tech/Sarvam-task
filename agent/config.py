import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional

# Supported models across completions and completions_v2
AVAILABLE_MODELS = [
    "sarvam-105b-conversations",
    "sarvam-105b",
    "deepseekv4.1-flash",
    "glm5.3",
    "gemma4",
]

V2_MODELS = {"deepseekv4.1-flash", "glm5.3", "gemma4"}

DEFAULT_SYSTEM_PROMPT = (
    "You are an intelligent, proactive CLI assistant powered by Sarvam AI. "
    "You have access to tools to interact with the local filesystem, run terminal commands, "
    "and execute Python code. Use them when helpful to answer questions accurately and perform tasks. "
    "Format your responses cleanly in Markdown."
)


def find_env_file() -> Path:
    """Locate .env file in the current directory or parents."""
    curr = Path.cwd()
    for parent in [curr, *curr.parents]:
        env_path = parent / ".env"
        if env_path.exists():
            return env_path
    return curr / ".env"


def load_env():
    """Load environment variables from .env file if available."""
    env_file = find_env_file()
    if env_file.exists():
        try:
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        os.environ.setdefault(k.strip(), v.strip().strip("'\""))
        except Exception:
            pass


def save_api_key_to_env(api_key: str):
    """Save the provided API key into the .env file."""
    env_file = find_env_file()
    lines = []
    key_written = False

    if env_file.exists():
        try:
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    if line.strip().startswith("SARVAM_API_KEY="):
                        lines.append(f"SARVAM_API_KEY={api_key}\n")
                        key_written = True
                    else:
                        lines.append(line)
        except Exception:
            pass

    if not key_written:
        lines.append(f"SARVAM_API_KEY={api_key}\n")

    try:
        with open(env_file, "w", encoding="utf-8") as f:
            f.writelines(lines)
    except Exception:
        pass


@dataclass
class AgentConfig:
    api_key: str
    model: str = "sarvam-105b-conversations"
    system_prompt: str = DEFAULT_SYSTEM_PROMPT
    tool_mode: str = "auto"  # "auto", "ask", or "off"
    stream: bool = True
    temperature: float = 0.7
    max_tokens: int = 4096
    working_dir: Path = field(default_factory=Path.cwd)
