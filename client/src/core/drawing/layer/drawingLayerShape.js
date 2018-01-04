/**
 * @fileoverview A class representing a drawing layer where shapes
 *   can be rendered.
 * @private
 */

goog.provide('xrx.drawing.LayerShape');



goog.require('xrx.drawing.Layer');



/**
 * A class representing a drawing layer where shapes can be rendered.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @extends xrx.drawing.Layer
 * @private
 */
xrx.drawing.LayerShape = function(drawing) {

  goog.base(this, drawing);
};
goog.inherits(xrx.drawing.LayerShape, xrx.drawing.Layer);



xrx.drawing.LayerShape.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
