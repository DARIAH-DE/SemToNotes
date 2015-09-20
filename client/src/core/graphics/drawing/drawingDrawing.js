/**
 * @fileoverview A class representing a drawing canvas.
 */

goog.provide('xrx.drawing.Drawing');



goog.require('goog.dom.DomHelper');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.net.ImageLoader');
goog.require('goog.style');
goog.require('goog.userAgent');
goog.require('xrx.drawing');
goog.require('xrx.drawing.EventHandler');
goog.require('xrx.drawing.Hoverable');
goog.require('xrx.drawing.LayerBackground');
goog.require('xrx.drawing.LayerShape');
goog.require('xrx.drawing.LayerShapeCreate');
goog.require('xrx.drawing.LayerShapeModify');
goog.require('xrx.drawing.LayerTool');
goog.require('xrx.drawing.Mode');
goog.require('xrx.drawing.Modifiable');
goog.require('xrx.drawing.Selectable');
goog.require('xrx.drawing.ShapeIterator');
goog.require('xrx.drawing.State');
goog.require('xrx.engine.Engine');
goog.require('xrx.viewbox.Viewbox');
goog.require('xrx.shape');
goog.require('xrx.shape.Shapes');



/**
 * A class representing a drawing canvas. The drawing canvas can have a background
 * image and thereby can serve as an image annotation tool.
 *
 * @param {DOMElement} element The HTML element used to install the canvas.
 * @param {string} opt_engine The name of the rendering engine.
 * @param {boolean} opt_force Whether to force Raphael rendering. For debugging
 *   only.
 * @see xrx.engine
 * @constructor
 */
xrx.drawing.Drawing = function(element, opt_engine, opt_force) {

  goog.base(this);

  /**
   * The DOM element used to install the drawing canvas.
   * @type {DOMElement}
   * @private
   */
  this.element_ = element;

  /**
   * The graphics rendering engine.
   * @type {xrx.engine.Engine}
   * @private
   */
  this.engine_;

  /**
   * The graphics canvas.
   * @type {xrx.shape.Canvas}
   * @private
   */
  this.canvas_;

  /**
   * The layers of the drawing canvas.
   * @type {Array}
   * @private
   */
  this.layer_ = [];

  /**
   * A shield in front of the canvas needed by the SVG and the
   * VML rendering engine for smooth dragging of elements.
   * @type {xrx.shape.Rect}
   */
  this.shield_;

  /**
   * @type {number}
   * @private
   */
  this.mode_ = xrx.drawing.Mode.NONE;

  /**
   * The shape currently modified by the user.
   * @type {xrx.drawing.Modifiable}
   * @private
   */
  this.modifiable_ = new xrx.drawing.Modifiable(this);

  /**
   * The shape currently selected by the user.
   * @type {xrx.drawing.Selectable}
   * @private
   */
  this.selectable_ = new xrx.drawing.Selectable(this);

  /**
   * The shape currently hovered by the user.
   * @type {xrx.drawing.Hoverable}
   * @private
   */
  this.hoverable_ = new xrx.drawing.Hoverable(this);

  /**
   * The shape currently created by the user.
   * @type {Object}
   * @private
   */
  this.create_;

  /**
   * The view-box of the drawing canvas.
   * @type {Object}
   * @private
   */
  this.viewbox_;

  /**
   * A helper class to iterate over all shapes contained in this
   * drawing canvas.
   * @type {xrx.drawing.ShapeIterator}
   */
  this.shapeIterator_ = new xrx.drawing.ShapeIterator(this);

  // install the canvas
  this.install_(opt_engine, opt_force);
};
goog.inherits(xrx.drawing.Drawing, xrx.drawing.EventHandler);



/**
 * Returns the wrapper element of this drawing canvas.
 * @return {DOMElement} The wrapper.
 */
xrx.drawing.Drawing.prototype.getElement = function() {
  return this.element_;
};



/**
 * Returns the engine used for rendering.
 * @return {xrx.engine.Engine} The engine.
 */
xrx.drawing.Drawing.prototype.getEngine = function() {
  return this.engine_;
};



/**
 * Returns the canvas object of this drawing canvas.
 * @return {xrx.shape.Canvas} The canvas object.
 */
xrx.drawing.Drawing.prototype.getCanvas = function() {
  return this.canvas_;
};



/**
 * Returns the background layer of this drawing canvas.
 * @return {xrx.drawing.LayerBackground} The background layer object.
 */
xrx.drawing.Drawing.prototype.getLayerBackground = function() {
  return this.layer_[0];
};



/**
 * Returns the shape layer of this drawing canvas.
 * @return {xrx.drawing.LayerShape} The shape layer object.
 */
xrx.drawing.Drawing.prototype.getLayerShape = function() {
  return this.layer_[1];
};



/**
 * Returns the layer where shapes can be modified. 
 * @return {xrx.drawing.LayerShapeModify} The shape modify layer object.
 */
xrx.drawing.Drawing.prototype.getLayerShapeModify = function() {
  return this.layer_[2];
};



/**
 * Returns the layer where new shapes can be drawn.
 * @return {xrx.drawing.LayerShapeCreate} The create layer object.
 */
xrx.drawing.Drawing.prototype.getLayerShapeCreate = function() {
  return this.layer_[3];
};



/**
 * Returns the layer of this drawing canvas where tools can be plugged in.
 * @return {xrx.drawing.LayerTool} The tool layer object.
 */
xrx.drawing.Drawing.prototype.getLayerTool = function() {
  return this.layer_[4];
};



/**
 * Returns the view-box of the drawing canvas.
 * @return {Object} The view-box.
 */
xrx.drawing.Drawing.prototype.getViewbox = function() {
  return this.viewbox_;
};



/**
 * Returns the shape currently created by the user.
 * @return {xrx.shape.Shape} The shape.
 */
xrx.drawing.Drawing.prototype.getCreate = function() {
  return this.create_;
};



/**
 * Sets a background image to this drawing canvas.
 * @param {string} url The URL of the image.
 * @param {function} callback A callback function that is evaluated after
 *   the image is loaded.
 */
xrx.drawing.Drawing.prototype.setBackgroundImage = function(url, callback) {
  var img = this.layer_[0].getImage();
  if (img && img.src === url) return;
  var self = this;
  var imageLoader = new goog.net.ImageLoader();
  var tmpImage = goog.dom.createElement('img');
  tmpImage.id = '_tmp';
  tmpImage.src = url;
  goog.events.listen(imageLoader, goog.events.EventType.LOAD, function(e) {
    self.layer_[0].setImage(e.target);
    if (callback) callback();
    self.draw();
  });
  imageLoader.addImage('_tmp', tmpImage);
  imageLoader.start();
};



/**
 * Draws this canvas and all its layers, tools and shapes contained.
 */
xrx.drawing.Drawing.prototype.draw = function() {
  var self = this;
  var viewbox = this.getViewbox();
  this[xrx.shape.EventType.SHAPE_BEFORE_DRAW] = function(element) {
    // apply the current view-box matrix to the view-box group
    if (element === viewbox.getGroup()) {
      element.setCTM(viewbox.getCTM());
    }
    // change zoom factor of each stylable shape
    else if (element instanceof xrx.shape.Stylable) {
      element.setZoomFactor(viewbox.getZoomValue());
    }
    else {};
  };
  this.canvas_.draw();
};



/**
 * Returns the current mode of this drawing canvas.
 * @return {number} The mode.
 */
xrx.drawing.Drawing.prototype.getMode = function() {
  return this.mode_;
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.setMode_ = function(mode) {
  if (mode !== this.mode_) {
    this.mode_ = mode;
    this.registerEvents(mode);
  }
};



/**
 * Switch the drawing canvas over into mode <i>disabled</i>.
 */
xrx.drawing.Drawing.prototype.setModeDisabled = function() {
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(true);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.DISABLED);
};



/**
 * Switch the drawing canvas over into mode <i>view</i> to allow view-box panning
 * zooming and rotating.
 */
xrx.drawing.Drawing.prototype.setModeView = function() {
  this.getLayerBackground().setLocked(false);
  this.getLayerShape().setLocked(true);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.VIEW);
};



/**
 * Switch the drawing canvas over into mode <i>hover</i> to allow hovering
 * shapes.
 */
xrx.drawing.Drawing.prototype.setModeHover = function() {
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(false);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.HOVER);
};



/**
 * Switch the drawing canvas over into mode <i>select</i> to allow selecting
 * shapes.
 */
xrx.drawing.Drawing.prototype.setModeSelect = function() {
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(false);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.SELECT);
};



/**
 * Switch the drawing canvas over into mode <i>delete</i> to allow deletion of shapes.
 * @see xrx.drawing.Mode
 */
xrx.drawing.Drawing.prototype.setModeDelete = function() {
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(false);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.DELETE);
};



/**
 * Switch the drawing canvas over into mode <i>modify</i> to allow modification of shapes.
 * @see xrx.drawing.Mode
 */
xrx.drawing.Drawing.prototype.setModeModify = function() {
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(false);
  this.getLayerShapeModify().setLocked(false);
  this.getLayerShapeCreate().setLocked(true);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.setMode_(xrx.drawing.Mode.MODIFY);
};



/**
 * Switch the drawing canvas over into mode <i>create</i> to allow drawing of new shapes.
 * @see xrx.drawing.Mode
 * @param {string} shape The shape to create.
 */
xrx.drawing.Drawing.prototype.setModeCreate = function(shape) {
  if (!shape) return;
  var self = this;
  this.getLayerBackground().setLocked(true);
  this.getLayerShape().setLocked(true);
  this.getLayerShapeModify().setLocked(true);
  this.getLayerShapeCreate().setLocked(false);
  this.getLayerShapeModify().removeShapes();
  this.getLayerShapeCreate().removeShapes();
  this.create_ = shape instanceof String ? new xrx.shape[shape](this) : shape;
  if (this.drawEvent_) goog.events.unlistenByKey(this.drawEvent_);
  this.drawEvent_ = goog.events.listen(self.canvas_.getElement(),
      xrx.event.Type.DOWN,
      function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (self.mode_ === xrx.drawing.Mode.CREATE) self.create_.handleClick(e);
      },
      true
  );
  this.setMode_(xrx.drawing.Mode.CREATE);
};



/**
 * Handles resizing of this drawing canvas. This function is
 * automatically called whenever the size of the browser window
 * changes. It can be also called by an application that changes
 * the size of this drawing canvas during live time.
 */
xrx.drawing.Drawing.prototype.handleResize = function() {
  this.canvas_.setHeight(this.element_.clientHeight);
  this.canvas_.setWidth(this.element_.clientWidth);
  this.shield_.setHeight(this.element_.clientHeight);
  this.shield_.setWidth(this.element_.clientWidth);
  this.draw();
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.installCanvas_ = function() {
  var self = this;
  var vsm = new goog.dom.ViewportSizeMonitor();
  goog.events.listen(vsm, goog.events.EventType.RESIZE, function(e) {
    self.handleResize();
  }, false, self);
  this.canvas_ = xrx.shape.Canvas.create(self.element_, this.engine_);
  this.canvas_.setHeight(this.element_.clientHeight);
  this.canvas_.setWidth(this.element_.clientWidth);
  this.canvas_.setEventHandler(this);
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.installViewbox_ = function() {
  this.viewbox_ = new xrx.viewbox.Viewbox(this);
  this.canvas_.addChildren(this.viewbox_.getGroup());
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.installLayerBackground_ = function() {
  this.layer_[0] = new xrx.drawing.LayerBackground(this);
  this.viewbox_.getGroup().addChildren(this.layer_[0].getGroup());
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.installLayerShape_ = function() {
  this.layer_[1] = new xrx.drawing.LayerShape(this);
  this.viewbox_.getGroup().addChildren(this.layer_[1].getGroup());
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.installLayerShapeModify_ = function() {
  this.layer_[2] = new xrx.drawing.LayerShapeModify(this);
  this.viewbox_.getGroup().addChildren(this.layer_[2].getGroup());
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.installLayerShapeCreate_ = function() {
  this.layer_[3] = new xrx.drawing.LayerShapeCreate(this);
  this.viewbox_.getGroup().addChildren(this.layer_[3].getGroup());
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.installShield_ = function() {
  this.shield_ = xrx.shape.Rect.create(this.canvas_);
  this.shield_.setX(0);
  this.shield_.setY(0);
  this.shield_.setWidth(this.element_.clientWidth);
  this.shield_.setHeight(this.element_.clientHeight);
  this.shield_.setFillOpacity(0);
  this.shield_.setStrokeWidth(0);
  // hack for Raphael rendering
  if (this.shield_.getEngineElement() instanceof xrx.vml.Element) {
    this.shield_.getEngineElement().getRaphael().id = 'shield';
  }
  this.canvas_.addChildren(this.shield_);
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.installLayerTool_ = function() {
  this.layer_[4] = new xrx.drawing.LayerTool(this);
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.installFallback_ = function(opt_engine) {
  var span = goog.dom.createElement('span');
  goog.dom.setTextContent(span, 'Your browser does not support ' + opt_engine +
      ' rendering.');
  goog.dom.classes.add(span, 'xrx-canvas-error');
  goog.dom.appendChild(this.element_, span);
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.initEngine_ = function(opt_engine) {
  this.engine_ = new xrx.engine.Engine(opt_engine);
};



/**
 * @private
 */
xrx.drawing.Drawing.prototype.install_ = function(opt_engine, opt_force) {

  // initialize the rendering engine
  this.initEngine_(opt_engine);

  if (this.engine_.isAvailable() || opt_force) {
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
    /*
    if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(9)) {
      // IE 7 and IE 8 z-index fix
      var divs = goog.dom.getElementsByTagNameAndClass('div', undefined, this.element_);
      var zIndex = 1000;
      goog.array.forEach(divs, function(e, i, a) {
        goog.style.setStyle(e, 'z-index', zIndex);
        zIndex -= 10;
      })
    };
    */

  } else {
    // install an unavailable message
    this.installFallback_(opt_engine);
  }
};
