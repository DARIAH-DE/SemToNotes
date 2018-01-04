/**
 * @fileoverview VML super class.
 * @private
 */

goog.provide('xrx.vml.Element');



goog.require('xrx.engine.Element');
goog.require('xrx.vml');



/**
 * VML super class.
 * @param
 * @constructor
 * @private
 */
xrx.vml.Element = function(element) {

  goog.base(this);

  /**
   * 
   * @type
   */
  this.element_ = element;
};
goog.inherits(xrx.vml.Element, xrx.engine.Element);



/**
 * Returns the HTML element held by the Raphael object.
 * @return {HTMLElement} The HTML element.
 */
xrx.vml.Element.prototype.getElement = function() {
  return this.element_;
};



xrx.vml.Element.prototype.applyTransform = function(matrix) {
  if (!matrix) return;
  var s = matrix.m00_ + ',' + matrix.m10_ +
      ',' + matrix.m01_ + ',' + matrix.m11_ +
      ',' + matrix.m02_ + ',' + matrix.m12_;
  console.log(s);
  this.element_.setAttribute('matrix', s); 
};
