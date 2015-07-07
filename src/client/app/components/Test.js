import React from 'react';
import Marty from 'marty';

var Test = React.createClass({

  componentWillMount() {
    console.log('Test will mount');
  },

  componentDidMount() {
    console.log('Test DID mount');
    console.log(window);
    console.log(React.findDOMNode(this));
  },

  componentWillReceiveProps(nextProps) {
    console.log('Component Recieved props');
    console.log(nextProps);
  },

  componentWillUnmount() {
    console.log('clean up event listeners and plugins');
  },

  render() {
    console.log('Test Rendering');
    return (
      <div>
        <p>{this.props.message}</p>
      </div>
    );
  }

});

module.exports = Marty.createContainer(Test, {
  listenTo: 'TestStore',
  fetch: {
    message: function() {
      return this.app.TestStore.getMessage();
    }
  }
});
