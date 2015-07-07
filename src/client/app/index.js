require("babelify/polyfill");

// Assign to globals so jQuery plugins can find it
import $ from 'jquery'; global.jQuery = $;

import React from 'react';
import Marty from 'marty';
import Application from './app';
import { Router } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import {ApplicationContainer} from 'marty';
import routes from './routes'

global.React = React; // For React Developer Tools
global.Marty = Marty; // For Marty Developer Tools

React.initializeTouchEvents(true);

if (process.env.NODE_ENV !== 'test') {

  let app = new Application();

  app.rehydrate();

  React.render((
    <ApplicationContainer app={app}>
      <Router routes={routes} history={new BrowserHistory()} />
    </ApplicationContainer>
  ), document.getElementById('app'));
}
