import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute} from 'react-router';

module.exports = [
  <Route name="app" path="/" handler={ require('./pages/App') } >

    <DefaultRoute name="home" handler={ require('./pages/Hello') } />

  </Route>
];
