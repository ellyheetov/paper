---
title: 2. AI 작업 수행 방식
description: AI 가 실제로 작업하는 방법 Skill, Memory, RAG, MCP
image: https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D
date: 2026-11-02
---

## 1. 스킬(Skill)

> 특정 작업을 수행하는 방법을 미리 정의한 메뉴얼

매번 AI에게 작업 방법을 설명하는 대신, 해당 작업의 규칙과 절차를 스킬로 만들어 놓는 거예요.

예시: Swift Code Review Skill

이 스킬이 실행되면 다음을 수행한다.

1. Swift 코드를 분석한다.
2. 메모리 누수 가능성을 확인한다.
3. retain cycle이 발생할 수 있는지 확인한다.
4. Swift Concurrency 사용이 적절한지 확인한다.
5. 개선할 부분을 이유와 함께 제안한다.

이후 AI에게 코드 리뷰를 요청하면 스킬에 정의된 방식으로 작업해요.

## 2. 메모리(Memory)

> 이전 정보를 저장하고 활용하는 기능

AI가 이전에 알게된 정보를 이후 대화나 작업에서 활용하는 개념이에요. Memory 에는 사용자 선호 정보, 진행중인 작업의 상태, 이전에 결정한 사항, 반복적으로 활용해야 하는 정보 등이 있어요.

Memory 와 Context 는 같은 개념이 아니에요.
- Memory: 기억해 두는 정보
- Context: 현재 작업을 수행하기 위해 AI에게 제공 되는 정보

Memory에 저장된 정보가 다음 작업의 Context 로 활용 될 수 있는 거예요.

## 3. RAG(Retrieval-Augmented Generation)

> 외부 자료를 검색해서 AI답변에 활용하는 기술

외부에서 관련 정보를 검색해 AI에게 제공하고, 그 정보를 바탕으로 답변을 생성하는 방식이에요. RAG는 AI가 문서를 미리 전부 학습하는 것이 아니라, 질문이 들어왔을 때 필요한 내용을 찾아서 참고 해요.

## 4. MCP(Model Context Protocol)

> AI와 외부 도구를 연결하기 위한 공통 통신 규격

AI가 외부 도구나 데이터에 연결할 때 사용할 수 있는 표준화된 통신 규격이에요. 예를들어 "GitHub에서 현재 진행중인 Issue 목록을 확인해줘"라고 요청했다고 생각해 볼게요. 그런데 AI 가 GitHub에 접근 할 수 없다면 이 작업을 진행할 수 없겠죠? 이때 GitHub MCP Server가 있다면 AI가 GitHub 기능을 사용할 수 있도록 연결해 줄 수 있어요.