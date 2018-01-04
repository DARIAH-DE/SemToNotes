/**
 * @fileoverview
 */

goog.provide('xrx.mvc.Script');



goog.require('xrx.mvc.AbstractAction');



/**
 * @constructor
 */
xrx.mvc.Script = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Script, xrx.mvc.AbstractAction);



xrx.mvc.Script.prototype.execute_ = function(opt_params) {
  var js = this.getDataset('xrxScript');
  if (js) eval(js);
};
