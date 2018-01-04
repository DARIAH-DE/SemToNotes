(function() {

  /**
   * Reusable function that creates two groups and
   * renders them on the drawing canvas.
   */
  var createShapeGroup = function(drawing) {
    // styles for hoverable and selectable shapes,
    // used by both shape groups 
    var hoverableStyle = new xrx.shape.Style();
    hoverableStyle.setFillColor('green');
    hoverableStyle.setFillOpacity(.2);
    hoverableStyle.setStrokeColor('green');
    hoverableStyle.setStrokeWidth(2);
    var selectableStyle = new xrx.shape.Style();
    selectableStyle.setFillColor('grey');
    selectableStyle.setFillOpacity(.2);
    selectableStyle.setStrokeColor('yellow');
    selectableStyle.setStrokeWidth(2);
    var modifiableStyle = selectableStyle;

    // create and style a first shape group
    var style1 = new xrx.shape.Style();
    style1.setFillColor('purple');
    style1.setFillOpacity(.4);
    style1.setStrokeColor('purple');
    style1.setStrokeWidth(2);
    var group1 = new xrx.shape.ShapeGroup(drawing);
    group1.setStyle(style1);
    group1.getHoverable().setStyle(hoverableStyle);
    group1.getModifiable().setStyle(modifiableStyle);
    group1.getSelectable().setStyle(selectableStyle);
    var circle1 = new xrx.shape.Circle(drawing);
    circle1.setCenter(200, 210);
    circle1.setRadius(40);
    var rect1 = new xrx.shape.Rect(drawing);
    rect1.setX(120);
    rect1.setY(120);
    rect1.setWidth(100);
    rect1.setHeight(100);
    var line1 = new xrx.shape.Line(drawing);
    line1.setX1(140);
    line1.setY1(150);
    line1.setX2(250);
    line1.setY2(240);
    group1.addChildren([circle1, rect1, line1]);

    // create second shape group
    var style2 = new xrx.shape.Style();
    style2.setFillColor('brown');
    style2.setFillOpacity(.4);
    style2.setStrokeColor('brown');
    style2.setStrokeWidth(3);
    var group2 = new xrx.shape.ShapeGroup(drawing);
    group2.setStyle(style2);
    group2.getHoverable().setStyle(hoverableStyle);
    group2.getModifiable().setStyle(modifiableStyle);
    group2.getSelectable().setStyle(selectableStyle);
    var circle2 = new xrx.shape.Circle(drawing);
    circle2.setCenter(250, 260);
    circle2.setRadius(50);
    var polygon2 = new xrx.shape.Polygon(drawing);
    polygon2.setCoords([[280,290],[310,350],[200,340]]);
    var polyline2 = new xrx.shape.Polyline(drawing);
    polyline2.setCoords([[200,200],[240,240],[260,330],[340,380]]);
    group2.addChildren([circle2, polygon2, polyline2]);

    // render groups on the canvas
    drawing.addShapes(group1, group2);
  };
  
  /**
   * Reusable function that creates and initializes
   * a drawing canvas.
   */
  var createDrawingCanvas = function(id) {
    var element = document.getElementById(id);
    element.style['height'] = '400px';
    element.style['width'] = '100%';
    return new xrx.drawing.Drawing(element);
  };

  // mode hover (simple)
  var drawing1 = createDrawingCanvas('drawing1');
  drawing1.setModeHover();
  createShapeGroup(drawing1);
  // mode hover (overlapping shape groups)
  var drawing2 = createDrawingCanvas('drawing2');
  drawing2.setModeHover(true);
  createShapeGroup(drawing2);
  // mode select
  var drawing3 = createDrawingCanvas('drawing3');
  drawing3.setModeSelect();
  createShapeGroup(drawing3);
  // mode modify
  var drawing4 = createDrawingCanvas('drawing4');
  drawing4.setModeModify();
  createShapeGroup(drawing4);
  // mode create
  var drawing5 = createDrawingCanvas('drawing5');
  createShapeGroup(drawing5);
  drawing5.setModeCreate(drawing5.getShapes()[0].getCreatable());

  return [drawing1, drawing2, drawing3, drawing4, drawing5];

})();