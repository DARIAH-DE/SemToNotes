/**
 * @fileoverview Classes implementing client-side authentication.
 */

goog.provide('xrx.mvc.Auth');
goog.provide('xrx.mvc.Password');
goog.provide('xrx.mvc.Signin');
goog.provide('xrx.mvc.Signout');
goog.provide('xrx.mvc.User');



goog.require('goog.crypt.base64');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.dataset');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.net.Cookies');
goog.require('goog.net.XhrIo');
goog.require('goog.style');
goog.require('xrx.mvc.Component');



/**
 * @constructor
 */
xrx.mvc.Auth = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Auth, xrx.mvc.Component);



xrx.mvc.Auth.prototype.createDom = function() {};



xrx.mvc.Auth.KEY_ = 'xrxAuth';



xrx.mvc.Auth.TYPE_ = 'Basic ';



xrx.mvc.Auth.USER_ = '';



xrx.mvc.Auth.PSWD_ = '';



xrx.mvc.Auth.Cookies_ = new goog.net.Cookies(goog.dom.getDocument());



xrx.mvc.Auth.setUser = function(user) {
  xrx.mvc.Auth.USER_ = user;
};



xrx.mvc.Auth.setPassword = function(password) {
  xrx.mvc.Auth.PSWD_ = password;
};



xrx.mvc.Auth.isAuth = function() {
  return !!xrx.mvc.Auth.Cookies_.get(xrx.mvc.Auth.KEY_);
};



xrx.mvc.Auth.getCredentials = function() {
  return xrx.mvc.Auth.isAuth() ?
      xrx.mvc.Auth.Cookies_.get(xrx.mvc.Auth.KEY_) :
      'Basic ' + goog.crypt.base64.encodeString(xrx.mvc.Auth.USER_ + ':' + xrx.mvc.Auth.PSWD_);
};



xrx.mvc.Auth.prototype.signin = function() {
  var self = this;
  var method = this.getDataset('xrxMethod') || 'GET';
  var xhr = new goog.net.XhrIo();
  var authorization = xrx.mvc.Auth.getCredentials();
  xhr.headers.set('Authorization', authorization);
  xrx.mvc.Auth.Cookies_.remove(xrx.mvc.Auth.KEY_);

  var responseSuccess = function(e) {
    xrx.mvc.Auth.Cookies_.set(xrx.mvc.Auth.KEY_, authorization, -1);
    self.dispatch('xrx-event-submit-done');
    location.reload();
  };

  var responseError = function(e) {
    self.dispatch('xrx-event-submit-error');
  };

  goog.events.listen(xhr, goog.net.EventType.SUCCESS, responseSuccess);
  goog.events.listen(xhr, goog.net.EventType.ERROR, responseError);

  xhr.send(this.getDataset('xrxEndpoint'), method);
};



xrx.mvc.Auth.prototype.signout = function() {
  xrx.mvc.Auth.Cookies_.remove(xrx.mvc.Auth.KEY_);
  location.reload();
};



/**
 * @constructor
 */
xrx.mvc.User = function(element) {

  goog.base(this, element);

  this.auth_;
};
goog.inherits(xrx.mvc.User, xrx.mvc.Component);



xrx.mvc.User.prototype.createDom = function() {
  this.auth_ = this.getParentComponent('xrx-auth');
  this.show(!xrx.mvc.Auth.isAuth());
  goog.events.listen(this.element_, goog.events.EventType.INPUT, function(e) {
    this.handleInput_();
  }, false, this);
};



xrx.mvc.User.prototype.handleInput_ = function() {
  var input = goog.dom.forms.getValue(this.element_);
  xrx.mvc.Auth.setUser(input);
};



/**
 * @constructor
 */
xrx.mvc.Password = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Password, xrx.mvc.User);



xrx.mvc.Password.prototype.handleInput_ = function() {
  var input = goog.dom.forms.getValue(this.element_);
  xrx.mvc.Auth.setPassword(input);
};



/**
 * @constructor
 */
xrx.mvc.Signin = function(element) {

  goog.base(this, element);

  this.auth_;
};
goog.inherits(xrx.mvc.Signin, xrx.mvc.Component);



xrx.mvc.Signin.prototype.createDom = function() {
  this.auth_ = this.getParentComponent('xrx-auth');
  this.show(!xrx.mvc.Auth.isAuth());
  goog.events.listen(this.element_, goog.events.EventType.CLICK, function(e) {
    e.preventDefault();
    this.auth_.signin();
  }, false, this);
};



/**
 * @constructor
 */
xrx.mvc.Signout = function(element) {

  goog.base(this, element);

  this.auth_;
};
goog.inherits(xrx.mvc.Signout, xrx.mvc.Component);



xrx.mvc.Signout.prototype.createDom = function() {
  this.auth_ = this.getParentComponent('xrx-auth');
  this.show(xrx.mvc.Auth.isAuth());
  goog.events.listen(this.element_, goog.events.EventType.CLICK, function(e) {
    e.preventDefault();
    this.auth_.signout();
  }, false, this);
};
