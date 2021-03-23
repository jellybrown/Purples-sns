import React from "react";
import MainHome from "../components/MainHome";
import MainLogin from "../components/mainLogin";
import { getCookie, userLoading } from "../redux/AuthSlice";
import { wrapper } from "../redux/store";
//import {connect} from "react-redux";
import axios from "axios";

const Main = ({ isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated !== null && isAuthenticated ? (
        <MainHome />
      ) : (
        <MainLogin />
      )}
    </div>
  );
};
// 로그인할때도 이 getServer~ 이 실행되는데,
// 결국은 로그인할때도 api/auth 를 두번이나 요청한다... 왜지?
// 이거때매 오류나는거 아닌가? userLoading에서 오류난다.
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log("getserversideProps-------");

    const token = getCookie("token", context.req);

    let haveToken = false;

    if (token !== undefined && token !== null) {
      context.store.dispatch(userLoading({ token }));
    }

    // context.store.dispatch({
    //   type: LOAD_POSTS_REQUEST,
    // });
  }
);

export default Main;

// _app.js에 설정한거 여기다 해야하는거 아닐까? 2021/03/22
// toolkit 할때 설정하기

// 1. 기본형태
// export const getServerSideProps = wrapper.getServerSideProps(store => async ({req,res, ...etc})=> {
//   console.log('2. Page.getServerSideProps uses the store to dispatch things');

//   await store.dispatch(loadEmail()); 필요한부분 ex)유저인증 dispatch하기
//   await store.dispatch(loadUrl());
//   await store.dispatch(loadLogs());
// })

// export default connect(state=> state)(Main);

// 2. 쿠키 가져올시 이런식으로 할 수 있음
// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : "";
//     axios.defaults.headers.Cookie = "";
//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }
//     context.store.dispatch({
//       type: LOAD_MY_INFO_REQUEST,
//     });
//     context.store.dispatch({
//       type: LOAD_POSTS_REQUEST,
//     });
//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
//   }
// );

// export default Main;

// const fetchAndWait = (store, param) =>
//   new Promise((resolve) => {
//     store.dispatch({
//       type: USER_LOADING_REQUEST,
//       payload: param,
//     });
//     const unsubscribe = store.subscribe(() => {
//       const state = store.getState();
//       unsubscribe();
//       return resolve(state);
//     });
//   });

// App.getInitialProps = async ({ Component, ctx }) => {
//   const token = getCookie("token", ctx.req);
//   let updatedStore;

//   if (token !== undefined && token !== null) {
//     updatedStore = await fetchAndWait(ctx.store, token);
//   }
//   const pageProps = updatedStore ? updatedStore.auth : {};
//   return { pageProps };
// };
