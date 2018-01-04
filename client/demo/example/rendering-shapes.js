(function() {

  // initialize the drawing canvas
  var element = document.getElementById('drawing');
  var drawing = new xrx.drawing.Drawing(element);

  // create a circle shape
  var circle = new xrx.shape.Circle(drawing);
  circle.setCenter(100, 100);
  circle.setRadius(50);
  // create an ellipse shape
  var ellipse = new xrx.shape.Ellipse(drawing);
  ellipse.setCenter(200, 100);
  ellipse.setRadiusX(30);
  ellipse.setRadiusY(70);
  // create a line shape
  var line = new xrx.shape.Line(drawing);
  line.setX1(300);
  line.setY1(40);
  line.setX2(320);
  line.setY2(140);
  // create a polygon shape
  var polygon = new xrx.shape.Polygon(drawing);
  polygon.setCoords([[50, 200], [170, 210], [160, 300], [155, 280]]);
  // create a poly-line shape
  var polyline = new xrx.shape.Polyline(drawing);
  polyline.setCoords([[200, 200], [320, 210], [310, 300], [305, 280]]);
  // create a rectangle shape
  var rect = new xrx.shape.Rect(drawing);
  rect.setX(100);
  rect.setY(330);
  rect.setWidth(150);
  rect.setHeight(100);

  // add the shapes to the drawing canvas
  drawing.addShapes(circle, ellipse, line, polygon, polyline, rect);

  return drawing;

})();