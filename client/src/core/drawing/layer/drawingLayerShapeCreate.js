/**
 * @fileoverview A class representing a drawing layer where new shapes
 *   can be created.
 * @private
 */

goog.provide('xrx.drawing.LayerShapeCreate');



goog.require('xrx.drawing.Layer');



/**
 * A class representing a drawing layer where new shapes can be created.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @extends xrx.drawing.Layer
 * @private
 */
xrx.drawing.LayerShapeCreate = function(drawing) {

  goog.base(this, drawing);
};
goog.inherits(xrx.drawing.LayerShapeCreate, xrx.drawing.Layer);



xrx.drawing.LayerShapeCreate.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
