/**
 * @fileoverview 
 */

goog.provide('xrx.graphic.Canvas');
goog.provide('xrx.graphic.CanvasGroup');
goog.provide('xrx.graphic.CanvasBackgroundImage');



goog.require('goog.array');
goog.require('goog.dom.DomHelper');
goog.require('goog.dom.dataset');
goog.require('goog.object');
goog.require('xrx.drawing.Drawing');
goog.require('xrx.mvc');
goog.require('xrx.mvc.Component');
goog.require('xrx.mvc.ComponentView');
goog.require('xrx.mvc.Controller');



/**
 * @constructor
 */
xrx.graphic.Canvas = function(element) {

  this.drawing_;

  this.graphics_;

  this.origGroups_;

  this.groups_ = [];

  this.backgroundImage_;

  this.nameInsertShapeCreate_;

  goog.base(this, element);
};
goog.inherits(xrx.graphic.Canvas, xrx.mvc.Component);
xrx.mvc.registerComponent('xrx-canvas', xrx.graphic.Canvas);



xrx.graphic.Canvas.prototype.setModeView = function() {
  this.setNameShapeCreate(null);
  if (this.drawing_.getEngine().isAvailable()) this.drawing_.setModeView();
};



xrx.graphic.Canvas.prototype.setModeSelect = function() {
  this.setNameShapeCreate(null);
  if (this.drawing_.getEngine().isAvailable()) this.drawing_.setModeSelect();
};



xrx.graphic.Canvas.prototype.setModeModify = function() {
  this.setNameShapeCreate(null);
  if (this.drawing_.getEngine().isAvailable()) this.drawing_.setModeModify();
};



xrx.graphic.Canvas.prototype.setModeCreate = function(name) {
  this.setNameShapeCreate(name);
  this.getDrawing().setModeCreate(this.getActiveGroup().getShapeCreate().getShape());
};



xrx.graphic.Canvas.prototype.setModeDelete = function() {
  this.setNameShapeCreate(null);
  this.getDrawing().setModeDelete();
};



xrx.graphic.Canvas.prototype.zoomIn = function() {
  if (this.drawing_.getEngine().isAvailable()) {
    this.getDrawing().getViewbox().zoomIn();
    this.getDrawing().draw();
  }
};



xrx.graphic.Canvas.prototype.zoomOut = function() {
  if (this.drawing_.getEngine().isAvailable()) {
    this.getDrawing().getViewbox().zoomOut();
    this.getDrawing().draw();
  }
};



xrx.graphic.Canvas.prototype.rotateLeft = function() {
  if (this.drawing_.getEngine().isAvailable()) {
    this.getDrawing().getViewbox().rotateLeft();
    this.getDrawing().draw();
  }
};



xrx.graphic.Canvas.prototype.rotateRight = function() {
  if (this.drawing_.getEngine().isAvailable()) {
    this.getDrawing().getViewbox().rotateRight();
    this.getDrawing().draw();
  }
};



xrx.graphic.Canvas.prototype.getDrawing = function() {
  return this.drawing_;
};



xrx.graphic.Canvas.prototype.getBackgroundImage = function() {
  return this.backgroundImage_;
};



xrx.graphic.Canvas.prototype.getZoneLeft = function() {
  return this.backgroundImage_ ? this.backgroundImage_.getZoneLeft() : 0;
};



xrx.graphic.Canvas.prototype.getZoneTop = function() {
  return this.backgroundImage_ ? this.backgroundImage_.getZoneTop() : 0;
};



xrx.graphic.Canvas.prototype.getZoneRight = function() {
  return this.backgroundImage_ ? this.backgroundImage_.getZoneRight() : 0;
};



xrx.graphic.Canvas.prototype.getZoneBottom = function() {
  return this.backgroundImage_ ? this.backgroundImage_.getZoneBottom() : 0;
};



xrx.graphic.Canvas.prototype.setNameShapeCreate = function(name) {
  this.nameInsertShapeCreate_ = name;
};



xrx.graphic.Canvas.prototype.getGroups = function() {
  return this.groups_;
};



xrx.graphic.Canvas.prototype.resetGroups = function() {
  this.groups_ = null;
  this.groups_ = goog.array.clone(this.origGroups_);
  this.refresh();
};



xrx.graphic.Canvas.prototype.getActiveGroup = function() {
  var group;
  goog.array.forEach(this.groups_, function(e, i, a) {
    if (e.getName() === this.nameInsertShapeCreate_)
        group = e;
  }, this);
  return group;
};



xrx.graphic.Canvas.prototype.refresh = function(silent) {
  if (!this.getDrawing().getEngine().isAvailable()) return;
  var shapes;
  var repeatE;
  var repeatC;
  var self = this;
  this.drawing_.getLayerShape().removeShapes();
  goog.array.forEach(this.groups_, function(e, i, a) {
    repeatE = goog.dom.getChildren(e.getElement())[0];
    repeatC = xrx.mvc.getComponent(repeatE.id);
    if (repeatC.getResult().castAsNode().length > 0) {
      shapes = goog.dom.getElementsByClass('xrx-shape', repeatE);
      goog.array.forEach(shapes, function(s) {
        var c = xrx.mvc.getComponent(s.id);
        c.mvcRefresh();
        this.drawing_.getLayerShape().addShapes(c.getShape());
      }, this);
    }
  }, this);
  this.drawing_.draw();
};



xrx.graphic.Canvas.prototype.createDom = function() {
  var self = this;
  // initialize drawing
  var datasetEngine = this.getDataset('xrxEngine');
  this.drawing_ = new xrx.drawing.Drawing(this.element_, datasetEngine);
  if (!this.drawing_.getEngine().isAvailable()) return;
  this.drawing_.setModeView();
  // search for background image DIV
  var backgroundImage = goog.dom.getElementByClass('xrx-canvas-background-image',
      this.element_);
  if (backgroundImage) this.backgroundImage_ =
      new xrx.graphic.CanvasBackgroundImage(backgroundImage, this);
  // search for graphics DIV
  this.graphics_ = goog.dom.getElementsByClass('xrx-canvas-graphics',
      this.element_)[0];
  // initialize named graphic groups
  if (this.graphics_) {
    var groups = goog.dom.getChildren(this.graphics_);
    goog.array.forEach(groups, function(e, i, a) {
      self.groups_.push(new xrx.graphic.CanvasGroup(e, self));
    });
  }
  this.origGroups_ = goog.array.clone(this.groups_);
  // handle shape create
  this.drawing_.handleCreated = function() {
    self.getActiveGroup().dispatch('xrx-event-graphic-created');
    self.refresh();
  };
};



/**
 * @constructor
 */
xrx.graphic.CanvasGroup = function(element, canvas) {

  goog.base(this, element);

  this.canvas_ = canvas;

  this.name_ = this.getDataset('xrxName');
};
goog.inherits(xrx.graphic.CanvasGroup, xrx.mvc.Component);



xrx.graphic.CanvasGroup.prototype.createDom = function() {};



xrx.graphic.CanvasGroup.prototype.toFront = function() {
  // move canvas group to front
  var groups = this.canvas_.getGroups();
  var index = goog.array.indexOf(groups, this);
  goog.array.moveItem(groups, index, groups.length - 1);
  this.canvas_.refresh();
};



xrx.graphic.CanvasGroup.prototype.getName = function() {
  return this.name_;
};



xrx.graphic.CanvasGroup.prototype.getShapeCreate = function() {
  var div = goog.dom.getChildren(this.element_)[1];
  return xrx.mvc.getComponent(div.id);
};



xrx.graphic.CanvasGroup.prototype.getShapeInsert = function() {
  var div = goog.dom.getChildren(this.element_)[2];
  return xrx.mvc.getComponent(div.id);
};



/**
 * @constructor
 */
xrx.graphic.CanvasBackgroundImage = function(element, canvas) {

  this.canvas_ = canvas;

  this.zoneLeft_ = 0;

  this.zoneTop_ = 0;

  this.zoneRight_ = 0;

  this.zoneBottom_ = 0;

  goog.base(this, element);
};
goog.inherits(xrx.graphic.CanvasBackgroundImage, xrx.mvc.ComponentView);



xrx.graphic.CanvasBackgroundImage.prototype.getZoneLeft = function() {
  return this.zoneLeft_;
};



xrx.graphic.CanvasBackgroundImage.prototype.getZoneTop = function() {
  return this.zoneTop_;
};



xrx.graphic.CanvasBackgroundImage.prototype.getZoneRight = function() {
  return this.zoneRight_;
};



xrx.graphic.CanvasBackgroundImage.prototype.getZoneBottom = function() {
  return this.zoneBottom_;
};



xrx.graphic.CanvasBackgroundImage.prototype.createDom = function() {
  var left = this.getDataset('xrxZoneLeft');
  var top = this.getDataset('xrxZoneTop');
  var right = this.getDataset('xrxZoneRight');
  var bottom = this.getDataset('xrxZoneBottom');
  if (left) this.zoneLeft_ = parseFloat(left);
  if (top) this.zoneTop_ = parseFloat(top);
  if (right) this.zoneRight_ = parseFloat(right);
  if (bottom) this.zoneBottom_ = parseFloat(bottom);
};



xrx.graphic.CanvasBackgroundImage.prototype.mvcRefresh = function() {
  var url = this.getResult().castAsString();
  var canvas = this.canvas_;
  var drawing = this.canvas_.getDrawing();
  if (drawing.getEngine().isAvailable()) {
    drawing.setBackgroundImage(url, function() {
      canvas.refresh();
    });
  };
};
