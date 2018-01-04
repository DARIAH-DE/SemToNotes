(function() {

  /**
   * Reusable function that creates some overlapping hoverable shapes,
   * adds them to the drawing canvas and draws the canvas.
   * @param {xrx.drawing.Drawing} drawing The drawing canvas.
   */
  var addHoverableShapes = function(drawing) {

    // create a hoverable rectangle
    var rect = new xrx.shape.Rect(drawing);
    rect.setX(10);
    rect.setY(10);
    rect.setWidth(130);
    rect.setHeight(80);
    rect.setFillColor('grey');
    rect.setFillOpacity(.4);
    rect.getHoverable().setFillColor('#99CCFF'); // define the shape style when hovered
    rect.getHoverable().setFillOpacity(.4);

    // create a hoverable circle
    var circle = new xrx.shape.Circle(drawing);
    circle.setCenter(90, 90);
    circle.setRadius(70);
    circle.setFillColor('yellow');
    circle.setFillOpacity(.3);
    circle.getHoverable().setFillColor('#99CCFF'); // define the shape style when hovered
    circle.getHoverable().setFillOpacity(.3);

    // add the shapes to the drawing canvas
    drawing.addShapes(rect, circle);
  }

  // create and initialize a drawing canvas for hovering the foremost shape
  var element1 = document.getElementById('drawing1');
  element1.style['height'] = '200px';
  var drawing1 = new xrx.drawing.Drawing(element1);
  drawing1.setModeHover();
  addHoverableShapes(drawing1);

  // create and initialize a drawing canvas for hovering overlapping shapes
  var element2 = document.getElementById('drawing2');
  element2.style['height'] = '200px';
  var drawing2 = new xrx.drawing.Drawing(element2);
  drawing2.setModeHover(true);
  addHoverableShapes(drawing2);

  return [drawing1, drawing2];

})();