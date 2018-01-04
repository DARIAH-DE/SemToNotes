/**
 * @fileoverview A class offering tool-bar items for a drawing canvas.
 */

goog.provide('xrx.graphic.CanvasToolbarItem');
goog.provide('xrx.graphic.CanvasToolbarItemView');
goog.provide('xrx.graphic.CanvasToolbarItemZoomIn');
goog.provide('xrx.graphic.CanvasToolbarItemZoomOut');
goog.provide('xrx.graphic.CanvasToolbarItemRotateLeft');
goog.provide('xrx.graphic.CanvasToolbarItemRotateRight');
goog.provide('xrx.graphic.CanvasToolbarItemCreate');
goog.provide('xrx.graphic.CanvasToolbarItemModify');
goog.provide('xrx.graphic.CanvasToolbarItemDelete');



goog.require('goog.dom.DomHelper');
goog.require('goog.dom.classes');
goog.require('goog.dom.dataset');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('xrx.mvc');
goog.require('xrx.mvc.Component');
goog.require('xrx.graphic.CanvasToolbar');



xrx.graphic.CanvasToolbarItem = function(element) {

  goog.base(this, element);

  this.registerEvents_();
};
goog.inherits(xrx.graphic.CanvasToolbarItem, xrx.mvc.Component);



xrx.graphic.CanvasToolbarItem.prototype.getToolbar = function() {
  var toolbarDiv = goog.dom.getAncestorByClass(this.element_, 'xrx-canvas-toolbar');
  var toolbarComponent = xrx.mvc.getComponent(toolbarDiv.id);
  return toolbarComponent ? toolbarComponent : new xrx.graphic.CanvasToolbar(toolbarDiv);
};



xrx.graphic.CanvasToolbarItem.prototype.handleMouseOver = function() {
  goog.dom.classes.add(this.element_, 'xrx-ui-state-mouseover');
};



xrx.graphic.CanvasToolbarItem.prototype.handleMouseOut = function() {
  goog.dom.classes.remove(this.element_, 'xrx-ui-state-mouseover');
};



xrx.graphic.CanvasToolbarItem.prototype.registerEvents_ = function() {
  goog.events.listen(this.element_, goog.events.EventType.MOUSEOVER,
      function(e) {
        e.preventDefault();
        this.handleMouseOver(e);
  }, false, this);
  goog.events.listen(this.element_, goog.events.EventType.MOUSEOUT,
      function(e) {
        e.preventDefault();
        this.handleMouseOut(e);
  }, false, this);
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarClickItem = function(element) {

  goog.base(this, element);

  this.registerClickEvents_();
};
goog.inherits(xrx.graphic.CanvasToolbarClickItem, xrx.graphic.CanvasToolbarItem);



xrx.graphic.CanvasToolbarClickItem.prototype.registerClickEvents_ = function() {
  goog.events.listen(this.element_,
    [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], function(e) {
    e.preventDefault();
    this.handleClick();
  }, false, this);
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarToggleItem = function(element) {

  goog.base(this, element);

  this.registerToggleEvents_();
};
goog.inherits(xrx.graphic.CanvasToolbarToggleItem, xrx.graphic.CanvasToolbarItem);



xrx.graphic.CanvasToolbarToggleItem.prototype.handleToggle_ = function() {
  this.getToolbar().setSelected(this);
};



xrx.graphic.CanvasToolbarToggleItem.prototype.registerToggleEvents_ = function() {
  goog.events.listen(this.element_,
    [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN], function(e) {
    e.preventDefault();
    this.handleToggle_();
    this.handleToggle();
  }, false, this);
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarItemView = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.graphic.CanvasToolbarItemView, xrx.graphic.CanvasToolbarToggleItem);
xrx.mvc.registerComponent('xrx-canvas-toolbar-item-view', xrx.graphic.CanvasToolbarItemView);



xrx.graphic.CanvasToolbarItem.prototype.handleToggle = function() {
  var drawing = this.getToolbar().getCanvas().getDrawing();
  if (drawing.getEngine().isAvailable()) drawing.setModeView();  
};



xrx.graphic.CanvasToolbarItem.prototype.createDom = function() {
  if (!this.element_.getAttribute('title'))
      this.element_.setAttribute('title', 'Zoom, Pan or Rotate the Canvas.');
  this.handleToggle_();
  this.handleToggle();
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarItemZoomIn = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.graphic.CanvasToolbarItemZoomIn, xrx.graphic.CanvasToolbarClickItem);
xrx.mvc.registerComponent('xrx-canvas-toolbar-item-zoom-in', xrx.graphic.CanvasToolbarItemZoomIn);



xrx.graphic.CanvasToolbarItemZoomIn.prototype.handleClick = function() {
  var drawing = this.getToolbar().getCanvas().getDrawing();
  drawing.getViewbox().zoomIn();
  drawing.draw();
};



xrx.graphic.CanvasToolbarItemZoomIn.prototype.createDom = function() {
  if (!this.element_.getAttribute('title'))
      this.element_.setAttribute('title', 'Zoom In.'); 
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarItemZoomOut = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.graphic.CanvasToolbarItemZoomOut, xrx.graphic.CanvasToolbarClickItem);
xrx.mvc.registerComponent('xrx-canvas-toolbar-item-zoom-out', xrx.graphic.CanvasToolbarItemZoomOut);



xrx.graphic.CanvasToolbarItemZoomOut.prototype.handleClick = function() {
  var drawing = this.getToolbar().getCanvas().getDrawing();
  drawing.getViewbox().zoomOut();
  drawing.draw();
};



xrx.graphic.CanvasToolbarItemZoomOut.prototype.createDom = function() {
  if (!this.element_.getAttribute('title'))
      this.element_.setAttribute('title', 'Zoom Out.');
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarItemRotateLeft = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.graphic.CanvasToolbarItemRotateLeft, xrx.graphic.CanvasToolbarClickItem);
xrx.mvc.registerComponent('xrx-canvas-toolbar-item-rotate-left', xrx.graphic.CanvasToolbarItemRotateLeft);



xrx.graphic.CanvasToolbarItemRotateLeft.prototype.handleClick = function() {
  var drawing = this.getToolbar().getCanvas().getDrawing();
  drawing.getViewbox().rotateLeft();
  drawing.draw();
};



xrx.graphic.CanvasToolbarItemRotateLeft.prototype.createDom = function() {
  if (!this.element_.getAttribute('title'))
      this.element_.setAttribute('title', 'Rotate left.');
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarItemRotateRight = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.graphic.CanvasToolbarItemRotateRight, xrx.graphic.CanvasToolbarClickItem);
xrx.mvc.registerComponent('xrx-canvas-toolbar-item-rotate-right', xrx.graphic.CanvasToolbarItemRotateRight);



xrx.graphic.CanvasToolbarItemRotateRight.prototype.handleClick = function() {
  var drawing = this.getToolbar().getCanvas().getDrawing();
  drawing.getViewbox().rotateRight();
  drawing.draw();
};



xrx.graphic.CanvasToolbarItemRotateRight.prototype.createDom = function() {
  if (!this.element_.getAttribute('title'))
      this.element_.setAttribute('title', 'Rotate right.');
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarItemCreate = function(element) {

  goog.base(this, element);

  this.graphicsName_;
};
goog.inherits(xrx.graphic.CanvasToolbarItemCreate, xrx.graphic.CanvasToolbarToggleItem);
xrx.mvc.registerComponent('xrx-canvas-toolbar-item-create', xrx.graphic.CanvasToolbarItemCreate);



xrx.graphic.CanvasToolbarItemCreate.prototype.handleToggle = function() {
  var canvas = this.getToolbar().getCanvas();
  if (!canvas.getDrawing().getEngine().isAvailable()) return;
  canvas.setNameShapeCreate(this.graphicsName_);
  canvas.getDrawing().setModeCreate(canvas.getActiveGroup().getShapeCreate().getShape());
};



xrx.graphic.CanvasToolbarItemCreate.prototype.createDom = function() {
  if (!this.element_.getAttribute('title'))
      this.element_.setAttribute('title', 'Draw.');
  this.graphicsName_ = this.getDataset('xrxName');
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarItemModify = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.graphic.CanvasToolbarItemModify, xrx.graphic.CanvasToolbarToggleItem);
xrx.mvc.registerComponent('xrx-canvas-toolbar-item-modify', xrx.graphic.CanvasToolbarItemModify);



xrx.graphic.CanvasToolbarItemModify.prototype.handleToggle = function() {
  var drawing = this.getToolbar().getCanvas().getDrawing();
  if (drawing.getEngine().isAvailable()) drawing.setModeModify();
};



xrx.graphic.CanvasToolbarItemModify.prototype.createDom = function() {
  if (!this.element_.getAttribute('title'))
      this.element_.setAttribute('title', 'Move or Modify a Shape.');
};



/**
 * @constructor
 */
xrx.graphic.CanvasToolbarItemDelete = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.graphic.CanvasToolbarItemDelete, xrx.graphic.CanvasToolbarToggleItem);
xrx.mvc.registerComponent('xrx-canvas-toolbar-item-delete', xrx.graphic.CanvasToolbarItemDelete);



xrx.graphic.CanvasToolbarItemDelete.prototype.handleToggle = function() {
  var drawing = this.getToolbar().getCanvas().getDrawing();
  if (drawing.getEngine().isAvailable()) drawing.setModeDelete();
};



xrx.graphic.CanvasToolbarItemDelete.prototype.createDom = function() {
  if (!this.element_.getAttribute('title'))
      this.element_.setAttribute('title', 'Delete a Shape.');
};
