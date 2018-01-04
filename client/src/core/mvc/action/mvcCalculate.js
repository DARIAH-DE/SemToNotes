/**
 * @fileoverview
 */

goog.provide('xrx.mvc.Calculate');



goog.require('xrx.mvc.AbstractAction');



xrx.mvc.Calculate = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Calculate, xrx.mvc.AbstractAction);



xrx.mvc.Calculate.prototype.getResult = function() {
  return this.xpath_.evaluate(undefined, xrx.xpath.XPathResultType.ANY_TYPE);
};



xrx.mvc.Calculate.prototype.getResultAsBoolean = function() {
  var result = this.getResult();
  if (result.stringValue) {
    return !!result.stringValue;
  } else if (result.numberValue) {
    return !!result.numberValue;
  } else if (result.booleanValue) {
    return result.booleanValue;
  } else {
    return result.snapshotLength > 0;
  }
  return false;
};



xrx.mvc.Calculate.prototype.execute_ = function(opt_params) {};
