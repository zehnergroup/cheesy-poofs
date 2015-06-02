require("babelify/polyfill");

// Assign to globals so jQuery plugins can find it
import $ from 'jquery'; global.jQuery = $;

import React from 'react';
import Marty from 'marty';
import Application from './app';
import Router from './router';
import {ApplicationContainer} from 'marty';

global.React = React; // For React Developer Tools
global.Marty = Marty; // For Marty Developer Tools

React.initializeTouchEvents(true);

if (process.env.NODE_ENV !== 'test') {

  let app = new Application();

  app.rehydrate();

  Router.run(function (Handler, state) {
    React.render((
      <ApplicationContainer app={app}>
        <Handler {...state.params} />
      </ApplicationContainer>
    ), document.getElementById('app'));
  });
}