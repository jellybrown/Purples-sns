import React from "react";
import { getCookie, userLoading } from "redux/AuthSlice";
import { wrapper } from "redux/store";
import { connect } from "react-redux";
import Home from "components/Home";

const Index = ({ isAuthenticated }) => {
  return <Home isAuthenticated={isAuthenticated} />;
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
export default connect((state) => state)(Index);
