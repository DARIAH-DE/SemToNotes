/**
 * @fileoverview A class offering a tool-bar for a drawing canvas.
 */

goog.provide('xrx.graphic.CanvasToolbar');



goog.require('goog.dom.classes');
goog.require('goog.style');
goog.require('xrx.mvc');
goog.require('xrx.mvc.Component');
goog.require('xrx.graphic.Canvas');



/**
 * @constructor
 */
xrx.graphic.CanvasToolbar = function(element) {

  this.selected_;

  goog.base(this, element);
};
goog.inherits(xrx.graphic.CanvasToolbar, xrx.mvc.Component);
xrx.mvc.registerComponent('xrx-canvas-toolbar', xrx.graphic.CanvasToolbar);



xrx.graphic.CanvasToolbar.prototype.getCanvas = function() {
  var canvasDiv = goog.dom.getAncestorByClass(this.element_, 'xrx-canvas');
  var canvasComponent = xrx.mvc.getComponent(canvasDiv.id);
  return canvasComponent ? canvasComponent : new xrx.graphic.Canvas(canvasDiv);
};



xrx.graphic.CanvasToolbar.prototype.setSelected = function(toolbarItem) {
  if (this.selected_) goog.dom.classes.remove(this.selected_.getElement(),
      'xrx-ui-state-selected');
  this.selected_ = toolbarItem;
  goog.dom.classes.add(toolbarItem.getElement(), 'xrx-ui-state-selected');
};



xrx.graphic.CanvasToolbar.prototype.createDom = function() {
  if (!this.getCanvas().getDrawing().getEngine().isAvailable())
      goog.style.setStyle(this.element_, 'display', 'none');
};
