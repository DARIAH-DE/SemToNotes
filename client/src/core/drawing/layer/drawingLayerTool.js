/**
 * @fileoverview A class representing a drawing layer where tools can be
 *   plugged in.
 * @private
 */

goog.provide('xrx.drawing.LayerTool');



goog.require('xrx.drawing.Layer');
goog.require('xrx.drawing.tool.Magnifier');



/**
 * A class representing a drawing layer where tools can be plugged in.
 * @param {xrx.drawing.Drawing} drawing The parent drawing canvas.
 * @constructor
 * @extends {xrx.drawing.Layer}
 * @private
 */
xrx.drawing.LayerTool = function(drawing) {

  goog.base(this, drawing);

  this.magnifier_;
};
goog.inherits(xrx.drawing.LayerTool, xrx.drawing.Layer);



/**
 * Activates or deactivates the magnifier tool.
 */
xrx.drawing.LayerTool.prototype.toggleMagnifier = function() {
  if (!this.magnifier_) this.magnifier_ = xrx.drawing.tool.Magnifier.create(
      this.drawing_);
  if (this.magnifier_.isActive()) {
    this.magnifier_.hide();
  } else {
    this.magnifier_.show();
  }
};


xrx.drawing.LayerTool.prototype.disposeInternal = function() {
  this.magnifier_ = null;
  goog.base(this, 'disposeInternal');
};

