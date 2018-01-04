/**
 * @fileoverview 
 */

goog.provide('xrx.mvc.Send');



goog.require('goog.events.EventType');
goog.require('xrx.mvc');
goog.require('xrx.mvc.AbstractAction');



xrx.mvc.Send = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Send, xrx.mvc.AbstractAction);



xrx.mvc.Send.prototype.execute_ = function(opt_params) {
  var id = this.getDataset('xrxSubmission');
  var submission = xrx.mvc.getComponent(id);
  if (submission) {
    submission.submit();
  } else {
    throw Error('Submission "' + id + '" not found.');
  }
};
