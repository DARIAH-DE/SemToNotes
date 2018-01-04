(function() {

  // initialize the drawing canvas
  var element = document.getElementById('drawing');
  var drawing = new xrx.drawing.Drawing(element);

  // create a circle shape and style it directly
  var circle = new xrx.shape.Circle(drawing);
  circle.setCenter(100, 100);
  circle.setRadius(50);
  circle.setFillColor('rgb(153, 0, 153)');
  circle.setStrokeWidth(0);
  // create an ellipse shape and style it directly
  var ellipse = new xrx.shape.Ellipse(drawing);
  ellipse.setCenter(200, 100);
  ellipse.setRadiusX(30);
  ellipse.setRadiusY(70);
  ellipse.setFillColor('green');
  ellipse.setFillOpacity(.2);
  // create a line shape and style it directly
  var line = new xrx.shape.Line(drawing);
  line.setX1(300);
  line.setY1(40);
  line.setX2(320);
  line.setY2(140);
  line.setStrokeWidth(5);
  line.setStrokeColor('red');
  // create a poly-line shape and style it directly
  var polyline = new xrx.shape.Polyline(drawing);
  polyline.setCoords([[200, 200], [320, 210], [310, 300], [305, 280]]);
  polyline.setStrokeColor('#24246B');
  polyline.setStrokeWidth(4);
  // create a style definition object to be used by the polyline and rectangle shape
  var style = new xrx.shape.Style();
  style.setStrokeColor('#805C6E');
  style.setStrokeWidth('3');
  style.setFillColor('#805C6E');
  style.setFillOpacity(.2);
  // create a polygon shape and set the style definition from above
  var polygon = new xrx.shape.Polygon(drawing);
  polygon.setCoords([[50, 200], [170, 210], [160, 300], [155, 280]]);
  polygon.setStyle(style);
  // create a rectangle shape and set the style definition from above
  var rect = new xrx.shape.Rect(drawing);
  rect.setX(100);
  rect.setY(330);
  rect.setWidth(150);
  rect.setHeight(100);
  rect.setStyle(style);

  // add the shapes to the drawing canvas
  drawing.addShapes(circle, ellipse, line, polygon, polyline, rect);

  return drawing;

})();