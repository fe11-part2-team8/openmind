# ⭐ Open Mind

![image](https://github.com/user-attachments/assets/677354bb-6790-41af-ae23-5bfb3846f022)

### 서비스 소개

- 익명으로 고민을 나누는 채팅 커뮤니티 서비스

### 개발 기간

- 2024.10.24 ~ 2024.11.08

## 📮 팀원 소개 및 역할

| 팀원   | Github                                        | 역할                                                  |
| ------ | --------------------------------------------- | ----------------------------------------------------- |
| 우재현 | [millennum00](https://github.com/Woolegend)   | `프로젝트 매니저` `질문 생성 모달`                    |
| 서현우 | [SEOmarkup](https://github.com/SEOmarkup)     | `메인 페이지` `답변 생성 폼`                          |
| 석지우 | [Jiwoo11111](https://github.com/Jiwoo11111)   | `피드 생성 폼` `질문 아이템` `답변 아이템`            |
| 이학수 | [haksoo](https://github.com/haksoo0918)       | `글로벌 스타일` `피드 목록 페이지` `로딩 컴포넌트`    |
| 최주영 | [JUYOUNG0728](https://github.com/JUYOUNG0728) | `글로벌 스타일` `API` `개별 피드 페이지` `404 페이지` |

## 🌐 프로젝트 구성

### 🗂️ 폴더 구조

```
📂root
├─ 📂public
│ └─ 📄index.html
│
├─ 📂src
│ ├─ 📂assets
│ │ ├─ 📂fonts
│ │ └─ 📂images
│ │
│ ├─ 📂components
│ ├─ 📂contexts
│ ├─ 📂hooks
│ ├─ 📂pages
│ ├─ 📂utils
│ ├─ 📄api.js
│ ├─ 📄globar.css
│ └─ 📄index.js
│
├─ ⚙️.gitignore
├─ ⚙️prettierrc
├─ ⚙️tailwind.config.js
└─ 📖README.md
```

### 🔗 페이지

| 페이지    | 경로        | 설명                                            |
| --------- | ----------- | ----------------------------------------------- |
| 메인      | `/`         | 피드를 생성할 수 있는 페이지                    |
| 피드 목록 | `/list`     | 생성된 피드들을 확인할 수 있는 페이지           |
| 개별 피드 | `/post/:id` | 피드에 대한 질문과 답변을 확인할 수 있는 페이지 |

### ✨ 기능

| 페이지    | 기능                                                                    |
| --------- | ----------------------------------------------------------------------- |
| 메인      | `피드 생성` `피드 id 저장`                                              |
| 피드 목록 | `피드 정렬` `메인으로 이동` `개별 피드로 이동`                          |
| 개별 피드 | `피드 삭제` `질문 생성` `질문 삭제` `답변 생성` `답변 수정` `답변 삭제` |

> [체크리스트](./docs/checklist.md)

## 🔧 기술 스택

### 개발 환경

![VSCode](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat-square&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)

### 프론트 엔드

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?logo=cssmodules&logoColor=white)

### 품질 관리

![Prettier](https://img.shields.io/badge/prettier-black?logo=Prettier&logoColor=F7B93E)
![Eslint](https://img.shields.io/badge/eslint-4B32C3?logo=eslint&logoColor=white)

### 협업 도구

![Github](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=white)

### 배포

![Netlify](https://img.shields.io/badge/Netlify-black?logo=Netlify&logoColor=%2300C7B7)

### 패키지 📦

## 💻 개발 환경 세팅

### 1. 모듈 다운로드

```

npm i

```

### 2. 에디터 포메터 설정

1. Prettier 확장 프로그램 설치
2. `setting -> Default formatter -> prettier`
3. `setting -> Format On Save -> 체크`

### 3. PostCSS Language Support

[PostCSS Language Suppor](https://marketplace.visualstudio.com/items?itemName=csstools.postcss) 확장 프로그램 설치

## 📚 컨벤션

### 📁 파일 명명 규칙

#### React/JSX 파일 📘

- 컴포넌트 파일, 페이지 파일
- 파스칼 케이스 사용
- 확장자: `.jsx`
- 예: `ProductList.jsx`, `HomePage.jsx`

#### 일반 JavaScript 파일 📜

- 유틸리티 함수 파일, 훅 파일
- 카멜 케이스 사용
- 확장자: `.js`
- 예: `useCustomHook.js`, `apiUtils.js`

#### 스타일 파일 🎨

- 컴포넌트 파일과 동일한 이름 사용
- 파스칼 케이스 사용
- 확장자: `.module.css`
- 예: `ProductList.module.css`

### 🏷️ 식별자 명명 규칙

#### JSX 컴포넌트 🧩

- 파스칼 케이스 사용
- 컴포넌트 종류에 따른 명명:
  - 페이지
    - ...Page
    - 예: `ProductListPage`
  - 리스트
    - ...List
    - 예: `ProductList`
  - 리스트 아이템
    - ...Item
    - 예: `ProductListItem`
  - 기타
    - 핵심 명사 + 명사/요소
    - 예: `PasswordInput`, `ItemAddForm`

#### 변수 📊

- 카멜 케이스 사용
- 원시 변수
  - 값을 직관적으로 표현
  - 예: `product`, `nameValue`
- 참조 변수
  - 원시 변수 + 's'
  - 예: `products`, `formValues`
- 중요 단어를 앞에 배치 :

  ```javascript
  // 나쁜예
  let totalProduct;
  let lengthItem;
  let maxSizeOfWindow;

  // 좋은예
  let productTotal;
  let itemLength;
  let windowSizeMax;
  ```

#### 상수 🔒

- 대문자와 언더스코어 사용
- 예: `DEFAULT_VALUE`, `API_BASE_URL`

#### 함수 🛠️

- 카멜 케이스 사용
- 명명 패턴: 동사 + 명사 + 명사/형용사
- 예: `getProductItems()`, `setCommentContent()`, `checkInputValid()`

#### CSS 스타일 🖌️

- global.css
  - 케밥 케이스 사용
  - 예: `main-container`
- module.css
  - 카멜 케이스 사용
  - 예: `mainContainer`

### 💡 추가 가이드라인

- 의미 있고 설명적인 이름을 사용하세요.
- 약어는 최소화하고, 팀 내에서 합의된 약어만 사용하세요.
- 불필요한 정보는 피하세요
  - 예: `productObject` 대신 단순히 `product`
- 일관성 있는 단어 선택을 유지하세요
  - 예: 동사로는 get/set, 상태 변화에는 create/delete
