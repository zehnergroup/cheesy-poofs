var React = require('react'),
    createSideEffect = require('react-side-effect');

var _serverMeta = {};

function getFromPropsList(key, propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps[key];
  }
}

var DocumentMeta = createSideEffect(function handleChange(propsList) {

  // Handle Meta for the browser
  if (typeof document !== 'undefined') {
    var browserTags = [];
    propsList.forEach((props) => {
      browserTags = browserTags.concat(props.tags);
    });

    if (!browserTags || browserTags.length === 0) {
      return undefined;
    }

    // this chunk here gets rid of the doc-meta nodes
    var nodes = document.querySelectorAll('meta[data-doc-meta="true"]');

    Array.prototype.slice.call(nodes).forEach(function (node) {
      node.parentNode.removeChild(node);
    });

    // then reinsert new ones
    Array.prototype.slice.call(browserTags).forEach(function (tag) {
      // tag can contain many property.
      var newNode = document.createElement('meta');

      for (var property in tag) {
        if (tag.hasOwnProperty(property)) {
          // add the properties
          newNode.setAttribute(property, tag[property]);
        }
      }

      // add the lib-signature
      newNode.setAttribute('data-doc-meta', 'true');

      // add the node to head
      document.getElementsByTagName('head')[0].appendChild(newNode);
    });
  }

  // Handle Meta for the server
  else {
    var serverTags = getFromPropsList('tags', propsList);
    var key = getFromPropsList('id', propsList);

    if (!serverTags || serverTags.length === 0) {
      return undefined;
    }

    _serverMeta[key] = serverTags;
  }

}, {
  displayName: 'DocumentMeta',

  propTypes: {
    tags: React.PropTypes.array,
    id: React.PropTypes.any
  },

  statics: {
    peek: function peek() {
      return _serverMeta;
    },

    rewind: function rewind() {
      var meta = _serverMeta;
      this.dispose();
      _serverMeta = {};
      return meta;
    }
  }
});

module.exports = DocumentMeta;