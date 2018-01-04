(function() {

  // initialize the drawing canvas
  var element = document.getElementById('drawing');
  element.style['width'] = '50%';
  element.style['height'] = '500px';
  var drawing = new xrx.drawing.Drawing(element);

  // turn the canvas over into mode modify
  drawing.setModeModify();

  // create a styled circle shape
  var circle = new xrx.shape.Circle(drawing);
  circle.setCenter(100, 100);
  circle.setRadius(50);
  circle.setFillColor('rgb(153, 0, 153)');
  // create a styled ellipse shape
  var ellipse = new xrx.shape.Ellipse(drawing);
  ellipse.setCenter(200, 100);
  ellipse.setRadiusX(30);
  ellipse.setRadiusY(70);
  ellipse.setFillColor('green');
  ellipse.setFillOpacity(.2);
  // create a styled line shape
  var line = new xrx.shape.Line(drawing);
  line.setX1(300);
  line.setY1(40);
  line.setX2(320);
  line.setY2(140);
  line.setStrokeWidth(5);
  line.setStrokeColor('red');
  // create a styled polygon shape
  var polygon = new xrx.shape.Polygon(drawing);
  polygon.setCoords([[50, 200], [170, 210], [160, 300], [155, 280]]);
  polygon.setStrokeColor('#805C6E');
  polygon.setStrokeWidth('3');
  polygon.setFillColor('#805C6E');
  polygon.setFillOpacity(.2);
  // create a styled poly-line shape
  var polyline = new xrx.shape.Polyline(drawing);
  polyline.setCoords([[200, 200], [320, 210], [310, 300], [305, 280]]);
  polyline.setStrokeColor('#24246B');
  polyline.setStrokeWidth(4);
  // create a styled rectangle shape
  var rect = new xrx.shape.Rect(drawing);
  rect.setX(100);
  rect.setY(330);
  rect.setWidth(150);
  rect.setHeight(100);
  rect.setStrokeWidth(0); // set the stroke width to 0 to make it invisible
  rect.setFillColor('#FFA319');
  rect.setFillOpacity(1);

  // add the shapes to the drawing canvas
  drawing.addShapes(circle, ellipse, line, polygon, polyline, rect);

  // define the style for shapes during modification
  var style = new xrx.shape.Style();
  style.setStrokeColor('#cc3300');
  style.setStrokeWidth(3);
  style.setFillColor('#cc3300');
  style.setFillOpacity(.3);
  circle.getModifiable().setStyle(style);
  ellipse.getModifiable().setStyle(style);
  line.getModifiable().setStyle(style);
  polygon.getModifiable().setStyle(style);
  polyline.getModifiable().setStyle(style);
  rect.getModifiable().setStyle(style);

  // output the current coordinates of the shape whenever a shape is modified
  drawing.eventShapeModify = function(shape) {
    if (shape instanceof xrx.shape.Circle) {
      document.getElementById('consoleCircle').textContent = 'Radius: ' +
          shape.getRadius() + ', Center: ' + shape.getCenter();
    } else if (shape instanceof xrx.shape.Ellipse) {
      document.getElementById('consoleEllipse').textContent = 'Radius x: ' +
          shape.getRadiusX() + ', Radius y: ' + shape.getRadiusY() + ', Center: ' +
          shape.getCenter();
    } else if (shape instanceof xrx.shape.Line) {
      document.getElementById('consoleLine').textContent = 'x1: ' +
          shape.getX1() + ', y1: ' + shape.getY1() + ', x2: ' +
          shape.getX2() + ', y2: ' + shape.getY2();
    } else if (shape instanceof xrx.shape.Polygon) {
      document.getElementById('consolePolygon').textContent = 'Coordinates: ' +
          shape.getCoords();
    } else if (shape instanceof xrx.shape.Polyline) {
      document.getElementById('consolePolyline').textContent = 'Coordinates: ' +
          shape.getCoords();
    } else if (shape instanceof xrx.shape.Rect) {
      document.getElementById('consoleRect').textContent = 'x: ' + shape.getX() +
          ', y: ' + shape.getY() + ', width: ' + shape.getWidth() + ', height: ' +
          shape.getHeight();
    } else {}
  };
  
  // initialize the output
  drawing.eventShapeModify(circle);
  drawing.eventShapeModify(ellipse);
  drawing.eventShapeModify(line);
  drawing.eventShapeModify(polygon);
  drawing.eventShapeModify(polyline);
  drawing.eventShapeModify(rect);

  return drawing;

})();