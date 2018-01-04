/**
 * @fileoverview 
 */

goog.provide('xrx.mvc.Submission');



goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.crypt.base64');
goog.require('goog.json');
goog.require('goog.net.EventType');
goog.require('goog.net.XhrIo');
goog.require('xrx.mvc.Auth');
goog.require('xrx.mvc.Component');
goog.require('xrx.xml.Indent');



xrx.mvc.Submission = function(element) {

  goog.base(this, element);

  this.xhr_;
};
goog.inherits(xrx.mvc.Submission, xrx.mvc.Component);



xrx.mvc.Submission.prototype.createDom = function() {
  this.xhr_ = new goog.net.XhrIo();
  goog.events.listen(this.xhr_, goog.net.EventType.ERROR,
    function(e) {
      this.dispatch('xrx-event-submit-error');
  }, false, this);
  goog.events.listen(this.xhr_, goog.net.EventType.SUCCESS,
    function(e) {
      this.dispatch('xrx-event-submit-done');
  }, false, this);
};



xrx.mvc.Submission.prototype.getResponseBody = function() {
  var self = this;
  var xml = this.getResult().getNode(0).getXml();
  var path = goog.array.peek(this.getDataset('xrxResource').split('/'));
  var response = goog.json.serialize({
    'path': path,
    'message': 'Data updated by <' + location.href + '>.',
    'content': goog.crypt.base64.encodeString(unescape(encodeURIComponent(xrx.xml.Indent.forward(xml, 2)))),
    'sha': self.sha_
  });
  return response;
};



xrx.mvc.Submission.prototype.submit = function() {
  var self = this;
  this.xhr_.headers.set('Authorization', xrx.mvc.Auth.getCredentials());
  goog.net.XhrIo.send(self.getDataset('xrxResource'), function(e) {
    self.sha_ = e.target.getResponseJson().sha;
    self.xhr_.send(self.getDataset('xrxResource'), self.getDataset('xrxMethod'),
        self.getResponseBody());
  }, 'GET');
};