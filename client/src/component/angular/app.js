var app = angular.module('app',  [
    'ui.bootstrap', 'AngularShape'
    ]
);

app.controller("Ctrl", function ($scope, angularShape) {

    var drawingCanvas = new xrx.drawing.Drawing(goog.dom.getElement('drawingCanvas'),
        xrx.engine.CANVAS);
    drawingCanvas.setBackgroundImage('test.jpg');
    drawingCanvas.setModeHover(false);

    var codePoints =
    {
        '1':[[10,10],[100,10],[100,110],[10,110]],
        '2':[[200,10],[300,15],[250,110],[240,31],[230,100]],
        '3':[[93.5,972.0],[110.5,986.0],[114.5,1000.0],[76.5,1023.0], [43.5,1009.0], [52.5,992.0], [74.5,976.0]]

    };

    angular.forEach(codePoints, function(value, key) {
        var polygon = new xrx.shape.Polygon.create(drawingCanvas);
        angularShape.draw(polygon, key, value,drawingCanvas);
    });

    $scope.rotateLeftCanvas = function () {
        drawingCanvas.getViewbox().rotateLeft();
        drawingCanvas.draw();
    }
    $scope.rotateRightCanvas = function () {
        drawingCanvas.getViewbox().rotateRight();
        drawingCanvas.draw();
    }
    $scope.zoomInCanvas = function () {
        drawingCanvas.getViewbox().zoomIn();
        drawingCanvas.draw();
    }
    $scope.zoomOutCanvas = function () {
        drawingCanvas.getViewbox().zoomOut();
        drawingCanvas.draw();
    }
    $scope.setModeView = function () {
        drawingCanvas.setModeView();
        drawingCanvas.draw();
    }
    $scope.currentTab = {};

    drawingCanvas.handleHover = function(shape) {
        shape.setStrokeColor('red');
        shape.setStrokeWidth("1");

        $scope.setTab(shape.id);
        $scope.$apply();


    };
    /**
    $scope.setTabAndDraw = function (idx) {
        $scope.setTab(idx);
        var polygon = new xrx.shape.Polygon.create(drawingCanvas);
        angularShape.draw(polygon, idx,codePoints[idx] ,drawingCanvas,'red');
        //angularShape.draw(idx,codePoints[idx] ,drawingCanvas,'yellow');


    };
    var polygon = new xrx.shape.Polygon.create(drawingCanvas);
     **/
    $scope.setTab = function (idx) {
        angular.forEach($scope.currentTab, function(value, key) {
            $scope.currentTab[key] = false;

        });
        $scope.currentTab[idx] = true;


        angularShape.draw(polygon, idx,codePoints[idx] ,drawingCanvas,'red');



    }

});