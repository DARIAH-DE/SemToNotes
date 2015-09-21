/**
 * @fileoverview Classes representing a modifiable and creatable
 *     engine-independent poly-line shape.
 */

goog.provide('xrx.shape.Polyline');



goog.require('xrx.geometry.Path');
goog.require('xrx.shape.Stylable');



/**
 * Classes representing an engine-independent poly-line shape.
 * @param {xrx.shape.Canvas} canvas The parent canvas object.
 * @param {xrx.engine.Element} engineElement The engine element
 *   used to render this shape.
 * @constructor
 */
xrx.shape.Polyline = function(canvas, engineElement) {

  goog.base(this, canvas, engineElement, new xrx.geometry.Path());
};
goog.inherits(xrx.shape.Polyline, xrx.shape.Stylable);



/**
 * Draws this poly-line shape.
 */
xrx.shape.Polyline.prototype.draw = function() {
  this.startDrawing_();
  this.engineElement_.draw(this.getCoords(), this.getFillColor(),
      this.getFillOpacity(), this.getStrokeColor(),
      this.getStrokeWidth());
  this.finishDrawing_();
};



/**
 * Creates a new poly-line shape.
 * @param {xrx.shape.Canvas} canvas The parent canvas object.
 */
xrx.shape.Polyline.create = function(canvas) {
  var polyline;
  var engineElement;
  var engine = canvas.getEngine();
  var canvasElement = canvas.getEngineElement();
  if (engine.typeOf(xrx.engine.CANVAS)) {
    engineElement = xrx.canvas.Polyline.create(canvasElement);
  } else if (engine.typeOf(xrx.engine.SVG)) {
    engineElement = xrx.svg.Polyline.create(canvasElement);
  } else if (engine.typeOf(xrx.engine.VML)) {
    engineElement = xrx.vml.Polyline.create(canvasElement);
  } else {
    throw Error('Unknown engine.');
  }
  polyline = new xrx.shape.Polyline(canvas, engineElement);
  polyline.setCoords([[0, 0]]);
  return polyline;
};
