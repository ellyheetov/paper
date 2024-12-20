---
slug: MainActor
title: MainActor
authors: [ellyheetov]
tags: [swift]
---

## @MainActor 어노테이션은 언제 사용하는거야?

UI의 안전성을 보장하기 위한 어노테이션

@MainActor 어노테이션은 Swift에서 **메인 스레드에서 코드가 실행되도록 보장**하는 역할을 한다. 주로 **UI 업데이트**와 같이 메인 스레드에서 실행되어야 하는 작업을 안전하게 처리하기 위해 사용된다.

코드가 메인 스레드에서 실행되도록 강제하는 어노테이션.

ViewModel 에 @MainActor 어노테이션을 적용하게되면, 모든 메소드와 속성에 대한 접근이 메인 스레드에서 이루어지잖아. 

### ViewModel에서 async 메소드를 정의하는 경우 얘는 메인 스레드에서 동작해 아니면 백그라운드 스레드에서 동작해?

메인 스레드에서 동작한다.

### ViewModel 이 비즈니스 로직을 가지고 있는 경우에, 메인스레드에서 굴러가는건 비효율 적이지 않을까?

ViewModel 전체에 @MainActor 를 적용하는 대신, UI업데이트 코드만 메인 스레드에서 실행 될 수 있도록 하는게 좋다.

### ViewModel 전체에 @MainActor를 적용하는 대신, UI 업데이트 코드만 메인 스레드에서 실행되도록 제한 하게 되는 경우 어노테이션이 너무 잦을 것 같아. actor 자료형이 해답이 될 수 있을까?

actor 자료형이 해답이 될 수 있다. actor 자체는 비동기 작업을 처리하되, UI 업데이트 부분만 @MainActor 에서 실행시키면 된다.

```swift
// 비즈니스 로직과 데이터 관리
actor UserDataManager {
    func fetchUserName() async -> String {
        // 백그라운드에서 실행되는 네트워크 작업
        return "ellyheetov"
    }
}
```

actor 에서는 데이터 레이스를 방지하면서 비즈니스 로직이 수행될 수 있도록 한다.

```swift
// ViewModel
@MainActor
class UserViewModel: ObservableObject {
    @Published var userName: String = ""
    private let dataManager = UserDataManager()

    func loadUser() async {
        let name = await dataManager.fetchUserName() // Actor의 비즈니스 로직 호출
        userName = name // 메인 스레드에서 UI 업데이트
    }
}
```

ViewModel 을 정의하고, 내부에 actor를 변수로 가진다. 메인 스레드에서 UI를 업데이트 할 수 있도록 @MainActor 어노테이션을 달아준다. @MainActor 를 통해 메인 스레드에서 동작하기를 보장하기 때문에 loadUser는 메인 스레드에서 수행된다. 단, 내부에 있는 dataManager.fetchUserName() 는 비동기 적으로 수행 되므로, 백그라운드 스레드에서 동작한다. 경우에 따라 메인스레드에서 동작 할 수 도 있다. 이건 swift 런타임에서 스레드를 결정하므로 정확하게 어떤 스레드에서 실행될지는 보장할 수 없다.



### 결과

실제로 어떤 스레드에서 동작하는지 확인하기 위해 로그를 남겨 보았다.

```swift
actor UserDataManager {
    func fechUserName() async -> String {
        // 백그라운드에서 실행되는 네트워크 작업
        try? await Task.sleep(nanoseconds: 1 * 1_000_000_000)
        
        let threadName = __dispatch_queue_get_label(nil)
        print("fetchUserName 실행 스레드: \(String(cString: threadName))")
        
        return "Tom"
    }
}

@MainActor
class UserViewModel: ObservableObject {
    @Published var userName = "Empty"
    
    private let dataManager = UserDataManager()
    
    func loadUser() async {
        let threadName = __dispatch_queue_get_label(nil)
        print("loadUser 실행 스레드: \(String(cString: threadName))")
        
        let name = await dataManager.fechUserName()
        userName = name // 메인 스레드에서 UI 업데이트
    }
    
    func reset() async {
        userName = "Empty"
    }
}
```

```
loadUser 실행 스레드: com.apple.main-thread
fetchUserName 실행 스레드: com.apple.root.user-initiated-qos.cooperative
```



### 정리

- @MainActor를 사용해서 loadUser가 메인 스레드에서 실행됨을 보장한다.
- 비즈니스 로직은 actor를 사용하여 데이터 레이스를 보장하고, 런타임 상황에 따라 백그라운드 스레드에서 실행 될 수 있게 한다.