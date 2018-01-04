/**
 * @fileoverview A class representing a drawing layer where shapes
 *   can be modified.
 * @private
 */

goog.provide('xrx.drawing.LayerShapeModify');



goog.require('xrx.drawing.Layer');



/**
 * A class representing a drawing layer where shapes can be modified.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @extends xrx.drawing.Layer
 * @private
 */
xrx.drawing.LayerShapeModify = function(drawing) {

  goog.base(this, drawing);
};
goog.inherits(xrx.drawing.LayerShapeModify, xrx.drawing.Layer);



/**
 * Add modifiers such as vertex dragging elements to this layer.
 * @param {Array<xrx.shape.Modifiable>} modifiable The modifiable shape.
 */
xrx.drawing.LayerShapeModify.prototype.activate = function(modifiable) {
  this.removeShapes();
  this.addShapes(modifiable.getDragger());
};



/**
 * Disposes this layer.
 */
xrx.drawing.LayerShapeModify.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
