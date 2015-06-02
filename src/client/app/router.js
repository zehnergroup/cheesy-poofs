import Marty from 'marty';
import Router from 'react-router';

module.exports = Router.create({
  routes: require('./routes'),
  location: location()
});

function location() {
  if (typeof window !== 'undefined') {
    return Router.HistoryLocation;
  }
}