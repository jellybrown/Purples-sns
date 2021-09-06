# Purples

<img src="https://drive.google.com/uc?export=view&id=1uWxbLcCNLx8MbfDK0LDnv4jFXzOw1Lzx" width="750"/>

<br>

<a href="http://purples.jellybrown.net:8008/" target="_blank">👉 먼저 이용하러 가기</a> (가입이 귀찮으면 맨아래로)

<br>

## ❗️ 프로젝트 소개

- 소셜 네트워크 서비스 (SNS) <br>
- 발랄한 느낌 어필을 위해 보라색 그라데이션 이용 <br>
- 보라색 purple + 사람들 people(s)를 합쳐 purples로 결정<br>

<br>

## ❗️ 프로젝트 기간

- 2021.01.01 ~ 05.07 (front 1인, back 1인) / 1차 완성, 배포
- 2021.06.08 ~ 06.16 / 프로젝트 개선

<br>

## ❗️ 프로젝트 사용법

- `git clone https://github.com/jellybrown/Purples-sns.git`
- `npm install`
- `npm run start`

<br>

---

<br>

## ❗️ 사용된 기술 & 라이브러리 (프론트 시점)

- React, Next

- Redux, Redux-saga ➡ Redux-toolkit

- React-hook-form (유효성 검사)

- styled-components

- ant-design, slick (css 라이브러리)

- React-reponsive (반응형 구현)

<br>

## ❗️ 폴더 구조

```
📦 back
📦 front
┣ 📂 components
┃ ┣ 📂 ..
┃ ┣ 📂 ..
┃ ┗ 📜 ..
┣ 📂 hooks
┃ ┣ 📜 useModal.js
┃ ┗ 📜 ..
┣ 📂 pages
┃ ┣ 📂 post
┃   ┗ 📜 [id].js
┃ ┣ 📜 ..
┃ ┗ 📜 ..
┣ 📂 public
┃ ┗ 📂 static
┃   ┗ 📜 ..
┣ 📂 redux
┃ ┣ 📜 AuthSlice.js
┃ ┣ 📜 index.js
┃ ┣ 📜 PostSlice.js
┃ ┣ 📜 store.js
┃ ┗ 📜 UserSlice.js
┣ 📂 styles
┃ ┣ 📜 ..
┃ ┣ 📜 ..
┃ ┗ 📜 ..
┣ 📂 utils
┃ ┣ 📜 dynamicSort.js
┃ ┣ 📜 timeAgo.js
┃ ┗ 📜 ..
```

<br>

---

<br>

## ❗️ 프로젝트 구현 내용

스크린샷 화면 기준으로 구현 내용을 보고싶은 경우,
<a href="https://jellybrown.medium.com/sns-%EA%B0%9C%EB%B0%9C%ED%9B%84%EA%B8%B0-with-react-6a4ba382011" target="_blank">블로그👈</a>로 구경와주세요!

<br>

### 1. 전체 페이지 디자인

- 피그마로 전체 페이지를 기획 및 디자인했습니다.

<img src="https://drive.google.com/uc?export=view&id=1TLG4BFJUmuuMJ6m6pL8XWjLBa0egbN9X" width="500"/>

<br>
<br>

### 2. 회원가입, 로그인 form 유효성 검사

- react-hook-form 라이브러리를 이용하여 유효성 검사를 적용했습니다.

<br>

### 3. Redux, Redux-saga 구현후, Redux-toolkit으로 migration

- 기존 Redux-saga 코드를 Redux-toolkit으로 변경했습니다.

<br>

### 4. 반응형 디자인 구현

- react-resposive를 이용해 PC와 모바일 버전의 여백과 컴포넌트 렌더링 여부를 조정했습니다.

- 디자인 라이브러리(antd)에서 제공하는 컴포넌트를 이용하여 반응형 디자인을 적용했습니다.

<br>

### 5. 서버사이드 렌더링 적용

- 상세페이지에서 미리 페이지 정보를 가져올 수 있게 dispatch했습니다.

<br>

### 6. 오류, 개선사항 노트 작성

- 프로젝트를 진행하며 오류나 개선사항에 대해 같이 볼 수 있다면 좋겠다는 생각이 들어 노션에 정리하여 공유했습니다.

<br>

## ❗️ 프로젝트 결과화면

<br>

- PC

<img src="https://drive.google.com/uc?export=view&id=1YD-cMbD69yjZXy6m61G-oBWf_4o3NHm3" width="600"/>

<br>
<br>

- mobile

<img src="https://drive.google.com/uc?export=view&id=1bageVcCxJGJjLpzTL2-SX58q_A-9TnYn" width="330" />

<br>

---

<br>

## ❗️ 만들면서 힘들었던 점

### 1. git

혼자만 해서 add, commit, push만 알았었는데, 스터디를 하며 깨달은 것은 이렇습니다.<br>

- 작업 단위의 커밋 필요<br>
- fetch, pull, merge 등 다양한 명령어들을 사용해야 하는 것<br>
- git은 혼자해서는 깨우치기 어렵다는 것<br>

<br>

### 2. 다른 사람과의 협업

제가 앞으로 보완해야 할 점들을 깨달았습니다. <br>
아직 부족하지만 공부하며 아래와 같은 점들을 하나씩 실천해나갈 생각입니다.<br>

- 제안하고자 하는 기술에 대한 이해도<br>
- 프로젝트 세부 계획/ 진행상황 체크 (문서화 하기)<br>

<br>

### 3. 영어

실제 서비스처럼 만들고 싶다는 마음에 시작했는데, 생각하지 않았던 곳에서 에러가 종종 발생했습니다.<br>
터미널에서 에러를 읽는 것은 어렵지 않았지만, <br>
모르는 것들을 영어로 검색 해야하는데 장문의 문장들은 이해하기 힘들었습니다.<br>
앞으로 API문서와 블로그 읽기를 위해 꾸준히 영어공부를 할 생각입니다. <br>
지금은 유데미와 유투브 등으로 틈틈이 개발 강의를 듣고있습니다.

<br>

### 4. 실제 서비스로서의 가치?

구현은 했지만 아직 많은 부분에서 업그레이드 해야함이 느껴집니다. <br>
디자인도, 코드도, 기능도 차근차근 업그레이드 할 예정입니다.

<br>

## ❗️ 링크

<br>

<a href="http://purples.jellybrown.net:8008/" target="_blank">이용하러 가기</a>

가입이 귀찮으면 ID: hey@naver.com / PW: 123123 으로 구경 😎
