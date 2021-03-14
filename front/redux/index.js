// Create the middleware
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { createWrapper } from "next-redux-wrapper";

const makeStore = (initialState = {}, options) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  // Add an extra parameter for applying middleware
  // const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, initialState, enhancer);

  // Run your sagas on server
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
