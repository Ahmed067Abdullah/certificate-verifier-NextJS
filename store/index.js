import { createStore, compose, applyMiddleware } from "redux";
import { createWrapper } from 'next-redux-wrapper';
import thunk from "redux-thunk";
import reducers from "./reducers";

const composeEnhancers = (
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// create a makeStore function
const makeStore = (context) => createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });
