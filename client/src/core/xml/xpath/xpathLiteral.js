/**
 * @fileoverview A class representing the string literals.
 */

goog.provide('xrx.xpath.Literal');

goog.require('xrx.xpath.Expr');



/**
 * Constructs a string literal expression.
 *
 * @param {string} text The text value of the literal.
 * @constructor
 * @extends {xrx.xpath.Expr}
 */
xrx.xpath.Literal = function(text) {
  xrx.xpath.Expr.call(this, xrx.xpath.DataType.STRING);

  /**
   * @type {string}
   * @private
   */
  this.string_ = text.substring(1, text.length - 1);
};
goog.inherits(xrx.xpath.Literal, xrx.xpath.Expr);


/**
 * @override
 * @return {string} The string result.
 */
xrx.xpath.Literal.prototype.evaluate = function(context) {
  return this.string_;
};



/**
 * Returns the literal's string value.
 * @return {String} The literal as string.
 */
xrx.xpath.Literal.prototype.getString = function() {
  return this.string_;
};


/**
 * @override
 */
xrx.xpath.Literal.prototype.toString = function() {
  return 'Literal: ' + this.string_;
};
