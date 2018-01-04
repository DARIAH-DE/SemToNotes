/**
 * @fileoverview A class representing an engine-independent graphic
 * group.
 * @private
 */

goog.provide('xrx.shape.Group');



goog.require('xrx.shape.Container');


 
/**
 * A class representing an engine-independent shape group.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @private
 */
xrx.shape.Group = function(drawing) {

  goog.base(this, drawing);

  /**
   * The engine element.
   * @type {(xrx.canvas.Group|xrx.svg.Group|xrx.vml.Group)}
   * @private
   */
  this.engineElement_ = this.drawing_.getEngine().createGroup();
};
goog.inherits(xrx.shape.Group, xrx.shape.Container);



/**
 * Draws this group and all its groups and shapes contained.
 * @private
 */
xrx.shape.Group.prototype.draw = function() {
  this.startDrawing_();
  var children = this.getChildren();
  for(var i = 0, len = children.length; i < len; i++) {
    children[i].draw();
  };
  this.finishDrawing_();
};



/**
 * Disposes this group.
 */
xrx.shape.Group.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
