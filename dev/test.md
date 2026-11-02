---
title: SwiftUI @State와 @Binding 정리
description: 상태를 소유하는 뷰와 빌려 쓰는 뷰를 구분하면 데이터 흐름이 단순해진다.
image: https://picsum.photos/seed/paper-dev/800/500
date: 2026-10-30
---

SwiftUI에서 화면은 상태의 함수다. 상태가 바뀌면 뷰가 다시 그려지는데, 그 상태를 **누가 소유하는지**를 헷갈리기 시작하면 값이 엉뚱한 곳에서 바뀌거나 화면이 갱신되지 않는 문제가 생긴다.

## @State: 뷰가 직접 소유하는 상태

```swift
struct CounterView: View {
    @State private var count = 0

    var body: some View {
        Button("탭 \(count)회") { count += 1 }
    }
}
```

- 뷰 안에서만 쓰는 단순한 값 타입 상태에 쓴다.
- `private`으로 선언해서 바깥에서 초기값을 주입하지 않도록 한다.

## @Binding: 부모의 상태를 빌려 쓰기

```swift
struct ToggleRow: View {
    @Binding var isOn: Bool

    var body: some View {
        Toggle("알림", isOn: $isOn)
    }
}

struct SettingsView: View {
    @State private var notificationsOn = true

    var body: some View {
        ToggleRow(isOn: $notificationsOn)
    }
}
```

`ToggleRow`는 값을 직접 갖지 않고, 부모가 가진 `notificationsOn`에 대한 참조만 받는다. 토글을 움직이면 부모의 상태가 바뀌고, 부모와 자식이 함께 다시 그려진다.

## 한눈에 비교

| 프로퍼티 래퍼 | 소유자 | 언제 쓰나 |
| --- | --- | --- |
| `@State` | 현재 뷰 | 이 뷰만 쓰는 상태 |
| `@Binding` | 부모 뷰 | 부모 상태를 읽고 바꿔야 할 때 |

> 상태는 한 곳에서만 소유하고, 나머지는 빌려 쓴다.
