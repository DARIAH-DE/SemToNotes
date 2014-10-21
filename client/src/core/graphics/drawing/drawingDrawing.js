***REMOVED***
***REMOVED*** @fileoverview A class representing a drawing canvas.
***REMOVED***

goog.provide('xrx.drawing.Drawing');



***REMOVED***
goog.require('goog.dom.ViewportSizeMonitor');
***REMOVED***
***REMOVED***
goog.require('goog.net.ImageLoader');
goog.require('xrx.canvas');
goog.require('xrx.drawing');
goog.require('xrx.drawing.EventHandler');
goog.require('xrx.drawing.LayerBackground');
goog.require('xrx.drawing.LayerShape');
goog.require('xrx.drawing.LayerShapeCreate');
goog.require('xrx.drawing.LayerShapeModify');
goog.require('xrx.drawing.LayerTool');
goog.require('xrx.drawing.Mode');
goog.require('xrx.drawing.Modifiable');
goog.require('xrx.drawing.State');
goog.require('xrx.drawing.Viewbox');
goog.require('xrx.engine');
goog.require('xrx.engine.Engine');
goog.require('xrx.engine.Engines');
goog.require('xrx.shape.Shape');
goog.require('xrx.shape.Shapes');
goog.require('xrx.svg');
goog.require('xrx.vml');



***REMOVED***
***REMOVED*** A class representing a drawing canvas. The drawing canvas can have a background
***REMOVED*** image and thereby can serve as an image annotation tool.
***REMOVED***
***REMOVED*** @param {DOMElement} element The HTML element used to install the canvas.
***REMOVED*** @param {string} The name of the rendering engine.
***REMOVED*** @see xrx.engine
***REMOVED***
***REMOVED***
xrx.drawing.Drawing = function(element, opt_engine) {

  goog.base(this);

 ***REMOVED*****REMOVED***
  ***REMOVED*** The DOM element used to install the drawing canvas.
  ***REMOVED*** @type {DOMElement}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.element_ = element;

 ***REMOVED*****REMOVED***
  ***REMOVED*** The graphics rendering engine.
  ***REMOVED*** @type {xrx.engine.Engine}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.engine_;

 ***REMOVED*****REMOVED***
  ***REMOVED*** The graphics canvas.
  ***REMOVED*** @type {xrx.engine.Canvas}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.canvas_;

 ***REMOVED*****REMOVED***
  ***REMOVED*** The layers of the drawing canvas.
  ***REMOVED*** @type {Array}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.layer_ = [];

 ***REMOVED*****REMOVED***
  ***REMOVED*** A shield in front of the canvas needed by the SVG and the
  ***REMOVED*** VML rendering engine for smooth dragging of elements.
  ***REMOVED*** @type {?}
 ***REMOVED*****REMOVED***
  this.shield_;

 ***REMOVED*****REMOVED***
  ***REMOVED*** @type {number}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.mode_ = xrx.drawing.Mode.NONE;

 ***REMOVED*****REMOVED***
  ***REMOVED*** The shape currently modified by the user.
  ***REMOVED*** @type {?}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.modifiable_ = new xrx.drawing.Modifiable(this);

 ***REMOVED*****REMOVED***
  ***REMOVED*** The shape currently created by the user.
  ***REMOVED*** @type {Object}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.create_;

 ***REMOVED*****REMOVED***
  ***REMOVED*** The view-box of the drawing canvas.
  ***REMOVED*** @type {Object}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.viewbox_;

  // install the canvas
  this.install_(opt_engine);
***REMOVED***
goog.inherits(xrx.drawing.Drawing, xrx.drawing.EventHandler);



xrx.drawing.Drawing.prototype.getEngine = function() {
  return this.engine_;
***REMOVED***



xrx.drawing.Drawing.prototype.getWidth = function() {
  return this.getElement().offsetWidth;
***REMOVED***



xrx.drawing.Drawing.prototype.getHeight = function() {
  return this.getElement().offsetHeight;
***REMOVED***



***REMOVED***
***REMOVED*** Returns the engine used for rendering.
***REMOVED*** @see xrx.engine
***REMOVED*** @return {Object} The rendering engine.
***REMOVED***
xrx.drawing.Drawing.prototype.getGraphics = function() {
  return this.engine_.getRenderer();
***REMOVED***



***REMOVED***
***REMOVED*** Returns the wrapper element around the canvas.
***REMOVED*** @return {DOMElement} The wrapper.
***REMOVED***
xrx.drawing.Drawing.prototype.getElement = function() {
  return this.element_;
***REMOVED***



***REMOVED***
***REMOVED*** Returns the root element of the canvas.
***REMOVED*** @return {DOMElement} The root element.
***REMOVED***
xrx.drawing.Drawing.prototype.getCanvas = function() {
  return this.canvas_;
***REMOVED***



***REMOVED***
***REMOVED*** Returns the background group of the canvas.
***REMOVED*** @return {DOMElement} The element representing the background group.
***REMOVED***
xrx.drawing.Drawing.prototype.getLayerBackground = function() {
  return this.layer_[0];
***REMOVED***



***REMOVED***
***REMOVED*** Returns the group of the canvas where shapes are rendered.
***REMOVED*** @return {DOMElement} The element representing the shape group.
***REMOVED***
xrx.drawing.Drawing.prototype.getLayerShape = function() {
  return this.layer_[1];
***REMOVED***



***REMOVED***
***REMOVED*** Returns the group of the canvas where shapes can be modified.
***REMOVED*** @return {DOMElement} The element representing the shape modify group.
***REMOVED***
xrx.drawing.Drawing.prototype.getLayerShapeModify = function() {
  return this.layer_[2];
***REMOVED***



***REMOVED***
***REMOVED*** Returns the group of the canvas where new shapes can be drawn.
***REMOVED*** @return {?} The element representing the shape create group.
***REMOVED***
xrx.drawing.Drawing.prototype.getLayerShapeCreate = function() {
  return this.layer_[3];
***REMOVED***



xrx.drawing.Drawing.prototype.getLayers = function() {
  return [this.layer_[0], this.layer_[1], this.layer_[2], this.layer_[3]];
***REMOVED***



***REMOVED***
***REMOVED*** Returns the layer of the canvas where tools can be plugged in.
***REMOVED*** @return {?} The element representing the shape create group.
***REMOVED***
xrx.drawing.Drawing.prototype.getLayerTool = function() {
  return this.layer_[4];
***REMOVED***



***REMOVED***
***REMOVED*** Returns the shape currently created by the user.
***REMOVED*** @return {xrx.shape.Shape} The shape.
***REMOVED***
xrx.drawing.Drawing.prototype.getCreate = function() {
  return this.create_;
***REMOVED***



***REMOVED***
***REMOVED*** Returns the view-box of the drawing canvas.
***REMOVED*** @return {Object} The view-box.
***REMOVED***
xrx.drawing.Drawing.prototype.getViewbox = function() {
  return this.viewbox_;
***REMOVED***



***REMOVED***
***REMOVED*** Whether a point is inside the current view-box.
***REMOVED*** @param {Array.<number>} point The point.
***REMOVED***
xrx.drawing.Drawing.prototype.isValidPoint = function(point) {
  return point[0] >= this.viewbox_.box.x && point[0] <= this.viewbox_.box.x2 &&
      point[1] >= this.viewbox_.box.y && point[1] <= this.viewbox_.box.y2;
***REMOVED***



***REMOVED***
***REMOVED*** Whether the bounding box of a shape is inside the current view-box.
***REMOVED*** @param {Object} bbox The bounding box.
***REMOVED***
xrx.drawing.Drawing.prototype.isValidBBox = function(bbox) {
  return bbox.x >= this.viewbox_.box.x && bbox.x2 <= this.viewbox_.box.x2 &&
      bbox.y >= this.viewbox_.box.y && bbox.y2 <= this.viewbox_.box.y2;
***REMOVED***



xrx.drawing.Drawing.prototype.setBackgroundImage = function(url, callback) {
***REMOVED***
  var imageLoader = new goog.net.ImageLoader();
  var tmpImage = goog.dom.createElement('img');
  tmpImage.id = '_tmp';
  tmpImage.src = url;

***REMOVED***imageLoader, goog.events.EventType.LOAD, function(e) {
    self.layer_[0].setImage(e.target);
    self.draw();
    if (callback) callback();
  });

  imageLoader.addImage('_tmp', tmpImage);
  imageLoader.start();
***REMOVED***



xrx.drawing.Drawing.prototype.draw = function() {
***REMOVED***
  if (this.engine_.hasRenderer(xrx.engine.CANVAS)) {
    xrx.canvas.render(this.canvas_.getElement(), this.viewbox_.getCTM(),
        function() {
          self.layer_[0].draw();
          self.layer_[1].draw();
          self.layer_[2].draw();
          self.layer_[3].draw();
  });
  } else if (this.engine_.hasRenderer(xrx.engine.SVG)) {
    xrx.svg.render(this.viewbox_.getGroup().getElement(),
        this.viewbox_.getCTM());
  } else if (this.engine_.hasRenderer(xrx.engine.VML)) {
    xrx.vml.render(this.viewbox_.getGroup().getRaphael(),
        this.viewbox_.getCTM());
    this.viewbox_.getGroup().draw();
  } else {
    throw Error('Unknown engine.');
  }
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.setMode_ = function(mode) {
  if (mode !== this.mode_) {
    this.mode_ = mode;
    this.registerEvents(mode);
  }
***REMOVED***



***REMOVED***
***REMOVED*** Switch the drawing canvas over into mode <i>disabled</i>.
***REMOVED***
xrx.drawing.Drawing.prototype.setModeDisabled = function() {
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(true);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.DISABLED);
***REMOVED***



***REMOVED***
***REMOVED*** Switch the drawing canvas over into mode <i>view</i> to allow view-box panning
***REMOVED*** zooming and rotating.
***REMOVED***
xrx.drawing.Drawing.prototype.setModeView = function() {
  this.getLayerBackground().setLocked(false);
  this.getLayerShape().setLocked(true);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.VIEW);
***REMOVED***



***REMOVED***
***REMOVED*** Switch the drawing canvas over into mode <i>hover</i> to allow view-box panning
***REMOVED*** zooming and rotating.
***REMOVED***
xrx.drawing.Drawing.prototype.setModeHover = function() {
  this.getLayerBackground().setLocked(false);
  this.getLayerShape().setLocked(true);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.VIEW);
***REMOVED***



***REMOVED***
***REMOVED*** Switch the drawing canvas over into mode <i>delete</i> to allow deletion of shapes.
***REMOVED*** @see xrx.drawing.Mode
***REMOVED***
xrx.drawing.Drawing.prototype.setModeDelete = function() {
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(false);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.DELETE);
***REMOVED***



***REMOVED***
***REMOVED*** Switch the drawing canvas over into mode <i>modify</i> to allow modification of shapes.
***REMOVED*** @see xrx.drawing.Mode
***REMOVED***
xrx.drawing.Drawing.prototype.setModeModify = function() {
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(false);
  this.getLayerShapeModify().setLocked(false);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.MODIFY);
***REMOVED***



***REMOVED***
***REMOVED*** Switch the drawing canvas over into mode <i>create</i> to allow drawing of new shapes.
***REMOVED*** @see xrx.drawing.Mode
***REMOVED*** @param {string} shape The shape to create.
***REMOVED***
xrx.drawing.Drawing.prototype.setModeCreate = function(shape) {
  if (!shape) return;
***REMOVED***
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(true);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(false);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();

  this.create_ = shape instanceof String ? new xrx.shape[shape](this) : shape;
  if (this.drawEvent_) goog.events.unlistenByKey(this.drawEvent_);
  this.drawEvent_ = goog.events.listen(self.canvas_.getElement(),
      goog.events.EventType.CLICK,
      function(e) { if (self.mode_ === xrx.drawing.Mode.CREATE) self.create_.handleClick(e); }
***REMOVED***
  this.setMode_(xrx.drawing.Mode.CREATE);
***REMOVED***



xrx.drawing.Drawing.prototype.handleResize = function() {
  this.canvas_.setHeight(this.element_.clientHeight);
  this.canvas_.setWidth(this.element_.clientWidth);
  this.shield_.setHeight(this.element_.clientHeight);
  this.shield_.setWidth(this.element_.clientWidth);
  this.draw();
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.installCanvas_ = function() {
***REMOVED***

  var vsm = new goog.dom.ViewportSizeMonitor();
***REMOVED***vsm, goog.events.EventType.RESIZE, function(e) {
    self.handleResize();
  }, false, self);

  this.canvas_ = this.getGraphics().Canvas.create(self.element_);
  this.canvas_.setHeight(this.element_.clientHeight);
  this.canvas_.setWidth(this.element_.clientWidth);
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.installViewbox_ = function() {
  this.viewbox_ = new xrx.drawing.Viewbox(this);
  this.canvas_.addChild(this.viewbox_.getGroup());
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.installLayerBackground_ = function() {
  this.layer_[0] = new xrx.drawing.LayerBackground(this);
  this.viewbox_.getGroup().addChildren(this.layer_[0].getGroup());
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.installLayerShape_ = function() {
  this.layer_[1] = new xrx.drawing.LayerShape(this);
  this.viewbox_.getGroup().addChildren(this.layer_[1].getGroup());
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.installLayerShapeModify_ = function() {
  this.layer_[2] = new xrx.drawing.LayerShapeModify(this);
  this.viewbox_.getGroup().addChildren(this.layer_[2].getGroup());
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.installLayerShapeCreate_ = function() {
  this.layer_[3] = new xrx.drawing.LayerShapeCreate(this);
  this.viewbox_.getGroup().addChildren(this.layer_[3].getGroup());
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.installShield_ = function() {
  this.shield_ = this.engine_.getRenderer().Rect.create(this.canvas_);
  this.shield_.setX(0);
  this.shield_.setY(0);
  this.shield_.setWidth(this.element_.clientWidth);
  this.shield_.setHeight(this.element_.clientHeight);
  this.shield_.setFillOpacity(0);
  this.shield_.setStrokeWidth(0);
  if (this.shield_.raphael_) { // hack for Raphael rendering
    this.shield_.raphael_.id = 'shield';
  }
  this.canvas_.addChild(this.shield_);
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.installLayerTool_ = function() {
  this.layer_[4] = new xrx.drawing.LayerTool(this);
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.installFallback_ = function(opt_engine) {
  var span = goog.dom.createElement('span');
  goog.dom.setTextContent(span, 'Your browser does not support ' + opt_engine +
      ' rendering.');
  goog.dom.appendChild(this.element_, span);
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.initEngine_ = function(opt_engine) {
  this.engine_ = new xrx.engine.Engine(opt_engine);
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.Drawing.prototype.install_ = function(opt_engine) {

  // initialize the graphics rendering engine
  this.initEngine_(opt_engine);

  if (this.engine_.isAvailable()) {
    // install the drawing canvas
    this.installCanvas_();

    // install the drawing view-box
    this.installViewbox_();

    // install the drawing layers
    this.installLayerBackground_();
    this.installLayerShape_();
    this.installLayerShapeModify_();
    this.installLayerShapeCreate_();

    // install a shield
    this.installShield_();

    // install the tool layer
    this.installLayerTool_();
  } else {
    // install an unavailable message
    this.installFallback_(opt_engine);
  }
***REMOVED***
