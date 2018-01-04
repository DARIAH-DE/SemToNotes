/**
 * @fileoverview 
 */

goog.provide('xrx.graphic.ShapeRect');
goog.provide('xrx.graphic.ShapeRectBottom');
goog.provide('xrx.graphic.ShapeRectCreate');
goog.provide('xrx.graphic.ShapeRectGeometry');
goog.provide('xrx.graphic.ShapeRectHeight');
goog.provide('xrx.graphic.ShapeRectInsert');
goog.provide('xrx.graphic.ShapeRectLeft');
goog.provide('xrx.graphic.ShapeRectRight');
goog.provide('xrx.graphic.ShapeRectTop');
goog.provide('xrx.graphic.ShapeRectWidth');
goog.provide('xrx.graphic.ShapeRectX');
goog.provide('xrx.graphic.ShapeRectY');



goog.require('goog.dom.dataset');
goog.require('xrx.mvc');
goog.require('xrx.mvc.ChildComponent');
goog.require('xrx.mvc.ComponentView');
goog.require('xrx.mvc.Controller');
goog.require('xrx.shape.Rect');
goog.require('xrx.graphic.Shape');



/**
 * @constructor
 */
xrx.graphic.ShapeRect = function(element, drawing) {

  goog.base(this, element, drawing);

  this.shape_;

  this.rectX_;

  this.rectY_;

  this.rectWidth_;

  this.rectHeight_;

  this.rectLeft_;

  this.rectTop_;

  this.rectRight_;

  this.rectBottom_;
};
goog.inherits(xrx.graphic.ShapeRect, xrx.graphic.Shape);
xrx.mvc.registerComponent('xrx-shape-rect', xrx.graphic.ShapeRect);



xrx.graphic.ShapeRect.prototype.getX = function() {
  return this.shape_.getCoords()[0][0];
};



xrx.graphic.ShapeRect.prototype.setX = function(coord) {
  var coords = this.shape_.getCoords();
  coords[0][0] = coord;
  this.shape_.setCoords(coords);
  this.shape_.setAffineCoords(0);
};



xrx.graphic.ShapeRect.prototype.getLeft = function() {
  return this.getX();
};



xrx.graphic.ShapeRect.prototype.setLeft = function(coord) {
  return this.setX(coord);
};



xrx.graphic.ShapeRect.prototype.getY = function() {
  return this.shape_.getCoords()[0][1];
};



xrx.graphic.ShapeRect.prototype.setY = function(coord) {
  var coords = this.shape_.getCoords();
  coords[0][1] = coord;
  this.shape_.setCoords(coords);
  this.shape_.setAffineCoords(0);
};



xrx.graphic.ShapeRect.prototype.getTop = function() {
  return this.getY();
};



xrx.graphic.ShapeRect.prototype.setTop = function(coord) {
  return this.setY(coord);
};



xrx.graphic.ShapeRect.prototype.getWidth = function() {
  var coords = this.shape_.getCoords();
  return coords[1][0] - coords[0][0];
};



xrx.graphic.ShapeRect.prototype.setWidth = function(width) {
  var coords = this.shape_.getCoords();
  coords[1][0] = coords[0][0] + width;
  this.shape_.setCoords(coords);
  this.shape_.setAffineCoords(1);
};



xrx.graphic.ShapeRect.prototype.getRight = function() {
  return this.shape_.getCoords()[1][0];
};



xrx.graphic.ShapeRect.prototype.setRight = function(coord) {
  var coords = this.shape_.getCoords();
  coords[1][0] = coord;
  this.shape_.setCoords(coords);
  this.shape_.setAffineCoords(1);
};



xrx.graphic.ShapeRect.prototype.getHeight = function() {
  var coords = this.shape_.getCoords();
  return coords[3][1] - coords[0][1];
};



xrx.graphic.ShapeRect.prototype.setHeight = function(height) {
  var coords = this.shape_.getCoords();
  coords[3][1] = coords[0][1] + height;
  this.shape_.setCoords(coords);
  this.shape_.setAffineCoords(3);
};



xrx.graphic.ShapeRect.prototype.getBottom = function() {
  return this.shape_.getCoords()[3][1];
};



xrx.graphic.ShapeRect.prototype.setBottom = function(coord) {
  var coords = this.shape_.getCoords();
  coords[3][1] = coord;
  this.shape_.setCoords(coords);
  this.shape_.setAffineCoords(3);
};



xrx.graphic.ShapeRect.prototype.mvcRefresh = function() {
  if (!this.getResult().getNode(0)) return;
  xrx.mvc.Controller.rebuild = false;
  if (this.rectX_)      this.rectX_.refresh();
  if (this.rectY_)      this.rectY_.refresh();
  if (this.rectWidth_)  this.rectWidth_.refresh();
  if (this.rectHeight_) this.rectHeight_.refresh();
  if (this.rectLeft_)   this.rectLeft_.refresh();
  if (this.rectTop_)    this.rectTop_.refresh();
  if (this.rectRight_)  this.rectRight_.refresh();
  if (this.rectBottom_) this.rectBottom_.refresh();
  xrx.mvc.Controller.rebuild = true;
};



xrx.graphic.ShapeRect.prototype.mvcRemove = function() {
  this.getDrawing().getLayerShape().removeShape(this.shape_);
  this.getDrawing().draw();
  this.shape_ = null;
  this.rectX_ = null;
  this.rectY_ = null;
  this.rectWidth_ = null;
  this.rectHeight_ = null;
  this.rectLeft_ = null;
  this.rectTop_ = null;
  this.rectRight_ = null;
  this.rectBottom_ = null;
};



xrx.graphic.ShapeRect.prototype.mvcModelDeleteData = function() {
  xrx.mvc.Controller.removeNode(this, this.getResult().getNode(0));
};



xrx.graphic.ShapeRect.prototype.mvcModelUpdateData = function() {
  if (this.rectX_)      this.rectX_.modelUpdateData();
  if (this.rectY_)      this.rectY_.modelUpdateData();
  if (this.rectWidth_)  this.rectWidth_.modelUpdateData();
  if (this.rectHeight_) this.rectHeight_.modelUpdateData();
  if (this.rectLeft_)   this.rectLeft_.modelUpdateData();
  if (this.rectTop_)    this.rectTop_.modelUpdateData();
  if (this.rectRight_)  this.rectRight_.modelUpdateData();
  if (this.rectBottom_) this.rectBottom_.modelUpdateData();
};



xrx.graphic.ShapeRect.prototype.initCoordComponents = function() {
  // get datasets
  var rx      = this.getDataset('xrxRefX');
  var ry      = this.getDataset('xrxRefY');
  var rwidth  = this.getDataset('xrxRefWidth');
  var rheight = this.getDataset('xrxRefHeight');
  var rleft   = this.getDataset('xrxRefLeft');
  var rtop    = this.getDataset('xrxRefTop');
  var rright  = this.getDataset('xrxRefRight');
  var rbottom = this.getDataset('xrxRefBottom');
  var bx = this.getDataset('xrxBindX');
  var by = this.getDataset('xrxBindY');
  var bwidth = this.getDataset('xrxBindWidth');
  var bheight = this.getDataset('xrxBindHeight');
  var bleft = this.getDataset('xrxBindLeft');
  var btop = this.getDataset('xrxBindTop');
  var bright = this.getDataset('xrxBindRight');
  var bbottom = this.getDataset('xrxBindBottom');
  // initialize coordinate components
  if (rx || bx)           this.rectX_      = new xrx.graphic.ShapeRectX(this, rx, bx);
  if (ry || by)           this.rectY_      = new xrx.graphic.ShapeRectY(this, ry, by);
  if (rwidth || bwidth)   this.rectWidth_  = new xrx.graphic.ShapeRectWidth(this, rwidth, bwidth);
  if (rheight || bheight) this.rectHeight_ = new xrx.graphic.ShapeRectHeight(this, rheight, bheight);
  if (rleft || bleft)     this.rectLeft_   = new xrx.graphic.ShapeRectLeft(this, rleft, bleft);
  if (rtop || btop)       this.rectTop_    = new xrx.graphic.ShapeRectTop(this, rtop, btop);
  if (rright || bright)   this.rectRight_  = new xrx.graphic.ShapeRectRight(this, rright, bright);
  if (rbottom || bbottom) this.rectBottom_ = new xrx.graphic.ShapeRectBottom(this, rbottom, bbottom);
};



xrx.graphic.ShapeRect.prototype.createDom = function() {
  var self = this;
  var drawing = this.getDrawing();
  if (!drawing.getEngine().isAvailable()) return;
  this.shape_ = xrx.shape.Rect.create(drawing);
  if (this.getResult().getNode(0)) drawing.getLayerShape().addShapes(this.shape_);
  // handle value changed
  this.shape_.handleValueChanged = function() {
    self.mvcModelUpdateData();
  }
  // handle deleted
  this.shape_.handleDeleted = function() {
    self.mvcModelDeleteData();
  }
  this.initCoordComponents();
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectGeometry = function(rect, ref, bind) {

  this.rect_ = rect;

  this.ref_ = ref;

  this.bind_ = bind;

  goog.base(this, rect);
};
goog.inherits(xrx.graphic.ShapeRectGeometry, xrx.mvc.ChildComponent);



/**
 * @override
 */
xrx.graphic.ShapeRectGeometry.prototype.getBindId = function() {
  return this.bind_;
};



/**
 * @override
 */
xrx.graphic.ShapeRectGeometry.prototype.getRefExpression = function() {
  return this.ref_;
};



xrx.graphic.ShapeRectGeometry.prototype.percentageToPixelHorizontal = function(zone) {
  var unit = this.rect_.getUnit();
  var point = this.getResult().castAsNumber();
  if (unit !== 'percentage') {
    return point;
  } else {
    zone = zone * point / 100;
    return this.rect_.getDrawing().getLayerBackground().getImage().getWidth() * point / 100 + zone;
  }
};



xrx.graphic.ShapeRectGeometry.prototype.percentageToPixelVertical = function(zone) {
  var unit = this.rect_.getUnit();
  var point = this.getResult().castAsNumber();
  if (unit !== 'percentage') {
    return point;
  } else {
    zone = zone * point / 100;
    return this.rect_.getDrawing().getLayerBackground().getImage().getHeight() * point / 100 + zone;
  }
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectX = function(rect, ref, bind) {

  goog.base(this, rect, ref, bind);
};
goog.inherits(xrx.graphic.ShapeRectX, xrx.graphic.ShapeRectGeometry);



xrx.graphic.ShapeRectX.prototype.refresh = function() {
  this.rect_.setX(this.percentageToPixelHorizontal(
      this.rect_.getCanvas().getZoneLeft()));
};



xrx.graphic.ShapeRectX.prototype.modelUpdateData = function() {
  var x = this.rect_.getX().toFixed(1);
  xrx.mvc.Controller.updateNode(this.rect_, this.getResult().getNode(0), x.toString());
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectY = function(rect, ref, bind) {

  goog.base(this, rect, ref, bind);
};
goog.inherits(xrx.graphic.ShapeRectY, xrx.graphic.ShapeRectGeometry);



xrx.graphic.ShapeRectY.prototype.refresh = function() {
  this.rect_.setY(this.percentageToPixelVertical(
      this.rect_.getCanvas().getZoneBottom()));
};



xrx.graphic.ShapeRectY.prototype.modelUpdateData = function() {
  var y = this.rect_.getY().toFixed(1);
  xrx.mvc.Controller.updateNode(this.rect_, this.getResult().getNode(0), y.toString());
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectWidth = function(rect, ref, bind) {

  goog.base(this, rect, ref, bind);
};
goog.inherits(xrx.graphic.ShapeRectWidth, xrx.graphic.ShapeRectGeometry);



xrx.graphic.ShapeRectWidth.prototype.refresh = function() {
  this.rect_.setWidth(this.percentageToPixelHorizontal(
      this.rect_.getCanvas().getZoneRight()));
};



xrx.graphic.ShapeRectWidth.prototype.modelUpdateData = function() {
  var width = this.rect_.getWidth().toFixed(1);
  xrx.mvc.Controller.updateNode(this.rect_, this.getResult().getNode(0), width.toString());
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectHeight = function(rect, ref, bind) {

  goog.base(this, rect, ref, bind);
};
goog.inherits(xrx.graphic.ShapeRectHeight, xrx.graphic.ShapeRectGeometry);



xrx.graphic.ShapeRectHeight.prototype.refresh = function() {
  this.rect_.setHeight(this.percentageToPixelVertical(
      this.rect_.getCanvas().getZoneBottom()));
};



xrx.graphic.ShapeRectHeight.prototype.modelUpdateData = function() {
  var height = this.rect_.getHeight().toFixed(1);
  xrx.mvc.Controller.updateNode(this.rect_, this.getResult().getNode(0), height.toString());
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectLeft = function(rect, ref, bind) {

  goog.base(this, rect, ref, bind);
};
goog.inherits(xrx.graphic.ShapeRectLeft, xrx.graphic.ShapeRectGeometry);



xrx.graphic.ShapeRectLeft.prototype.refresh = function() {
  this.rect_.setLeft(this.percentageToPixelHorizontal(
      this.rect_.getCanvas().getZoneLeft()));
};



xrx.graphic.ShapeRectLeft.prototype.modelUpdateData = function() {
  var left = this.rect_.getLeft().toFixed(1);
  xrx.mvc.Controller.updateNode(this.rect_, this.getResult().getNode(0), left.toString());
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectTop = function(rect, ref, bind) {

  goog.base(this, rect, ref, bind);
};
goog.inherits(xrx.graphic.ShapeRectTop, xrx.graphic.ShapeRectGeometry);



xrx.graphic.ShapeRectTop.prototype.refresh = function() {
  this.rect_.setTop(this.percentageToPixelVertical(
      this.rect_.getCanvas().getZoneTop()));
};



xrx.graphic.ShapeRectTop.prototype.modelUpdateData = function() {
  var top = this.rect_.getTop().toFixed(1);
  xrx.mvc.Controller.updateNode(this.rect_, this.getResult().getNode(0), top.toString());
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectRight = function(rect, ref, bind) {

  goog.base(this, rect, ref, bind);
};
goog.inherits(xrx.graphic.ShapeRectRight, xrx.graphic.ShapeRectGeometry);



xrx.graphic.ShapeRectRight.prototype.refresh = function() {
  this.rect_.setRight(this.percentageToPixelHorizontal(
      this.rect_.getCanvas().getZoneRight()));
};



xrx.graphic.ShapeRectRight.prototype.modelUpdateData = function() {
  var right = this.rect_.getRight().toFixed(1);
  xrx.mvc.Controller.updateNode(this.rect_, this.getResult().getNode(0), right.toString());
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectBottom = function(rect, ref, bind) {

  goog.base(this, rect, ref, bind);
};
goog.inherits(xrx.graphic.ShapeRectBottom, xrx.graphic.ShapeRectGeometry);



xrx.graphic.ShapeRectBottom.prototype.refresh = function() {
  this.rect_.setBottom(this.percentageToPixelVertical(
      this.rect_.getCanvas().getZoneBottom()));
};



xrx.graphic.ShapeRectBottom.prototype.modelUpdateData = function() {
  var bottom = this.rect_.getBottom().toFixed(1);
  xrx.mvc.Controller.updateNode(this.rect_, this.getResult().getNode(0), bottom.toString());
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectCreate = function(element) {

  this.shape_;

  this.rectX_;

  this.rectY_;

  this.rectWidth_;

  this.rectHeight_;

  this.rectLeft_;

  this.rectTop_;

  this.rectRight_;

  this.rectBottom_;

  goog.base(this, element);
};
goog.inherits(xrx.graphic.ShapeRectCreate, xrx.graphic.ShapeRect);
xrx.mvc.registerComponent('xrx-shape-rect-create', xrx.graphic.ShapeRectCreate);



xrx.graphic.ShapeRectCreate.prototype.mvcRefresh = function() {};



xrx.graphic.ShapeRectCreate.prototype.createDom = function() {
  var self = this;
  this.shape_ = new xrx.shape.RectCreatable(this.getDrawing());
  // handle value changed
  this.shape_.handleValueChanged = function() {
    self.mvcModelUpdateData();
  }
  this.initCoordComponents();
};



/**
 * @constructor
 */
xrx.graphic.ShapeRectInsert = function(element) {

  this.shape_;

  goog.base(this, element);
};
goog.inherits(xrx.graphic.ShapeRectInsert, xrx.mvc.ComponentView);
xrx.mvc.registerComponent('xrx-shape-rect-insert', xrx.graphic.ShapeRectInsert);



xrx.graphic.ShapeRectInsert.prototype.getNode = function() {};



xrx.graphic.ShapeRectInsert.prototype.mvcRefresh = function() {};



xrx.graphic.ShapeRectInsert.prototype.getShapeComponent = function() {
  var groupDiv = goog.dom.getParentElement(this.element_);
  var shapeDiv = goog.dom.getChildren(goog.dom.getChildren(groupDiv)[0])[0];
  return xrx.mvc.getViewComponent(shapeDiv.id);
};



xrx.graphic.ShapeRectInsert.prototype.execute = function() {
  var origin = this.getNodeBind(0, 'xrxOrigin');
  var target = this.getNodeBind(0, 'xrxTarget');
  xrx.mvc.Controller.insertNode(this.getShapeComponent(), target, origin);
};



xrx.graphic.ShapeRectInsert.prototype.createDom = function() {};
