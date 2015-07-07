import React from 'react/addons'
import Marty from 'marty'
import {RouteHandler} from 'react-router'
import _ from 'lodash'
import $ from 'jquery'
import cx from 'classnames'
import Immutable from 'immutable';
import Hello from './Hello';

// var {TransitionGroup} = React.addons;

var App = module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.object,
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

    let RouteHandler, routeName, mainContainerClasses;

    if (this.props.children) {
      routeName = this.props.children.props.route.name
      RouteHandler = React.cloneElement(this.props.children, _.create(this.props, {appState: this.state, key: routeName}))
    } else {
      routeName = 'home'
      RouteHandler = <Hello appState={this.state} key={routeName} {...this.props} />
    }

    mainContainerClasses = [
      routeName,
      {
        ios: !this.state.layout.get('notIOS'),
        loading: this.state.layout.get('loading')
      }
    ]

    return (
      <div id="main_container" className={cx(mainContainerClasses)}>
        {RouteHandler}
      </div>
    );
  }
});
