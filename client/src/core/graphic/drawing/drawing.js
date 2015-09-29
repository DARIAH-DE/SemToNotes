/**
 * @fileoverview A class providing enumerations and static functions for
 * the drawing classes.
 */

goog.provide('xrx.drawing');
goog.provide('xrx.drawing.EventType');
goog.provide('xrx.drawing.Orientation');
goog.provide('xrx.drawing.Mode');
goog.provide('xrx.drawing.State');



/**
 * A static class providing enumerations for the drawing classes.
 */
xrx.drawing = function() {};



/**
 * Enumeration for drawing states.
 * @enum (number)
 */
xrx.drawing.State = {
  DRAG: 1,
  NONE: 2
};



/**
 * Enumeration for drawing modes.
 * @enum {number}
 */
xrx.drawing.Mode = {
  VIEW: 1,
  MODIFY: 2,
  DELETE: 3,
  CREATE: 4,
  DISABLED: 5,
  SELECT: 6,
  HOVER: 7,
  HOVERMULTIPLE: 8
};



/**
 * Enumeration of orientations, used by the drawing view-box.
 * @enum {string}
 */
xrx.drawing.Orientation = {
  C: 'C', // center
  NE: 'NE', // northeast
  SE: 'SE', // southeast
  SW: 'SW', // southwest
  NW: 'NW'  // northwest
};



/**
 * Enumeration of event types dispatched by the drawing canvas.
 * @enum {string}
 */
xrx.drawing.EventType = {
  VIEWBOX_CHANGE: 'eventViewboxChange',
  SHAPE_HOVER_IN: 'eventShapeHoverIn',
  SHAPE_HOVER_MOVE: 'eventShapeHoverMove',
  SHAPE_HOVER_OUT: 'eventShapeHoverOut',
  SHAPE_BEFORE_DRAW: 'eventShapeBeforeDraw'
};
