***REMOVED***
***REMOVED*** @fileoverview
***REMOVED***

goog.provide('xrx.canvas');



goog.require('xrx');



***REMOVED***
***REMOVED***
***REMOVED***
xrx.canvas = function() {***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.canvas.setTransform_ = function(context, matrix) {
  context.setTransform(matrix.m00_, matrix.m10_, matrix.m01_,
      matrix.m11_, matrix.m02_, matrix.m12_);
***REMOVED***



xrx.canvas.render = function(canvas, affineTransform, callback) {
  var ctx = canvas.getContext('2d');
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  xrx.canvas.setTransform_(ctx, affineTransform);
  callback();
  ctx.closePath();
  ctx.restore();
***REMOVED***



goog.exportProperty(xrx, 'canvas', xrx.canvas);
