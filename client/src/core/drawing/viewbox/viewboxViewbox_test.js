
var url = './viewbox_test.png';
var url2 = './viewbox_test_vertical.png';



function getDrawingSvg(id) {
  var svgDiv = goog.dom.getElement(id);
  var svgDrawing = new xrx.drawing.Drawing(svgDiv,
      xrx.engine.SVG);
  return svgDrawing;
};



function getDrawingCanvas(id, callback) {
  var canvasDiv = goog.dom.getElement(id);
  var canvasDrawing = new xrx.drawing.Drawing(canvasDiv,
    xrx.engine.CANVAS);
  return canvasDrawing;
};



function getDrawingVml(id, callback) {
  var vmlDiv = goog.dom.getElement(id);
  var vmlDrawing = new xrx.drawing.Drawing(vmlDiv,
    xrx.engine.VML, true);
  return vmlDrawing;
};
