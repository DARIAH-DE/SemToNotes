/**
 * @fileoverview
 */

goog.provide('xrx.mvc.AbstractAction');



goog.require('xrx.mvc');
goog.require('xrx.mvc.Component');



/**
 * @constructor
 */
xrx.mvc.AbstractAction = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.AbstractAction, xrx.mvc.Component);



xrx.mvc.AbstractAction.prototype.execute_ = goog.abstractMethod;



xrx.mvc.AbstractAction.prototype.createDom = function() {};



xrx.mvc.AbstractAction.prototype.execute = function(opt_params) {
  var datasetIf = this.getDataset('xrxIf');
  var datasetIfNot = this.getDataset('xrxIfNot');
  var calculate;
  if (!datasetIf && !datasetIfNot) {
    this.execute_(opt_params);
  } else if (datasetIf && xrx.mvc.getComponent(datasetIf).getResultAsBoolean()) {
    this.execute_(opt_params);
  } else if (datasetIfNot && !xrx.mvc.getComponent(datasetIfNot).getResultAsBoolean()) {
    this.execute_(opt_params);
  } else {}
};
