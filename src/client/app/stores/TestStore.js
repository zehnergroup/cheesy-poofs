import Marty from 'marty'
import MessageConstants from '../constants/MessageConstants'
import Immutable from 'immutable';

module.exports = Marty.createStore({
  id: 'TestStore',

  handlers: {
    onReceiveMessage: MessageConstants.RECEIVE_MESSAGE
  },

  getInitialState() { return Immutable.fromJS({
    // message: "hello world"
  }) },

  rehydrate(dehydratedState) {
    this.replaceState(Immutable.fromJS(dehydratedState));
  },

  dehydrate() {
    return this.state.toJS();
  },

  getMessage() {
    // return this.state.get('message');
    return this.fetch({
      id: 'message',
      locally() {
        if (this.hasAlreadyFetched('message')) {
          return this.state.get('message');
        }
      },
      remotely() {
        return this.app.MessageQueries.getMessage();
      }
    })
  },

  onReceiveMessage(message) {
    this.state = this.state.set('message', message);
  }

})
