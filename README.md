### 글 쓰기
- 섹션별 폴더에 md 파일 추가: `news/`, `economy/`, `dev/`, `books/` (탭 순서와 이름은 `docusaurus.config.ts`의 `sections`)
- 섹션 폴더에 글이 하나도 없으면 빌드가 실패해요.
- 카드는 front matter의 `title`, `description`, `image`, `date`, `authors`로 그려져요.

### 로컬에서 실행하기
```
npm install
npm run start
```

### 빌드파일 생성하기
```
npm run build
```
- 결과
```
[SUCCESS] Generated static files in "build".
```

### 배포하기
```
npm run deploy
```

> `package-lock.json`을 커밋하지 않아서 `package.json`의 `overrides`로 webpack 버전을 고정해 뒀어요. 최신 webpack에서는 Docusaurus 3.5.2가 실행되지 않습니다.
