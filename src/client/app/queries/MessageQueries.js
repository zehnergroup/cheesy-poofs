import Marty from 'marty';
import MessageConstants from '../constants/MessageConstants'

module.exports = Marty.createQueries({

  id: 'MessageQueries',

  getMessage() {
    return this.app.MessageAPI.getMessage()
      .then((res) => {
        return this.dispatch(MessageConstants.RECEIVE_MESSAGE, res.message);
      });
  }

});
