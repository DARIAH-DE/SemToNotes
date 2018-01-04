(function($) {
  
  // public functions
  $.fn.app = function() {
    $.app.init();
    return this;
  };
  
  $.fn.dispose = function() {
    $.app.drawing.dispose();
    $.app.style.dispose();
    $.app.styleHoverable.dispose();
    $.app.styleCreatable.dispose();
    $.app.drawing = null;
    $.app.style = null;
    $.app.styleHoverable = null;
    $.app.styleCreatable = null;
  };
  
  // private functions
  $.app = {};
  
  $.app.drawing;
  
  $.app.shapeGroup;
  
  $.app.style;
  
  $.app.styleHoverable;
  
  $.app.styleCreatable;
  
  $.app.init = function() {
    
    // initialize the view
    $('#app').css('display', 'block');
    $('#app').css('background-color', 'rgb(245, 245, 245)');
    $('#canvas').css('width', '100%');
    $('#canvas').css('height', '500px');
    $('#canvas').css('border-top', 'solid #2e6da4 3px');
    
    // initialize the drawing canvas
    $.app.drawing = new xrx.drawing.Drawing($('#canvas')[0]);
    $.app.drawing.setModeHover(true);
    
    // initialize shape style
    $.app.style = new xrx.shape.Style();
    $.app.style.setStrokeColor('#00ffff');
    $.app.style.setStrokeWidth(1);
    $.app.style.setFillColor('#00ffff');
    $.app.style.setFillOpacity(.2);
    
    // initialize shape style when hovered
    $.app.styleHoverable = new xrx.shape.Style();
    $.app.styleHoverable.setStrokeColor('#ff9933');
    $.app.styleHoverable.setStrokeWidth(1);
    $.app.styleHoverable.setFillColor('#ff9933');
    $.app.styleHoverable.setFillOpacity(.3);
    
    // initialize shape style during creation
    $.app.styleCreatable = new xrx.shape.Style();
    $.app.styleCreatable.setStrokeColor('#cc33ff');
    $.app.styleCreatable.setStrokeWidth(1);
    $.app.styleCreatable.setFillColor('#cc33ff');
    $.app.styleCreatable.setFillOpacity(.3);
    
    // initialize a shape group (polygon and line) to draw
    $.app.shapeGroup = new xrx.shape.ShapeGroup($.app.drawing);
    $.app.shapeGroup.setStyle($.app.style);
    $.app.shapeGroup.getHoverable().setStyle($.app.styleHoverable);
    $.app.shapeGroup.getCreatable().setStyle($.app.styleCreatable);
    var polygon = new xrx.shape.Polygon($.app.drawing);
    var line = new xrx.shape.Line($.app.drawing);
    $.app.shapeGroup.addChildren([polygon, line]);
    
    // callback function, evaluated after image is loaded
    var imageUrl = './data/SachsenspiegelHeidelberg/Bilder-34572-28186-1600.jpg';
    var shapeData = './client/demo/example/complete-application.json';
    $.app.drawing.setBackgroundImage(imageUrl, function() {
      
      // scroll annotations into view
      this.getViewbox().translate(0, -700);
      
      // find a proper zooming model
      var image = this.getBackgroundImage();
      var imageWidth = image.naturalWidth;
      var min = 100;
      var max = imageWidth * 3;
      var steps = 30;
      var minFactor = min / imageWidth;
      var maxFactor = max / imageWidth;
      var factor = ((max - min) / steps) / imageWidth;
      this.getViewbox().setZoomFactorMin(minFactor);
      this.getViewbox().setZoomFactorMax(maxFactor);
      this.getViewbox().setZoomFactor(factor);
      
      // load data and create shapes
      var group;
      var polygon;
      var line;
      $.getJSON(shapeData, function(data) {
        $.each(data, function(key, value) {
          group = new xrx.shape.ShapeGroup($.app.drawing);
          group.setStyle($.app.style);
          group.getHoverable().setStyle($.app.styleHoverable);
          group.getCreatable().setStyle($.app.styleCreatable);
          polygon = new xrx.shape.Polygon($.app.drawing);
          polygon.setCoords(value.shapes._0.coords);
          line = new xrx.shape.Line($.app.drawing);
          line.setCoords(value.shapes._1.coords);
          group.addChildren([polygon, line]);
          $.app.drawing.addShapes(group);
        });
      });
    });
    // register toolbar events
    $('#message').text('Choose between viewing / hovering, modifying or drawing image annotations.');
    $('#btn-hover').click(function() {
      $.app.drawing.setModeHover(true);
      $('#message').text('Pan and zoom the image, hover image annotations.');
    });
    $('#btn-modify').click(function() {
      $.app.drawing.setModeModify();
      $('#message').text('Click on a annotation to start moving specific points, or the annotation as a whole.');
    });
    $('#btn-draw').click(function() {
      $.app.drawing.setModeCreate($.app.shapeGroup.getCreatable());
      $('#message').text('Draw a shape group consisting of two shapes: (1) a polygon to mark an image region, and (2) a line to mark the direction of the polygon.');
    });
  };
}(jQuery));
$('#app').app();
