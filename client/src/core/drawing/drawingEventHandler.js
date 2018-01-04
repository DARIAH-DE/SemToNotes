/**
 * @fileoverview
 * @private
 */

goog.provide('xrx.drawing.EventHandler');



goog.require('goog.style');
goog.require('xrx.drawing.EventTarget');



/**
 * @constructor
 * @private
 */
xrx.drawing.EventHandler = function() {

  goog.base(this);
};
goog.inherits(xrx.drawing.EventHandler, xrx.drawing.EventTarget);



/**
 * 
 */
xrx.drawing.EventHandler.prototype.handleShapeCreate = function(shapes) {
  this.creatable_.handleCreate(shapes);
};



/**
 * 
 */
xrx.drawing.EventHandler.prototype.handleShapeCreated = function(shape) {
  this.creatable_.handleCreated(shape);
};



/**
 * 
 */
xrx.drawing.EventHandler.prototype.getClientPoint = function(e) {
  var touches = e.getBrowserEvent().changedTouches;
  var x;
  var y;
  if (touches) {
    x = touches[0].clientX;
    y = touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }
  return [x, y];
};



/**
 *
 */
xrx.drawing.EventHandler.prototype.getOffsetPoint = function(e, opt_transformed) {
  var pos = goog.style.getClientPosition(this.canvas_.getEngineElement().getEventTarget());
  var clientPoint = this.getClientPoint(e);
  var offset = [clientPoint[0] - pos.x, clientPoint[1] - pos.y];
  if (opt_transformed === true) {
    return this.getViewbox().getCTM().transformPoint(offset);
  } else {
    return offset;
  }
};



/**
 * Returns the shape currently selected or hovered by the user.
 * @return {xrx.shape.Shape} The selected shape.
 */
xrx.drawing.EventHandler.prototype.getShapeSelected = function(point) {
  var layer;
  var shapes;
  var shape;
  var coords;
  var coord;
  var found = false;
  for (var i = this.layer_.length - 1; i >= 0; i--) {
    layer = this.layer_[i];
    if (!layer.isLocked()) {
      shapes = layer.getShapes() || [];
      for (var j = shapes.length - 1; j >= 0; j--) {
        shape = shapes[j];
        if (shape.getGeometry().containsPoint(point)) {
          found = true;
          break;
        }
      }
    }
    if (found === true) break;
  }
  return found ? shape : undefined;
};



/**
 * Returns the shapes currently selected or hovered by the user.
 * @return {Array<xrx.shape.Shape>} The shapes.
 */
xrx.drawing.EventHandler.prototype.getShapesSelected = function(point) {
  var layer;
  var shapes;
  var shape;
  var coords;
  var coord;
  var found = [];
  for (var i = this.layer_.length - 1; i >= 0; i--) {
    layer = this.layer_[i];
    if (!layer.isLocked()) {
      shapes = layer.getShapes() || [];
      for (var j = shapes.length - 1; j >= 0; j--) {
        shape = shapes[j];
        if (shape.getGeometry().containsPoint(point)) {
          found.push(shape);
        }
      }
    }
  }
  return found;
};



xrx.drawing.EventHandler.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
