(function() {

  /**
   * Reusable function that creates some overlapping selectable shapes,
   * adds them to the drawing canvas and draws the canvas.
   * @param {xrx.drawing.Drawing} drawing The drawing canvas.
   */
  var addSelectableShapes = function(drawing) {
    // create a hoverable rectangle
    var rect = new xrx.shape.Rect(drawing);
    rect.setX(10);
    rect.setY(10);
    rect.setWidth(130);
    rect.setHeight(80);
    rect.setFillColor('grey');
    rect.setFillOpacity(.4);
    rect.getSelectable().setStrokeColor('#99CCFF'); // define the style for selected state
    rect.getSelectable().setFillColor('#99CCFF');
    rect.getSelectable().setFillOpacity(.4);

    // create a hoverable circle
    var circle = new xrx.shape.Circle(drawing);
    circle.setCenter(90, 90);
    circle.setRadius(70);
    circle.setFillColor('yellow');
    circle.setFillOpacity(.3);
    circle.getSelectable().setStrokeColor('#99CCFF'); // define the style for selected state
    circle.getSelectable().setFillColor('#99CCFF');
    circle.getSelectable().setFillOpacity(.3);

    // add the shapes to the drawing canvas
    drawing.addShapes(rect, circle);
  }

  // create and initialize a drawing canvas
  var element1 = document.getElementById('drawing1');
  element1.style['height'] = '200px';
  var drawing1 = new xrx.drawing.Drawing(element1);
  drawing1.setModeSelect(); // turn the drawing canvas into mode select
  addSelectableShapes(drawing1); // add some selectable shapes
  drawing1.setSelected(drawing1.getShapes()[0]); // turn the second shape into selected state

  // create and initialize a drawing canvas
  var element2 = document.getElementById('drawing2');
  element2.style['height'] = '200px';
  var drawing2 = new xrx.drawing.Drawing(element2);
  addSelectableShapes(drawing2); // add some selectable shapes
  drawing2.setModeSelect(); // turn the drawing canvas into mode select

  // Remember the drawing2 canvas so that we can use it from within the
  // click handler of the "Remove selected shape" button.
  // Using the window object for this is just a dirty way for what you
  // will do more elegantly with your favorite event handler library.
  window.drawing = drawing2;

  return [drawing1, drawing2];

})();