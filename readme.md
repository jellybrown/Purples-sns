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

- 2021.01.01 ~ 04.12 (front 1인, back 1인)
- 1차 완성

<br>

## ❗️ 사용된 기술 & 라이브러리 (프론트 시점)

<br>

- React

- next.js

- Redux, Redux-saga --> Redux-toolkit 으로 변경

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

### 3. 기존 코드 Redux-toolkit으로 변경

<br>

- 기존에 작성된 Redux, Redux-saga 코드를 Redux-toolkit으로 변경했습니다.

```js
// postReducer (삭제)

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

```js
// postSaga (삭제)

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

```js
// PostSlice (변경)

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    changePostFilter: (state, { payload }) => {
      state.posts = []; // 필터가 바뀌었기 때문에 기존 포스트 초기화.
      state.postFilter = payload;
    },
  },
  extraReducers: {
     ...
    // addPost
    [addPost.pending]: (state, action) => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts.push(payload.data);
    },
    [addPost.rejected]: (state, action) => {
      state.loading = false;
      console.log("addPost rejected 💣", action);
    },
  }
   ...
```

<br>

### 4. 반응형 디자인 구현

<br>

- react-resposive를 이용해 PC와 모바일 버전의 여백과 컴포넌트 렌더링 여부를 조정했습니다.

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

- 디자인 라이브러리에서 제공하는 컴포넌트를 이용하여 반응형 디자인을 적용했습니다.

```js
return (
  // ...
  <Row>
    <Col xs={24} md={11} xxl={10}>
      ...
    </Col>
    <Col xs={24} md={13} xxl={14} style={{ background: "white" }}>
      ...
    </Col>
  </Row>
);
```

<br>

### 5. 서버사이드 렌더링 적용

<br>

- 상세페이지에서 미리 페이지 정보를 가져올 수 있게 dispatch했습니다.

```js
// pages > post > [id].js

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const token = getCookie("token", context.req);
    if (token !== undefined && token !== null) {
      await context.store.dispatch(userLoading(token));
      await context.store.dispatch(getPost({ id: context.params.id }));
    }
    ...
  }
  ...
```

- <br>

<br>

### 6. 오류, 개선사항 노트 작성

<br>

- 프로젝트를 진행하며 오류나 개선사항에 대해 말로 하기보다는 분류해서 같이 볼 수 있다면 좋겠다는 생각이 들어
  노션에 정리하여 공유하며 문제를 해결하려 했습니다.

<br>

<img src="/purple-note-1.png" width="400">
<img src="/purple-note-1.png" width="400">

<br>

<a href="https://www.notion.so/Purples-686ae618f4ab49c5bae0ed746c0bfd89" target="_blank">노트 구경하러 가기</a>

<br>

---

<br>

## ❗️ 프로젝트 결과화면

<br>

- 메인 페이지

<br>

<img src="https://github.com/jellybrown/Purples-sns/blob/master/sns-post.gif" width="700">

<br>

- signup 페이지

<br>

<img src="https://github.com/jellybrown/Purples-sns/blob/master/sns-signup.gif" width="700">

<br>

- mobile 버전

<br>

<img src="https://github.com/jellybrown/Purples-sns/blob/master/sns-mobile.gif" width="500">

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
앞으로 API문서와 블로그 읽기를 위해 꾸준히 영어공부를 할 생각입니다. <br>
지금은 유데미와 유투브 등으로 틈틈이 개발관련 강의를 듣고있습니다.

<br>

### 4. 실제 서비스로서의 가치?

구현은 했지만 아직 많은 부분에서 업그레이드 해야함이 느껴집니다. <br>
디자인도, 코드도, 기능도 차근차근 업그레이드 할 예정입니다.
