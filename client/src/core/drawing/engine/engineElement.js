/**
 * @fileoverview Abstract super-class of all engine elements.
 * @private
 */

goog.provide('xrx.engine.Element');



goog.require('goog.Disposable');
goog.require('xrx.engine');



/**
 * Abstract super-class of all engine elements.
 * @constructor
 * @private
 */
xrx.engine.Element = function() {

  goog.base(this);
};
goog.inherits(xrx.engine.Element, goog.Disposable);



xrx.engine.Element.prototype.startDrawing = function() {};



xrx.engine.Element.prototype.finishDrawing = function() {};



xrx.engine.Element.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
