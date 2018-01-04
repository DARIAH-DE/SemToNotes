/**
 * @fileoverview A class representing a shape called
 * "Directed Polygon" useful for topological image
 * annotation
 */

goog.provide('xrx.shape.DiPolygon');
goog.provide('xrx.shape.DiPolygonPolygon');
goog.provide('xrx.shape.DiPolygonArrow');
goog.provide('xrx.shape.DiPolygonArrowModifiable');



goog.require('xrx.geometry');
goog.require('xrx.shape.Group');
goog.require('xrx.shape.Line');
goog.require('xrx.shape.LineModifiable');
goog.require('xrx.shape.Polygon');
goog.require('xrx.shape.Rect');



/**
 * @constructor
 */
xrx.shape.DiPolygonArrow = function(drawing, diPolygon) {

  goog.base(this, drawing);

  this.diPolygon_ = diPolygon;

  this.angle_;
};
goog.inherits(xrx.shape.DiPolygonArrow, xrx.shape.Line);



xrx.shape.DiPolygonArrow.prototype.getDiPolygon = function() {
  return this.diPolygon_;
};



xrx.shape.DiPolygonArrow.prototype.getModifiable = function() {
  if (this.modifiable_ === undefined) this.modifiable_ =
      new xrx.shape.DiPolygonArrowModifiable(this);
  return this.modifiable_;
};



/**
 * @constructor
 */
xrx.shape.DiPolygonArrowModifiable = function(diPolygonArrow) {

  goog.base(this, diPolygonArrow);
};
goog.inherits(xrx.shape.DiPolygonArrowModifiable, xrx.shape.LineModifiable);



/**
 * @private
 */
xrx.shape.DiPolygonArrowModifiable.prototype.setCoordAt = function(pos, coord) {
  var box = this.shape_.getDiPolygon().getBox();
  var x1 = coord[0];
  var y1 = coord[1];
  if (x1 < box.x) {
    x1 = box.x;
  } else if (x1 > box.x2) {
    x1 = box.x2;
  }
  if (y1 < box.y) {
    y1 = box.y;
  } else if (y1 > box.y2) {
    y1 = box.y2;
  }
  var centerX = box.x + (box.width / 2);
  var centerY = box.y + (box.height / 2);
  var x2 = centerX - (x1 - centerX);
  var y2 = centerY - (y1 - centerY);
  if (pos === 0) {
    this.dragger_[0].setCoordX(x1);
    this.dragger_[0].setCoordY(y1);
    this.dragger_[1].setCoordX(x2);
    this.dragger_[1].setCoordY(y2);
    this.shape_.setX1(x1);
    this.shape_.setY1(y1);
    this.shape_.setX2(x2);
    this.shape_.setY2(y2);
  } else {
    this.dragger_[1].setCoordX(x1);
    this.dragger_[1].setCoordY(y1);
    this.dragger_[0].setCoordX(x2);
    this.dragger_[0].setCoordY(y2);
    this.shape_.setX1(x2);
    this.shape_.setY1(y2);
    this.shape_.setX2(x1);
    this.shape_.setY2(y1);
  }
};



xrx.shape.DiPolygonArrowModifiable.prototype.move = function() {
  return;
};



xrx.shape.DiPolygonPolygon = function(drawing) {

  goog.base(this, drawing);
};
goog.inherits(xrx.shape.DiPolygonPolygon, xrx.shape.Polygon);



/**
 * @constructor
 */
xrx.shape.DiPolygon = function(drawing) {

  goog.base(this, drawing);

  this.box_;

  this.init_();
};
goog.inherits(xrx.shape.DiPolygon, xrx.shape.Group);



xrx.shape.DiPolygon.prototype.getArrow = function() {
  return this.arrow_;
};



xrx.shape.DiPolygon.prototype.getBox = function() {
  return this.box_;
};



xrx.shape.DiPolygon.prototype.MARGIN = 20;



xrx.shape.DiPolygon.prototype.setCoords = function(coords) {
  this.childs_[0].setCoords(coords);
};



xrx.shape.DiPolygon.prototype.init_ = function() {
  var polygon = new xrx.shape.DiPolygonPolygon(this.drawing_);
  var arrow = new xrx.shape.DiPolygonArrow(this.drawing_, this);
  this.addChildren([polygon, arrow]);
};
