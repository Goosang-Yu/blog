---
title: "저사양 노트북 + 고성능 서버로 개인용 Claude Code 만들기 (Phi-4 기반)"
date: "2025-12-27"
description: "고성능 서버에 Phi-4를 설치하고, 저사양 노트북에서 원격으로 연결해 Copilot/Claude Code와 유사한 LLM 에이전트를 구성하는 방법을 단계별로 정리한다."
category: "dev"
tags: ["phi-4", "local-llm", "agent", ]
field: "로그"
lang: "ko"
translationId: "local-llm"
thumbnail: "/images/posts/Phi-4.webp"
---

![phi-4](/images/posts/Phi-4.webp)

나는 **저사양 노트북**에서 LLM을 활용한 작업을 하고 싶었다. 하지만 Gemini, Claude와 같은 **API-only 모델**은 무료 토큰 제한이 있어 실사용에 제약이 크다.

그래서 다음과 같은 접근을 선택했다.

- 고성능 로컬 서버(GPU 보유)에 **Phi-4를 local 설치**
- 이를 **OpenAI-compatible API**로 서비스
- 노트북에서는 Claude Code / GitHub Copilot처럼 **현재 작업 중인 프로젝트 폴더의 파일을 직접 읽고, 수정하고, 분석하는 Agent**를 실행

이 글은 사실상 **개인용 Claude Code / Cursor / Copilot 서버를 직접 만드는 방법**에 대한 정리다.


## 목표

> 고성능 로컬 서버에 Phi-4를 올려 LLM 서버를 만들고,  
> 저사양 노트북에서 원격으로 접속하여  
> 내 프로젝트 폴더의 파일을 읽고/수정/분석하도록 한다.


## 초기 아키텍처 구상

```text
[노트북 (컴퓨팅 자원 제한적)]
    |
    |  SSH / HTTP
    |
[서버 (컴퓨팅 자원 풍부)]
    ├─ Phi-4 (LLM inference)
    ├─ Agent logic
    └─ Workspace (파일 접근)
```

이 구조는 직관적이지만 근본적인 문제가 있다. 바로, 이 구조에서는 서버에서 실행되는 Agent가 노트북 로컬 파일에 접근할 수 없다는 것이다. 당연히 현재 열어둔 프로젝트 폴더 인식를 인식하지 못하므로 파일을 매번 서버로 복사해야 한다.

이유는 파일 접근 권한은 Agent가 실행되는 머신에 종속되기 때문이다. 즉, 서버에서 실행되는 Agent가 노트북 로컬 파일에 접근할 수 없다는 것이다.

Copilot / Claude Code의 실제 구조를 보면,

```text
[노트북 (로컬)]
├─ Agent Runtime
│  ├─ file system access
│  ├─ shell access
│  ├─ editor context
│  └─ tool execution
│
│      (HTTP / OpenAI-compatible API)
│
└──────────────▶ [원격 LLM 서버 (Phi-4)]
                   └─ inference only
```

비유하자면, LLM은 ‘뇌’, 파일/명령/편집은 ‘손발’이다. 내 파일을 직접 다뤄야 하는 손발은 반드시 로컬에 있어야 한다.

## 최종 아키텍처
```text
노트북 (저사양)
├── agent.py            ← 여기서 실행
├── tools/
│   ├── read_file.py    ← 로컬 파일 접근
│   ├── write_file.py
│   └── run_shell.py
└── project/            ← 현재 작업 중인 폴더

            │
            │ HTTP (localhost:8000)
            ▼
서버 (고사양)
└── Phi-4 (vLLM OpenAI API)
```

역할 분리 요약  

|구성 요소	|실행 위치 |  
|---       |---      |  
|LLM (Phi-4) |서버 |
|Agent loop |노트북 |
|File access |노트북 |
|Shell 실행 |노트북 |
|GPU 연산 |서버 |

### 전제 조건
#### 서버 (고성능)
- GPU: RTX 3090 이상 (24GB VRAM 권장)
- OS: Ubuntu 20.04 / 22.04
- CUDA: 12.x
- Python ≥ 3.10

#### 노트북 (저사양)
- SSH 가능
- Python 실행 가능
- GPU 필요 없음

## 1. 서버에 Phi-4 설치
### 1-1. Conda 환경 생성
```bash
conda create -n phi4 python=3.10 -y
conda activate phi4
pip install --upgrade pip
```
### 1-2. Phi-4 모델 테스트 로딩
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
📌 이 단계는 GPU에서 모델이 정상 동작하는지 확인하는 용도다.

## 2. LLM 서버 만들기 (OpenAI API 호환)
### 2-1. vLLM 설치
```bash
pip install vllm
```
### 2-2. API 서버 실행
```bash
python -m vllm.entrypoints.openai.api_server \
  --model microsoft/phi-4 \
  --host 0.0.0.0 \
  --port 8000
```
이제 서버는 다음 API를 제공한다.

```bash
POST /v1/chat/completions
```

Claude / Gemini API와 동일한 역할이다.

## 3. 노트북에서 서버 연결 (SSH 터널링)
```bash
ssh -L 8000:localhost:8000 user@SERVER_IP
```
이후 노트북에서:

```bash
http://localhost:8000
```

→ 서버의 Phi-4 API에 연결됨

## 4. 로컬 Agent 구현 (핵심)
### 4-1. Agent 환경 준비
```bash
conda create -n local-agent python=3.10 -y
conda activate local-agent
pip install openai rich
```
### 4-2. OpenAI client를 Phi-4로 연결
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="none"
)
```
## 5. 로컬 Tool 구현
### 5-1. 파일 읽기
```python
def read_file(path: str) -> str:
    with open(path, "r") as f:
        return f.read()
```        

### 5-2. 파일 쓰기
```python
def write_file(path: str, content: str):
    with open(path, "w") as f:
        f.write(content)
```
### 5-3. 쉘 명령 실행
```python
import subprocess

def run_shell(cmd: str) -> str:
    return subprocess.check_output(cmd, shell=True, text=True)
```

📌 이 모든 코드는 노트북 로컬에서 실행된다.

## 6. Agent 루프 (Copilot 구조)

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

이 구조는 Claude Code / Cursor 내부 로직과 거의 동일하다.

## 7. 장점과 한계
장점
- 완전 무료 (local LLM)
- 토큰 제한 없음
- Copilot과 거의 동일한 UX
- 로컬 파일 직접 접근

한계
- reasoning depth는 GPT-4 / Claude 3.5보다 약함
- 긴 코드 리팩토링은 다소 불리
- system prompt 설계가 성능의 핵심

## 8. 권장 Agent System Prompt
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

## 핵심 요약
LLM은 원격, Agent는 로컬
이것이 Copilot과 Claude Code의 본질이다.