import React from 'react';
import Homepage from './pages/index';
import Navbar from './components/navbar';
import PrivateRoute from './components/privateRoute';
import { Route } from 'react-router-dom';
import Shop from './pages/shop';
import Login from './pages/login';
import Signup from './pages/signup';
import Product from './pages/product';
import Cart from './pages/cart';
import { useQuery } from '@apollo/client';
import { AUTHENTICATE } from './ApolloClient/queries';
const App = () => {
  const { loading, error, data } = useQuery(AUTHENTICATE);
  if (loading) {
    return <div>loading...</div>;
  }
  let authenticated = Boolean(data);
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/product/:id" component={Product} />
      <PrivateRoute authed={authenticated} path="/cart" component={Cart} />
    </>
  );
};

export default App;
