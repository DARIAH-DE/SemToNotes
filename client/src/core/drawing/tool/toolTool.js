/**
 * @fileoverview A class implementing a magnifier tool for
 * a drawing canvas.
 * @private
 */

goog.provide('xrx.drawing.tool.Tool');



xrx.drawing.tool.Tool = function(drawing, element, canvas) {

  this.drawing_ = drawing;

  this.isActive_ = false;

  this.element_ = element;

  this.canvas_ = canvas;
};



xrx.drawing.tool.Tool.prototype.isActive = function() {
  return this.isActive_;
};



xrx.drawing.tool.Tool.prototype.getCanvas = function() {
  return this.canvas_;
};
