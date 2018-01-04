/**
 * @fileoverview A class representing a pointer to the shape
 * currently created by the user.
 * @private
 */

goog.provide('xrx.drawing.Creatable');



goog.require('xrx.EventTarget');



xrx.drawing.Creatable = function(drawing) {
  
  goog.base(this);

  /**
   * The parent drawing canvas.
   * @type {xrx.drawing.Drawing}
   */
  this.drawing_ = drawing;
  
  /**
   * The shape currently created.
   * @type {xrx.shape.Creatable}
   */
  this.shapeCreatable_;
  
  /**
   * Array of new shapes created for a shape group.
   * @type {Array<xrx.shape.Shape>}
   */
  this.newShapes_ = [];
  
  this.previewShapes_ = [];
};
goog.inherits(xrx.drawing.Creatable, xrx.EventTarget);



xrx.drawing.Creatable.prototype.setShapeCreatable = function(creatable) {
  this.shapeCreatable_ = creatable;
};



xrx.drawing.Creatable.prototype.handleCreate = function(preview) {
  if (this.shapeCreatable_ instanceof xrx.shape.ShapeGroupCreatable) {
    if (this.shapeCreatable_.current === 0) {
      this.drawing_.getLayerShapeCreate().addShapes(this.shapeCreatable_.getPreview());
    }
    for (var i = 0; i < preview.length; i++) {
      if (preview[i] instanceof xrx.shape.Dragger) {
        this.drawing_.getLayerShapeModify().addShapes(preview[i]);
      } else {
        this.shapeCreatable_.getPreview().addChildren(preview[i]);
      }
    }
  } else {
    this.drawing_.getLayerShapeCreate().addShapes(preview);
  }
}



xrx.drawing.Creatable.prototype.handleCreated = function(shape) {
  if (this.shapeCreatable_ instanceof xrx.shape.ShapeGroupCreatable) {
    this.newShapes_.push(shape);
    this.drawing_.getLayerShapeModify().removeShapes();
    if (this.shapeCreatable_.allShapesCreated()) {
      var shapeGroup = new xrx.shape.ShapeGroup(this.drawing_);
      shapeGroup.addChildren(this.newShapes_);
      shapeGroup.setStyles(this.shapeCreatable_.getTarget());
      this.drawing_.getLayerShape().addShapes(shapeGroup);
      this.drawing_.getLayerShapeCreate().removeShapes();
      this.drawing_.draw();
      this.shapeCreatable_.reset();
      this.newShapes_ = [];
    } else {
      this.shapeCreatable_.current++;
    }
  } else {
    this.drawing_.getLayerShape().addShapes(shape);
    this.drawing_.getLayerShapeCreate().removeShapes();
    this.drawing_.draw();
  }
};



xrx.drawing.Creatable.prototype.handleDown = function(e, cursor) {
  this.shapeCreatable_.handleDown(e, cursor);
};



xrx.drawing.Creatable.prototype.handleMove = function(e, cursor) {
  this.shapeCreatable_.handleMove(e, cursor);
};



xrx.drawing.Creatable.prototype.handleUp = function(e, cursor) {
  this.shapeCreatable_.handleUp(e, cursor);
};
