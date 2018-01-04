/**
 * @fileoverview 
 */

goog.provide('xrx.graphic.ShapePolygon');
goog.provide('xrx.graphic.ShapePolygonCoords');
goog.provide('xrx.graphic.ShapePolygonCreate');
goog.provide('xrx.graphic.ShapePolygonInsert');



goog.require('goog.dom.dataset');
goog.require('xrx.mvc');
goog.require('xrx.mvc.ChildComponent');
goog.require('xrx.mvc.ComponentView');
goog.require('xrx.mvc.Controller');
goog.require('xrx.shape.Polygon');
goog.require('xrx.shape.PolygonCreatable');
goog.require('xrx.graphic.Shape');



/**
 * @constructor
 */
xrx.graphic.ShapePolygon = function(element) {

  this.shapePolygonCoords_;

  goog.base(this, element);
};
goog.inherits(xrx.graphic.ShapePolygon, xrx.graphic.Shape);
xrx.mvc.registerComponent('xrx-shape-polygon', xrx.graphic.ShapePolygon);



xrx.graphic.ShapePolygon.prototype.mvcRefresh = function() {
  if (!this.getResult().getNode(0)) return;
  if (!this.getDrawing().getEngine().isAvailable()) return;
  this.shapePolygonCoords_.refresh();
  this.getDrawing().draw();
};



xrx.graphic.ShapePolygon.prototype.mvcRemove = function() {
  if (!this.getDrawing().getEngine().isAvailable()) return;
  this.getDrawing().getLayerShape().removeShape(this.shape_);
  this.getDrawing().draw();
};



xrx.graphic.ShapePolygon.prototype.mvcModelUpdateData = function() {
  this.shapePolygonCoords_.modelUpdateData();
};



xrx.graphic.ShapePolygon.prototype.mvcModelDeleteData = function() {
  xrx.mvc.Controller.removeNode(this, this.getResult().getNode(0));
};



xrx.graphic.ShapePolygon.prototype.createDom = function() {
  var self = this;
  var drawing = this.getDrawing();
  if (!drawing.getEngine().isAvailable()) return;
  this.shape_ = xrx.shape.Polygon.create(drawing);
  drawing.getLayerShape().addShapes(this.shape_);
  this.shapePolygonCoords_ = new xrx.graphic.ShapePolygonCoords(this);
  // handle value changes
  this.shape_.handleValueChanged = function() {
    self.mvcModelUpdateData();
  };
  // handle delete component
  this.shape_.handleDeleted = function() {
    self.mvcModelDeleteData();
  };
  this.mvcRefresh();
};



/**
 * @constructor
 */
xrx.graphic.ShapePolygonCoords = function(polygon) {

  this.polygon_ = polygon;

  goog.base(this, polygon);
};
goog.inherits(xrx.graphic.ShapePolygonCoords, xrx.mvc.ChildComponent);



/**
 * @override
 */
xrx.graphic.ShapePolygonCoords.prototype.getBindId = function() {
  return this.getDataset('xrxBindCoords');
};



/**
 * @override
 */
xrx.graphic.ShapePolygonCoords.prototype.getRefExpression = function() {
  return this.getDataset('xrxRefCoords');
};



xrx.graphic.ShapePolygonCoords.prototype.refresh = function() {
  var str = this.getResult().getNode(0).getStringValue();
  var coords = this.polygon_.parseCoords(str);
  this.polygon_.getShape().setCoords(coords);
};



xrx.graphic.ShapePolygonCoords.prototype.modelUpdateData = function(coords) {
  xrx.mvc.Controller.updateNode(this.polygon_, this.getResult().getNode(0),
      this.polygon_.serializeCoords(this.polygon_.getShape().getCoords()));
};



/**
 * @constructor
 */
xrx.graphic.ShapePolygonCreate = function(element) {

  this.shapePolygonCoords_;

  goog.base(this, element);
};
goog.inherits(xrx.graphic.ShapePolygonCreate, xrx.graphic.Shape);
xrx.mvc.registerComponent('xrx-shape-polygon-create', xrx.graphic.ShapePolygonCreate);



xrx.graphic.ShapePolygonCreate.prototype.mvcRefresh = function() {};



xrx.graphic.ShapePolygonCreate.prototype.mvcModelUpdateData = function() {
  this.shapePolygonCoords_.modelUpdateData();
};



xrx.graphic.ShapePolygonCreate.prototype.createDom = function() {
  var self = this;
  this.shape_ = new xrx.shape.PolygonCreatable(this.getDrawing());
  this.shapePolygonCoords_ = new xrx.graphic.ShapePolygonCoords(this);
  // handle value changes
  this.shape_.handleValueChanged = function() {
    self.mvcModelUpdateData();
  };
};



/**
 * @constructor
 */
xrx.graphic.ShapePolygonInsert = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.graphic.ShapePolygonInsert, xrx.mvc.ComponentView);
xrx.mvc.registerComponent('xrx-shape-polygon-insert', xrx.graphic.ShapePolygonInsert);



xrx.graphic.ShapePolygonInsert.prototype.getNode = function() {};



xrx.graphic.ShapePolygonInsert.prototype.mvcRefresh = function() {};



xrx.graphic.ShapePolygonInsert.prototype.getShapeComponent = function() {
  var groupDiv = goog.dom.getParentElement(this.element_);
  var shapeDiv = goog.dom.getChildren(goog.dom.getChildren(groupDiv)[0])[0];
  return xrx.mvc.getViewComponent(shapeDiv.id);
};



xrx.graphic.ShapePolygonInsert.prototype.execute = function() {
  var origin = this.getNodeBind(0, 'xrxOrigin');
  var target = this.getNodeBind(0, 'xrxTarget');
  xrx.mvc.Controller.insertNode(this.getShapeComponent(), target, origin);
};



xrx.graphic.ShapePolygonInsert.prototype.createDom = function() {};
