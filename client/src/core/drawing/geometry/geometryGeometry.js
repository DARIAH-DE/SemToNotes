/**
 * @fileoverview Super-class of all geometry classes.
 * @private
 */

goog.provide('xrx.geometry.Geometry');



goog.require('goog.Disposable');



/**
 * Super-class of all geometry classes.
 * @constructor
 * @private
 */
xrx.geometry.Geometry = function() {

  goog.base(this);
};
goog.inherits(xrx.geometry.Geometry, goog.Disposable);



xrx.geometry.Geometry.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
