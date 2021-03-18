# Purples (진행중인 프로젝트)

<br>

## ❗️ 프로젝트 소개

<br>

- twitter, instagram과 같은 소셜 네트워크 서비스 <br>
- 발랄한 느낌 어필을 위해 보라색 그라데이션 이용 <br>
- 어플리케이션의 이름은 people(s) + purple을 합쳐 purples로 결정<br>
- 프로젝트가 완성되면, readme도 같이 수정할 예정<br>

<br>

---

<br>

## ❗️ 프로젝트 기간

<br>

- 2021.01.01 ~ 진행중 (front 1인, back 1인)

<br>

## ❗️ 사용된 기술 & 라이브러리 (프론트 시점)

<br>

- React

- next.js

- Redux, Redux-saga --> Redux-toolkit 으로 변경중

- axios

- React-hook-form : 유효성 검사

- React-reponsive : PC/모바일 화면을 다르게 하기위해 이용

- design library (ant-design)

<br>

---

<br>

## ❗️ 프로젝트 구현 (맡은 기능)

<br>

### 1. 전체 페이지 디자인

<br>

- figma를 이용하여 프로젝트 진행전, 진행중 계속 디자인을 진행하였습니다.

<br>

<img src="/figma-sns.png" width="700">

<br>

### 2. 회원가입, 로그인 form 유효성 검사

<br>

- react-hook-form 라이브러리를 이용하여 유효성 검사를 적용했습니다.

<br>

```js
// SignupForm 컴포넌트

<InputWrapper>
  <FiMail />
  <Input
    name="email"
    type="email"
    placeholder="Email..."
    ref={register({
      required: true,
      pattern: /^\S+@\S+$/i,
      maxLength: 30,
    })}
  />
</InputWrapper>;
{
  errors.email?.type === "required" && (
    <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
  );
}
{
  errors.email?.type === "pattern" && (
    <ErrorMessage>이메일 형식이 맞지 않습니다.</ErrorMessage>
  );
}
{
  errors.email?.type === "maxLength" && (
    <ErrorMessage>이메일을 확인해주세요.</ErrorMessage>
  );
}
```

<br>

### 3. Redux, Redux-saga를 이용한 비동기 작업

<br>

- post작성, 회원가입, 로그인 등 비동기 통신을 위해 redux와 redux-saga를 적용했습니다. (redux-toolkit으로 변경중입니다. 03/18)

<br>

```js
// postReducer

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [...posts, action.payload],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
        addPostLoading: false,
        addPostError: true,
      };
```

<br>

```js
// postSaga

const addPostAPI = (payload) => {
  return axios.post("api/post", payload);
};

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.payload);
    yield put({
      type: ADD_POST_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      payload: err.response,
    });
  }
}

function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}

// ...

export default function* postSaga() {
  yield all([fork(watchAddPost)], [fork(watchRemovePost)]);
}
```

<br>

### 4. 반응형 디자인 구현

<br>

- react-resposive를 이용해 PC와 모바일 버전의 여백과 컴포넌트 렌더링 여부를 조정했습니다.

<br>

```js
// MainHome 컴포넌트

const MainHome = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });

  return (
    <Layout>
      <div style={{ position: "relative" }}>
        {isDesktopOrLaptop && (
          <>
          ...
            )
        }
        {isTabletOrMobileDevice && (
          <>
          ...
          )
        }
```

<br>

<br>

---

<br>

## ❗️ 프로젝트 결과화면

<br>

- 메인 페이지

<br>

<img src="https://github.com/jellybrown/Purples-sns/blob/main/sns-post.gif" width="700">

<br>

- signup 페이지

<br>

<img src="https://github.com/jellybrown/Purples-sns/blob/main/sns-signup.gif" width="700">

<br>

- mobile 버전

<br>

<img src="https://github.com/jellybrown/Purples-sns/blob/main/sns-mobile.gif" width="500">

<br>

---

<br>

## ❗️ 만들면서 힘들었던 점

<br>

### 1. git

혼자만 해서 add, commit, push만 알았었는데, 스터디를 하며 깨달은 것은 이렇습니다.<br>

- 작업 단위의 커밋 필요<br>
- fetch, pull, merge 등 다양한 명령어들을 사용해야 하는 것<br>
- git은 혼자해서는 깨우치기 어렵다는 것<br>

<br>

### 2. 다른 사람과의 협업

제가 앞으로 보완해야 할 점들을 몸소 깨달았습니다. <br>
아직 부족하지만 공부하며 아래와 같은 점들을 하나씩 실천해나갈 생각입니다.<br>

- 제안하고자 하는 기술에 대한 이해도<br>
- 프로젝트 사전 세부 계획 (문서화 하기)<br>

<br>

### 3. 영어

실제 서비스처럼 만들고 싶다는 마음에 시작했는데, 생각하지 않았던 곳에서 에러가 종종 발생했습니다.<br>
터미널에서 에러를 읽는 것은 어렵지 않았지만, <br>
모르는 것들을 영어로 검색 해야하는데 장문의 문장들은 이해하기 힘들었습니다.<br>
앞으로 API문서와 블로그 읽기를 위해 꾸준히 영어공부를 할 생각입니다.

<br>
