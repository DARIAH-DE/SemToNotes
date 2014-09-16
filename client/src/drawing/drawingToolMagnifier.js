***REMOVED***
***REMOVED*** @fileoverview A class implementing a magnifier tool for a drawing canvas.
***REMOVED***

goog.provide('xrx.drawing.tool.Magnifier');



***REMOVED***
***REMOVED***
***REMOVED***
goog.require('goog.fx.Dragger');
goog.require('goog.math.AffineTransform');
goog.require('goog.math.Rect');
goog.require('goog.style');
goog.require('xrx.drawing.tool.Tool');
goog.require('xrx.graphics.Engine');
goog.require('xrx.graphics.Graphics');
goog.require('xrx.svg');
goog.require('xrx.vml');



***REMOVED***
***REMOVED***
***REMOVED***
xrx.drawing.tool.Magnifier = function(drawing, element, canvas, group, image) {

  goog.base(this, drawing, element, canvas);

  this.group_ = group;

  this.image_ = image;

  this.width_ = 110;

  this.height_ = 100;

  this.ctm_ = new goog.math.AffineTransform();
***REMOVED***
goog.inherits(xrx.drawing.tool.Magnifier, xrx.drawing.tool.Tool);



xrx.drawing.tool.Magnifier.prototype.hide = function() {
  goog.style.setStyle(this.canvas_.getElement(), 'display', 'none');
  this.isActive_ = false;
***REMOVED***



xrx.drawing.tool.Magnifier.prototype.show = function() {
  goog.style.setStyle(this.canvas_.getElement(), 'display', 'block');
  this.isActive_ = true;
***REMOVED***



xrx.drawing.tool.Magnifier.prototype.reset = function() {
  var canvas = this.canvas_;
  canvas.setWidth(this.width_);
  canvas.setHeight(this.height_);
  goog.style.setStyle(this.element_, 'position', 'absolute');
  goog.style.setStyle(this.element_, 'display', 'block');
  goog.style.setStyle(this.element_, 'z-index', '999');
  goog.style.setStyle(this.element_, 'left', '50px');
  goog.style.setStyle(this.element_, 'top', '50px');
  goog.style.setStyle(this.element_, 'border', 'solid white 2px');
  this.group_.draw();
***REMOVED***



xrx.drawing.tool.Magnifier.prototype.handleDrag_ = function(e, dragger) {
  var ctm;
  var eventPoint = [dragger.deltaX + (this.width_ / 2), dragger.deltaY];
  var point = new Array(2);
  var viewboxCtm = this.drawing_.getViewbox().getCTM()
  var engine = this.drawing_.getEngine();

  viewboxCtm.createInverse().transform(eventPoint, 0, point, 0, 1);
  ctm = this.ctm_.createInverse().translate(-point[0], -point[1]);

  // TODO: same as in xrx.drawing.Drawing
  if (engine === xrx.graphics.Engine.CANVAS) {
    var c = this.canvas_.getElement();
    var ctx = c.getContext('2d');
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.beginPath();
    xrx.canvas.setTransform(ctx, ctm);
    this.group_.draw();
    ctx.closePath();
    ctx.restore();
  } else if (engine === xrx.graphics.Engine.SVG) {
    xrx.svg.setCTM(this.group_.getElement(), ctm);
  } else if (engine === xrx.graphics.Engine.VML) {
    xrx.vml.setCTM(this.group_.getRaphael(), ctm);
    this.viewbox_.getGroup().draw();
  } else {
    throw Error('Unknown engine.');
  }
***REMOVED***



xrx.drawing.tool.Magnifier.prototype.registerDrag_ = function() {
  var size = goog.style.getSize(this.drawing_.getCanvas().getElement());
  var limits = new goog.math.Rect(0, 0, size.width, size.height);
  var dragger = new goog.fx.Dragger(this.element_, this.element_); // TODO: limits (IE < 9)
***REMOVED***dragger, goog.events.EventType.DRAG, function(e) {
    this.handleDrag_(e, dragger);
  }, false, this);
***REMOVED***



xrx.drawing.tool.Magnifier.create = function(drawing) {
  var graphics = drawing.getGraphics();
  var backgroundImage = drawing.getLayerBackground().getImage();
  var div = goog.dom.createElement('div');
  var canvas = graphics.Canvas.create(drawing.getElement());
  var group = graphics.Group.create(canvas);
  var image = graphics.Image.create(backgroundImage.getImage(), canvas);
  var magnifier = new xrx.drawing.tool.Magnifier(drawing, div, canvas, group, image);

  goog.dom.appendChild(div, canvas.getElement());
  canvas.addChild(group);
  group.addChildren(image);
  goog.dom.appendChild(drawing.getElement(), div);

  magnifier.reset();
  magnifier.registerDrag_();

  return magnifier;
***REMOVED***
