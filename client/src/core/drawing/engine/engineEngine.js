/**
 * @fileoverview A class representing a graphics rendering engine.
 */

goog.provide('xrx.engine.Engine');



goog.require('goog.Disposable');
goog.require('xrx.engine');
goog.require('xrx.engine.Engines');



/**
 * A class representing a graphics rendering engine.
 * @param {string} opt_engine The rendering engine to be used. If no
 *   parameter is overloaded, the engine class searches for the
 *   best rendering engine available.
 * @constructor
 * @private
 */
xrx.engine.Engine = function(opt_engine, element) {

  goog.base(this);

  /**
   * Name of the rendering engine.
   * @see xrx.engine
   * @type {string}
   * @private
   */
  this.name_ = opt_engine;

  /**
   * Indicates whether a rendering engine could be initialized
   * successfully.
   * @type {boolean}
   * @private
   */
  this.available_ = false;

  this.init_();

  /**
   * The canvas rendering element of this engine.
   * @type {xrx.canvas.Canvas|xrx.svg.Canvas|xrx.vml.Canvas}
   */
  this.canvas_ = this.createCanvas_(element);
};
goog.inherits(xrx.engine.Engine, goog.Disposable);



/**
 * Returns the canvas rendering element of this engine.
 * @return {xrx.canvas.Canvas|xrx.svg.Canvas|xrx.vml.Canvas}
 *     The canvas rendering element.
 */
xrx.engine.Engine.prototype.getCanvas = function() {
  return this.canvas_;
};



/**
 * Creates a new canvas element.
 * @param {HTMLElement} The HTML element to append the new canvas.
 * @return {(xrx.canvas.Canvas|xrx.svg.Canvas|xrx.vml.Canvas)} The canvas element.
 */
xrx.engine.Engine.prototype.createCanvas_ = function(element) {
  if (this.typeOf(xrx.engine.CANVAS)) {
    return xrx.canvas.Canvas.create(element);
  } else if (this.typeOf(xrx.engine.SVG)) {
    return xrx.svg.Canvas.create(element);
  } else if (this.typeOf(xrx.engine.VML)) {
    return xrx.vml.Canvas.create(element);
  } else {
    throw Error('Unknown engine.');
  }
};



/**
 * Creates a new circle element.
 * @return {(xrx.canvas.Circle|xrx.svg.Circle|xrx.vml.Circle)} The circle element.
 */
xrx.engine.Engine.prototype.createCircle = function() {
  if (this.typeOf(xrx.engine.CANVAS)) {
    return xrx.canvas.Circle.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.SVG)) {
    return xrx.svg.Circle.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.VML)) {
    return xrx.vml.Circle.create(this.canvas_);
  } else {
    throw Error('Unknown engine.');
  }
};



/**
 * Creates a new ellipse element.
 * @return {(xrx.canvas.Ellipse|xrx.svg.Ellipse|xrx.vml.Ellipse)} The ellipse element.
 */
xrx.engine.Engine.prototype.createEllipse = function() {
  if (this.typeOf(xrx.engine.CANVAS)) {
    return xrx.canvas.Ellipse.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.SVG)) {
    return xrx.svg.Ellipse.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.VML)) {
    return xrx.vml.Ellipse.create(this.canvas_);
  } else {
    throw Error('Unknown engine.');
  }
};


/**
 * Creates a new group element.
 * @return {(xrx.canvas.Group|xrx.svg.Group|xrx.vml.Group)} The group element.
 */
xrx.engine.Engine.prototype.createGroup = function() {
  if (this.typeOf(xrx.engine.CANVAS)) {
    return xrx.canvas.Group.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.SVG)) {
    return xrx.svg.Group.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.VML)) {
    return xrx.vml.Group.create(this.canvas_);
  } else {
    throw Error('Unknown engine.');
  }
};


/**
 * Creates a new image element.
 * @return {(xrx.canvas.Image|xrx.svg.Image|xrx.vml.Image)} The image element.
 */
xrx.engine.Engine.prototype.createImage = function() {
  if (this.typeOf(xrx.engine.CANVAS)) {
    return xrx.canvas.Image.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.SVG)) {
    return xrx.svg.Image.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.VML)) {
    return xrx.vml.Image.create(this.canvas_);
  } else {
    throw Error('Unknown engine.');
  }
};


/**
 * Creates a new line element.
 * @return {(xrx.canvas.Line|xrx.svg.Line|xrx.vml.Line)} The line element.
 */
xrx.engine.Engine.prototype.createLine = function() {
  if (this.typeOf(xrx.engine.CANVAS)) {
    return xrx.canvas.Line.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.SVG)) {
    return xrx.svg.Line.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.VML)) {
    return xrx.vml.Line.create(this.canvas_);
  } else {
    throw Error('Unknown engine.');
  }
};


/**
 * Creates a new polygon element.
 * @return {(xrx.canvas.Polygon|xrx.svg.Polygon|xrx.vml.Polygon)} The polygon element.
 */
xrx.engine.Engine.prototype.createPolygon = function() {
  if (this.typeOf(xrx.engine.CANVAS)) {
    return xrx.canvas.Polygon.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.SVG)) {
    return xrx.svg.Polygon.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.VML)) {
    return xrx.vml.Polygon.create(this.canvas_);
  } else {
    throw Error('Unknown engine.');
  }
};


/**
 * Creates a new polyline element.
 * @return {(xrx.canvas.Polyline|xrx.svg.Polyline|xrx.vml.Polyline)} The polyline element.
 */
xrx.engine.Engine.prototype.createPolyline = function() {
  if (this.typeOf(xrx.engine.CANVAS)) {
    return xrx.canvas.Polyline.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.SVG)) {
    return xrx.svg.Polyline.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.VML)) {
    return xrx.vml.Polyline.create(this.canvas_);
  } else {
    throw Error('Unknown engine.');
  }
};


/**
 * Creates a new rect element.
 * @return {(xrx.canvas.Rect|xrx.svg.Rect|xrx.vml.Rect)} The rect element.
 */
xrx.engine.Engine.prototype.createRect = function() {
  if (this.typeOf(xrx.engine.CANVAS)) {
    return xrx.canvas.Polygon.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.SVG)) {
    return xrx.svg.Polygon.create(this.canvas_);
  } else if (this.typeOf(xrx.engine.VML)) {
    return xrx.vml.Polygon.create(this.canvas_);
  } else {
    throw Error('Unknown engine.');
  }
};



/**
 * Returns the name of this rendering engine.
 * @return {(xrx.canvas|xrx.svg|xrx.vml)} The name.
 */
xrx.engine.Engine.prototype.getName = function() {
  return this.name_;
};



/**
 * Whether the overloaded engine name is the current.
 * @param {(xrx.engine.CANVAS|xrx.engine.SVG|xrx.engine.VML)} name The
 *     engine name.
 * @return {boolean} Whether the engine matches.
 */
xrx.engine.Engine.prototype.typeOf = function(name) {
  return this.name_ === name;
}; 



/**
 * Whether this rendering engine could be initialized successfully.
 * @return {boolean} Whether the engine is available for use.
 */
xrx.engine.Engine.prototype.isAvailable = function() {
  return this.available_;
};



/**
 * @private
 */
xrx.engine.Engine.prototype.findOptimalRenderer_ = function() {
  if (xrx.engine.isSupported(xrx.engine.CANVAS)) {
    this.name_ = xrx.engine.CANVAS;
    this.available_ = true;
  } else if (xrx.engine.isSupported(xrx.engine.SVG)) {
    this.name_ = xrx.engine.SVG;
    this.available_ = true;
  } else if (xrx.engine.isSupported(xrx.engine.VML)) {
    this.name_ = xrx.engine.VML;
    this.available_ = true;
  } else {
    throw Error('There is no graphics rendering engine available.');
  }
};



/**
 * @private
 */
xrx.engine.Engine.prototype.forceRenderer_ = function() {
  if (this.name_ === xrx.engine.CANVAS) {
    this.available_ = xrx.engine.isSupported(xrx.engine.CANVAS);
  } else if (this.name_ === xrx.engine.SVG) {
    this.available_ = xrx.engine.isSupported(xrx.engine.SVG);
  } else if (this.name_ === xrx.engine.VML) {
    this.available_ = xrx.engine.isSupported(xrx.engine.VML);
  } else {
    this.available_ = false;
    throw Error('Unknown graphics rendering engine.');
  }
};



/**
 * @private
 */
xrx.engine.Engine.prototype.init_ = function() {
  if (this.name_) {
    this.forceRenderer_();
  } else {
    this.findOptimalRenderer_();
  }
};



xrx.engine.Engine.prototype.disposeInternal = function() {
  this.canvas_.dispose();
  this.canvas_ = null;
  goog.base(this, 'disposeInternal');
};
