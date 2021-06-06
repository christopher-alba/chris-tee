import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { client } from "./ApolloClient/client";
import { ApolloProvider } from "@apollo/client";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
// REDUX IMPORTS
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./redux/reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ApolloProvider client={client}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ApolloProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
