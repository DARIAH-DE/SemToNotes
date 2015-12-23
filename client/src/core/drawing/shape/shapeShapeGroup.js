/**
 * @fileoverview A class representing a group of shapes sharing
 * style definitions and behaviour.
 */

goog.provide('xrx.shape.ShapeGroup');
goog.provide('xrx.shape.ShapeGroupCreatable');
goog.provide('xrx.shape.ShapeGroupHoverable');
goog.provide('xrx.shape.ShapeGroupModifiable');
goog.provide('xrx.shape.ShapeGroupSelectable');



goog.require('xrx.shape.Group');
goog.require('xrx.shape.Creatable');
goog.require('xrx.shape.Hoverable');
goog.require('xrx.shape.Modifiable');
goog.require('xrx.shape.Selectable');


/**
 * A class representing a group of shapes sharing
 * style definitions and behaviour.
 * @constructor
 */
xrx.shape.ShapeGroup = function(drawing) {

  goog.base(this, drawing);
};
goog.inherits(xrx.shape.ShapeGroup, xrx.shape.Group);



/**
 * Adds shapes to this shape group.
 * @param {Array<xrx.shape.Shape>} children The shapes to add.
 */
xrx.shape.ShapeGroup.prototype.addChildren = function(children) {
  goog.base(this, 'addChildren', children);
  for (var i = 0, len = this.childs_.length; i < len; i++) {
    this.childs_[i].setShapeGroup(this);
    this.geometry_.addChild(this.childs_[i].getGeometry());
  }
};



/**
 * Returns a helper shape that makes this shape group hoverable.
 * @return {xrx.shape.ShapeGroupHoverable} The hoverable shape group.
 */
xrx.shape.ShapeGroup.prototype.getHoverable = function() {
  if (this.hoverable_ === undefined) this.hoverable_ =
      new xrx.shape.ShapeGroupHoverable(this);
  return this.hoverable_;
};



/**
 * Returns a helper shape that makes this shape group selectable.
 * @return {xrx.shape.ShapeGroupSelectable} The selectable shape group.
 */
xrx.shape.ShapeGroup.prototype.getSelectable = function() {
  if (this.selectable_ === undefined) this.selectable_ =
      new xrx.shape.ShapeGroupSelectable(this);
  return this.selectable_;
};



/**
 * Returns a helper shape that makes this shape group modifiable.
 * @return {xrx.shape.ShapeGroupModifiable} The modifiable shape group.
 */
xrx.shape.ShapeGroup.prototype.getModifiable = function() {
  if (this.modifiable_ === undefined) this.modifiable_ =
      new xrx.shape.ShapeGroupModifiable(this);
  return this.modifiable_;
};



/**
 * Returns a helper shape that makes this shape group creatable.
 * @return {xrx.shape.ShapeGroupCreatable} The creatable shape group.
 */
xrx.shape.ShapeGroup.prototype.getCreatable = function() {
  if (this.creatable_ === undefined) this.creatable_ =
      new xrx.shape.ShapeGroupCreatable(this);
  return this.creatable_;
};



/**
 * A class representing a hoverable shape group.
 * @param {xrx.shape.ShapeGroup} shapeGroup The parent shape group.
 * @consturctor
 * @private
 */
xrx.shape.ShapeGroupHoverable = function(shapeGroup) {

  goog.base(this, shapeGroup);
};
goog.inherits(xrx.shape.ShapeGroupHoverable, xrx.shape.Hoverable);



/**
 * A class representing a selectable shape group.
 * @param {xrx.shape.ShapeGroup} shapeGroup The parent shape group.
 * @consturctor
 * @private
 */
xrx.shape.ShapeGroupSelectable = function(shapeGroup) {

  goog.base(this, shapeGroup);
};
goog.inherits(xrx.shape.ShapeGroupSelectable, xrx.shape.Selectable);



/**
 * A class representing a modifiable shape group.
 * @param {xrx.shape.ShapeGroup} shapeGroup The parent shape group.
 * @consturctor
 * @private
 */
xrx.shape.ShapeGroupModifiable = function(shapeGroup) {

  goog.base(this, shapeGroup);
};
goog.inherits(xrx.shape.ShapeGroupModifiable, xrx.shape.Modifiable);



/**
 * @private
 */
xrx.shape.ShapeGroupModifiable.prototype.getDragger = function() {
  var childs = this.shape_.getChildren();
  var dragger = [];
  for(var i = 0, len = childs.length; i < len; i++) {
    dragger = dragger.concat(childs[i].getModifiable().getDragger());
  }
  return dragger;
};



/**
 * @private
 */
xrx.shape.ShapeGroupModifiable.prototype.move = function(distX, distY) {
  var childs = this.shape_.getChildren();
  for(var i = 0, len = childs.length; i < len; i++) {
    childs[i].getModifiable().move(distX, distY);
  }
};



/**
 * A class representing a creatable shape group.
 * @param {xrx.shape.ShapeGroup} shapeGroup The parent shape group.
 * @consturctor
 * @private
 */
xrx.shape.ShapeGroupCreatable = function(shapeGroup) {

  goog.base(this, shapeGroup, new xrx.shape.ShapeGroup(shapeGroup.getDrawing()));
  
  this.current_ = 0;
  
  var self = this;
  
  this.target_.getDrawing().eventShapeCreated = function(shape) {
    self.preview_.addChildren(shape);
    if (self.current_ < self.target_.getChildren().length - 1) {
      self.current_++;
    } else {
      var shapeGroup = new xrx.shape.ShapeGroup(self.target_.getDrawing());
      shapeGroup.addChildren(self.preview_.getChildren());
      shapeGroup.setStyle(self.target_);
      self.target_.getDrawing().getLayerShape().addShapes(shapeGroup);
      self.target_.getDrawing().getLayerShapeCreate().removeShapes();
      self.target_.getDrawing().draw();
      self.current_ = 0;
      self.preview_.removeChildren();
    }
  };
};
goog.inherits(xrx.shape.ShapeGroupCreatable, xrx.shape.Creatable);



xrx.shape.ShapeGroupCreatable.prototype.handleDown = function(e, cursor) {
  this.target_.getChild(this.current_).getCreatable().handleDown(e, cursor);
};



xrx.shape.ShapeGroupCreatable.prototype.handleMove = function(e, cursor) {
  this.target_.getChild(this.current_).getCreatable().handleMove(e, cursor);
};



xrx.shape.ShapeGroupCreatable.prototype.handleUp = function(e, cursor) {
  this.target_.getChild(this.current_).getCreatable().handleUp(e, cursor);
};
