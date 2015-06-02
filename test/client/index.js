require('babel/register');

var ServicesMock = require('./mocks/services');

var Lab       = require("lab")
  , Code      = require('code')
  , expect    = Code.expect
  , lab       = exports.lab = Lab.script()
  , React     = require('react')
  , createDOM = require('../utils/createDOM');

lab.experiment("Client", function() {

  var Router;

  var WorkIndex = ServicesMock.WorkServiceMock.getWorkIndex().workIndex.WorkIndex;

  lab.beforeEach(function(done) {
    createDOM();
    Router = require('../../src/client/app/index');
    done();
  });

  lab.test("[/] should render", function(done) {

    Router('/')
      .then(function() {
        var markup = document.documentElement.innerHTML;
        var home = document.querySelector('.home');

        expect(markup).to.exist();
        expect(home).to.exist();
      })
      .nodeify(done);
  });

  lab.test("[/work] should render", function(done) {

    Router('/work')
      .then(function() {
        var markup    = document.documentElement.innerHTML;
        var workCards = document.querySelectorAll('.work-card');

        expect(markup).to.exist();
        expect(workCards.length).to.be.at.least(1);
      })
      .nodeify(done);
  });

  WorkIndex.forEach(function(workItem) {
    lab.test("[/work/" + workItem.slug + "] should render", function(done) {

      Router('/work/' + workItem.slug)
        .then(function() {
          var markup    = document.documentElement.innerHTML;
          var content   = document.querySelector('.work-detail.' + workItem.slug);
          expect(markup).to.exist();
          expect(content).to.exist();
        })
        .nodeify(done);
    });
  });

  lab.test("[/services] should render", function(done) {

    Router('/services')
      .then(function() {
        var markup      = document.documentElement.innerHTML;
        var landingPage = document.querySelector('.services.landing');

        expect(markup).to.exist();
        expect(landingPage).to.exist();
      })
      .nodeify(done);
  });

  lab.test("[/services/strategy] should render", function(done) {

    Router('/services/strategy')
      .then(function() {
        var markup        = document.documentElement.innerHTML;
        var categoryPage  = document.querySelector('.services.detail.strategy');

        expect(markup).to.exist();
        expect(categoryPage).to.exist();
      })
      .nodeify(done);
  });

  lab.test("[/services/creative] should render", function(done) {

    Router('/services/creative')
      .then(function() {
        var markup        = document.documentElement.innerHTML;
        var categoryPage  = document.querySelector('.services.detail.creative');

        expect(markup).to.exist();
        expect(categoryPage).to.exist();
      })
      .nodeify(done);
  });

  lab.test("[/services/technology] should render", function(done) {

    Router('/services/technology')
      .then(function() {
        var markup        = document.documentElement.innerHTML;
        var categoryPage  = document.querySelector('.services.detail.technology');

        expect(markup).to.exist();
        expect(categoryPage).to.exist();
      })
      .nodeify(done);
  });

  lab.test("[/services/marketing] should render", function(done) {

    Router('/services/marketing')
      .then(function() {
        var markup        = document.documentElement.innerHTML;
        var categoryPage  = document.querySelector('.services.detail.marketing');

        expect(markup).to.exist();
        expect(categoryPage).to.exist();
      })
      .nodeify(done);
  });

  lab.test("[/careers] should render", function(done) {

    Router('/careers')
      .then(function() {
        var markup = document.documentElement.innerHTML;
        var careers = document.querySelector('.careers');

        expect(markup).to.exist();
        expect(careers).to.exist();
      })
      .nodeify(done);
  });

});
