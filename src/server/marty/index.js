import _ from 'lodash';
import React from 'react';
import Router from 'react-router';
import DocTitle from 'react-document-title';
import DocMeta from '../../client/app/components/DocMeta';
import Boom from 'boom';
import Marty from 'marty';
import Hoek from 'hoek';
import path from 'path';
import getBundleName from '../../../gulp/utils/bundleName';
import AppConfig from '../config';

var HEADERS_TO_IGNORE = [
  'accept',
  'accept-encoding',
  'host',
  'connection'
];

var DEFAULT_OPTIONS = {
  banner:  require('./banner').join("\n"),
  doctype: '<!DOCTYPE html>'
};

exports.register = (server, options, next) => {
  var Application;

  options = options || {};
  options = Hoek.applyToDefaults(DEFAULT_OPTIONS, options);

  if (!options.routes) {
    next(new Error('routes is required'));
  }

  if (!options.serverSideBaseUrl) {
    next(new Error('serverSideBaseUrl is required'));
  }

  if (!options.app) {
    next(new Error('providing an app is required'));
  }

  server.views({
    engines: { html: require('swig') },
    relativeTo: __dirname,
    path: '../templates'
  });

  try { options.routes = require(options.routes) }
  catch (e) { return next(e) }

  try { Application = require(options.app) }
  catch (e) { return next(e) }

  // TODO: Implement Server Cookies
  // Marty.CookieStateSource.setCookieFactory(function (context) {
  //   return new ServerCookies(context.req, context.res);
  // });

  Marty.LocationStateSource.setLocationFactory(function (app) {
    return _.pick(app.req, 'url', 'protocol', 'query', 'path', 'hostname');
  });

  Marty.HttpStateSource.addHook({
    id: 'marty-express-http-state-source',
    priority: 0.00000000001,
    before: function (req) {
      var app = this.app;

      if (!app || !app.req) {
        return;
      }

      // Don't change fully qualified urls
      if (!/^https?:\/\//.test(req.url)) {
        req.url = options.serverSideBaseUrl + req.url;
      }

      // Add all headers from original request
      _.extend(req.headers, headers());

      function getBaseUrl(req) {
        return req.protocol + '://' + req.get('host');
      }

      function headers() {
        return _.omit(app.req.headers, HEADERS_TO_IGNORE);
      }
    }
  });

  server.route({
    method: 'GET',
    path:'/{param*}',
    handler: (request, reply) => {

      var router = Router.create({
        location: request.url.href,
        routes: options.routes,
        onAbort: onAbort
      });

      if (!router.match(request.url.href)) {
        return reply.continue();
      }

      router.run(function (Handler, state) {
        var app = new Application({
          req: request,
          res: reply
        });

        var AppContainer = React.createElement(
          Marty.ApplicationContainer, // Outer element
          {app: app}, // Props
          React.createElement(Handler, ...state.params) // Children
        );

        var renderOptions = {
          timeout: AppConfig.get('/marty/fetchTimeout')
        };

        app.renderToString(AppContainer, renderOptions)
          .then(onRendered)
          .catch(onFailedToRender);

        function onRendered(renderResult) {
          var locals    = {};
          var markup    = renderResult.html;
          var metaData  = DocMeta.rewind();

          locals[options.local || 'body'] = renderResult.htmlBody.trim();
          locals[options.state || 'state'] = renderResult.htmlState.trim();
          locals.bundleName = getBundleName();
          locals.pageTitle = DocTitle.rewind();
          locals.metas = [];

          _.forIn(metaData, (meta, pageKey) => {
            meta.forEach((m) => {
              var metaStrings = []
              _.forIn(m, (value, key) => {
                metaStrings.push(key + '="' + value + '"');
              });
              metaStrings.push('data-doc-meta="true"');
              locals.metas.push("<meta " + metaStrings.join(" ") + " />");
            });
          });

          reply.view('index', locals);
        }

        function onFailedToRender(error) {
            console.log('Failed to render ' + request.url.href, error);
            reply(Boom.wrap(error, 500));
        }
      });

      function onAbort(abortReason) {
        if (abortReason.constructor.name === 'Redirect') {
          return reply.redirect(router.makePath(abortReason.to, abortReason.params, abortReason.query));
        }
      }
    }
  });

  next();

}

exports.register.attributes = {
  name: 'marty'
}