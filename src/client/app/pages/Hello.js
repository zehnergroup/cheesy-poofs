import React from 'react';
import Test from '../components/Test'
import DocMeta from '../components/DocMeta';
import DocTitle from 'react-document-title';

var Hello = React.createClass({

  render: function() {
    let layout = this.props.appState.layout;

    let meta = [{
      name: "description",
      content: "The Cheesy Poofs stack is rad"
    }];

    let pageTitle = 'CheesyPoofs - React + Marty + Hapi + Docker = CheesyPoofs';

    return (
      <div>
        <DocTitle title={pageTitle} />
        <DocMeta tags={meta} id="home" />
        <h1>Hello</h1>
        <p>Window: Height {layout.get('window').get('height')} Width {layout.get('window').get('width')}</p>
        <Test appState={this.props.appState} />
      </div>
    );
  }

});

module.exports = Hello;
