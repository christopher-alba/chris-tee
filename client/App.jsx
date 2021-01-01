import React from 'react';
import Homepage from './pages/index';
import Navbar from './components/navbar';
import { Route } from 'react-router-dom';
import Shop from './pages/shop';
const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/shop" component={Shop} />
    </>
  );
};

export default App;

