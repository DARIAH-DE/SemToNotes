/**
 * Created by wit on 30/03/15.
 */


var AngularShape = angular.module('AngularShape', []);
AngularShape.factory('angularShape', function() {
    var angularShape = {
        draw: function(polygon, key, codePoints, drawingCanvas, color) {

            polygon.setCoords(codePoints);
            polygon.setStrokeWidth(1);
            color = color || 'blue';
            polygon.setStrokeColor(color);
            polygon.id = key;
            drawingCanvas.getLayerShape().addShapes([polygon]);
            drawingCanvas.draw();
   }
    };


    return angularShape;




});


