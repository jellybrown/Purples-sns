import React from "react";
import MainHome from "components/MainHome";
import MainLogin from "components/MainLogin";
import { getCookie, userLoading } from "redux/AuthSlice";
import { wrapper } from "redux/store";
import { connect } from "react-redux";

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

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const token = getCookie("token", context.req);
    if (token !== undefined && token !== null) {
      await context.store.dispatch(userLoading(token));
    }

    return {
      props: context.store.getState().auth,
    };
  }
);
export default connect((state) => state)(Main);
//export default Main;
