(function() {

  // create and initialize a drawing canvas
  var element = document.getElementById('drawing');
  element.style['height'] = '500px';
  element.style['width'] = '50%';
  window.drawing = new xrx.drawing.Drawing(element);

  // create and initialize a reusable style object
  // this is the style a shape will have after it is
  // finally created
  var style = new xrx.shape.Style();
  style.setStrokeColor('#0000BB');
  style.setStrokeWidth(3);

  // create and initialize a second style for shape creation
  // this is the style a shape has during creation
  var styleCreatable = new xrx.shape.Style();
  styleCreatable.setFillColor('#3B3BFF');
  styleCreatable.setFillOpacity(.3);
  styleCreatable.setStrokeWidth(3);
  styleCreatable.setStrokeColor('#3B3BFF');

  // create and initialize shapes that shall be created
  window.circle = new xrx.shape.Circle(window.drawing);
  window.circle.setStyle(style);
  window.circle.getCreatable().setStyle(styleCreatable);
  window.ellipse = new xrx.shape.Ellipse(window.drawing);
  window.ellipse.setStyle(style);
  window.ellipse.getCreatable().setStyle(styleCreatable);
  window.line = new xrx.shape.Line(window.drawing);
  window.line.setStyle(style);
  window.line.getCreatable().setStyle(styleCreatable);
  window.polygon = new xrx.shape.Polygon(window.drawing);
  window.polygon.setStyle(style);
  window.polygon.getCreatable().setStyle(styleCreatable);
  window.polyline = new xrx.shape.Polyline(window.drawing);
  window.polyline.setStyle(style);
  window.polyline.getCreatable().setStyle(styleCreatable);
  window.rect = new xrx.shape.Rect(window.drawing);
  window.rect.setStyle(style);
  window.rect.getCreatable().setStyle(styleCreatable);

  // switch the drawing canvas into create mode for circle shapes
  window.drawing.setModeCreate(window.circle.getCreatable());

  return [window.drawing, window.circle, window.ellipse, window.line,
      window.polygon, window.polyline, window.rect]
})();