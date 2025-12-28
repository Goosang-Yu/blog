---
title: "Low-end Laptop + High-performance Server = Personal Claude Code (Phi-4)"
date: "2025-12-27"
description: "Set up a local LLM agent using Phi-4 on a high-performance server and a low-end laptop."
category: "dev"
tags: ["phi-4", "local-llm", "agent", ]
field: "logging"
lang: "en"
translationId: "local-llm"
thumbnail: "/images/posts/Phi-4.webp"
---

![phi-4](/images/posts/Phi-4.webp)

I wanted to use LLM for my work on a low-end laptop, but Gemini, Claude, and other API-only models have a free token limit, which limits their practical use.

So, I chose the following approach:

- Install **Phi-4 locally** on a high-performance server (with GPU)
- Serve it as an **OpenAI-compatible API**
- Run an **Agent** on the notebook to read, modify, and analyze files in the current project folder

This article is essentially a guide on how to create your own **personal Claude Code / Cursor / Copilot server**.


## Goal

> Install **Phi-4 locally** on a high-performance server (with GPU)
> Serve it as an **OpenAI-compatible API**
> Run an **Agent** on the notebook to read, modify, and analyze files in the current project folder


## Initial Architecture

```text
[Laptop (low-end)]
    |
    |  SSH / HTTP
    |
[Server (high-performance)]
    ├─ Phi-4 (LLM inference)
    ├─ Agent logic
    └─ Workspace (file access)
```

This architecture is intuitive, but there is a fundamental problem. The problem is that the Agent running on the server cannot access the local files on the notebook. Of course, the current project folder cannot be recognized, so files need to be copied to the server every time.

The reason is that file access permissions are dependent on the machine where the Agent is running. In other words, the Agent running on the server cannot access the local files on the notebook.

Copilot / Claude Code's actual architecture is as follows,

```text
[Laptop (local)]
├─ Agent Runtime
│  ├─ file system access
│  ├─ shell access
│  ├─ editor context
│  └─ tool execution
│
│      (HTTP / OpenAI-compatible API)
│
└──────────────▶ [Remote LLM Server (Phi-4)]
                   └─ inference only
```

As you can see, LLM is the 'brain', and file access, shell access, and editor context are 'hands and feet'. The hands and feet that need to directly handle my files must be on the local machine.

## Final Architecture
```text
Laptop (low-end)
├── agent.py            ← Here it runs
├── tools/
│   ├── read_file.py    ← Local file access
│   ├── write_file.py
│   └── run_shell.py
└── project/            ← Current working folder

            │
            │ HTTP (localhost:8000)
            ▼
Server (high-performance)
└── Phi-4 (vLLM OpenAI API)
```

Role separation summary  

|Component	|Execution Location |  
|---       |---      |  
|LLM (Phi-4) |Server |
|Agent loop |Notebook |
|File access |Notebook |
|Shell execution |Notebook |
|GPU operation |Server |

### Pre-requisites
#### Server (High-performance)
- GPU: RTX 3090 or higher (24GB VRAM recommended)
- OS: Ubuntu 20.04 / 22.04
- CUDA: 12.x
- Python ≥ 3.10

#### Notebook (Low-end)
- SSH connection possible
- Python execution possible
- No GPU required

## 1. Install Phi-4 on the server
### 1-1. Conda environment creation
```bash
conda create -n phi4 python=3.10 -y
conda activate phi4
pip install --upgrade pip
```
### 1-2. Phi-4 model loading test
```bash
pip install transformers accelerate torch
```
```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_id = "microsoft/phi-4"

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype="auto",
    device_map="auto"
)
```
📌 This step is to confirm that the model works normally on the GPU.

## 2. LLM server setup (OpenAI API compatibility)
### 2-1. vLLM installation
```bash
pip install vllm
```
### 2-2. API server execution
```bash
python -m vllm.entrypoints.openai.api_server \
  --model microsoft/phi-4 \
  --host 0.0.0.0 \
  --port 8000
```
Now the server provides the following API.

```bash
POST /v1/chat/completions
```

This API has the same role as Claude / Gemini API.

## 3. Laptop to server connection (SSH tunneling)
```bash
ssh -L 8000:localhost:8000 user@SERVER_IP
```
After this, the laptop can access:

```bash
http://localhost:8000
```

→ The laptop can connect to the server's Phi-4 API.

## 4. Local Agent implementation (Core)
### 4-1. Agent environment setup
```bash
conda create -n local-agent python=3.10 -y
conda activate local-agent
pip install openai rich
```
### 4-2. OpenAI client connection to Phi-4
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="none"
)
```
## 5. Local Tool implementation
### 5-1. File reading
```python
def read_file(path: str) -> str:
    with open(path, "r") as f:
        return f.read()
```        

### 5-2. File writing
```python
def write_file(path: str, content: str):
    with open(path, "w") as f:
        f.write(content)
```
### 5-3. Shell command execution
```python
import subprocess

def run_shell(cmd: str) -> str:
    return subprocess.check_output(cmd, shell=True, text=True)
```

📌 All this code runs locally on the notebook.

## 6. Agent loop (Copilot structure)

```python

messages = [
    {"role": "system", "content": "You are a local coding agent."}
]

while True:
    user_input = input(">>> ")
    messages.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="microsoft/phi-4",
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )

    msg = response.choices[0].message

    if msg.tool_calls:
        ...
    else:
        print(msg.content)
```

This structure is almost the same as Claude Code / Cursor internal logic.

## 7. Advantages and disadvantages
Advantages
- Completely free (local LLM)
- No token limit
- Almost the same UX as Copilot
- Direct access to local files

Disadvantages
- reasoning depth is less than GPT-4 / Claude 3.5
- Long code refactoring is slightly disadvantageous
- System prompt design is the key to performance

## 8. Recommended Agent System Prompt
```text
You are a coding agent.
You can:
- Read files
- Modify files
- Run shell commands

Rules:
- Never hallucinate file contents
- Always read files before modifying
- Explain your plan before execution
```

##  Core summary
LLM is remote, Agent is local
This is the essence of Copilot and Claude Code.