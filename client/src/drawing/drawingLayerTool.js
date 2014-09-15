/**
 * @fileoverview A class representing the layer where tools can be plugged in.
 */

goog.provide('xrx.drawing.LayerTool');



goog.require('xrx.drawing.Layer');
goog.require('xrx.drawing.tool.Magnifier');



/**
 * @constructor
 */
xrx.drawing.LayerTool = function(drawing) {

  goog.base(this, drawing);

  this.magnifier_;
};
goog.inherits(xrx.drawing.LayerTool, xrx.drawing.Layer);



xrx.drawing.LayerTool.prototype.toggleMagnifier = function() {
  if (!this.magnifier_) this.magnifier_ = xrx.drawing.tool.Magnifier.create(
      this.drawing_);
  if (this.magnifier_.isActive()) {
    this.magnifier_.hide();
  } else {
    this.magnifier_.show();
  }
};
