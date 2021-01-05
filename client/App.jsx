import React from 'react';
import Homepage from './pages/index';
import Navbar from './components/navbar';
import { Route } from 'react-router-dom';
import Shop from './pages/shop';
import Login from './pages/login';
import Signup from './pages/signup';
import Product from './pages/product';

const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/product/:id" component={Product} />
    </>
  );
};

export default App;
