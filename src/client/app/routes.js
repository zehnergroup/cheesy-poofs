import React from 'react';
import Router from 'react-router';
import {Route} from 'react-router';

module.exports = [
  <Route name="app" path="/" component={ require('./pages/App') } >

    <Route path="hello" name="hello" component={ require('./pages/Hello') } />

  </Route>
];
