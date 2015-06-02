import React from 'react/addons'
import Marty from 'marty'
import {RouteHandler} from 'react-router'
import _ from 'lodash'
import $ from 'jquery'
import cx from 'classnames'
import Immutable from 'immutable';

// var {TransitionGroup} = React.addons;

var App = module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.func,
    marty: React.PropTypes.object
  },

  getInitialState() {
    return {
      layout: Immutable.fromJS({
        initialLoad: false,
        notIOS: false,
        loading: true,
        window: {
          width: 0,
          height: 0
        }
      })
    }
  },

  componentDidMount() {
    this.calculateLayout();
    this.hideLoader();
    $(window).on('resize', this.calculateLayout);
  },

  calculateLayout(e) {
    var $window = $(window);
    var isIOS = /(iPad|iPhone|iPod)/g.test( window.navigator.userAgent );

    this.setState(prevState => {
      return {
        layout: prevState.layout.merge({
          initialLoad: true,
          notIOS: !isIOS,
          window: {
            width: $window.width(),
            height: $window.height()
          }
        })
      }
    });
  },

  hideLoader() {
    var _this = this;
    if ($('#main_container').hasClass('loading')) {
      setTimeout(function() {
        $('#loader').animate({opacity: 0}, 1000, 'swing', onAnimateComplete);

        function onAnimateComplete() {
          _this.setState(prevState => {
            return {
              layout: prevState.layout.merge({
                loading: false
              })
            }
          });
        }
      }, 500);
    }
  },

  render() {

    var Loader;
    var router        = this.context.router;
    var allRoutes     = _.clone(router.getCurrentRoutes())
    var currentRoute  = allRoutes.reverse()[0];
    var mainContainerClasses = [
      currentRoute.name,
      {
        ios: !this.state.layout.get('notIOS'),
        loading: this.state.layout.get('loading')
      }
    ]

    if (this.state.layout.get('loading')) {
      Loader = <div id="loader"></div>
    }

    return (
      <div id="main_container" className={cx(mainContainerClasses)}>
        {Loader}
        <RouteHandler ref="router" appState={this.state} {...this.props} />
      </div>
    );
  }
});

