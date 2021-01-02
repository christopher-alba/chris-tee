import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { client } from './ApolloClient/client';
import { ApolloProvider } from '@apollo/client';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);
