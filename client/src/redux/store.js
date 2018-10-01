import { createStore, applyMiddleware } from "redux";
import useracts from "./reducers";
import thunk from "redux-thunk";

const store = createStore(
  useracts,
  /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export default store;
