import React from 'react';

var Hello = React.createClass({

  render: function() {
    let layout = this.props.appState.layout;

    return (
      <div>
        <h1>Hello</h1>
        <p>Window: Height {layout.get('window').get('height')} Width {layout.get('window').get('width')}</p>
      </div>
    );
  }

});

module.exports = Hello;