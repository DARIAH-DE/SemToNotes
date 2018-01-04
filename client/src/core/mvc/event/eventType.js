/**
 * @fileoverview 
 */

goog.provide('xrx.event.Type');



goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.userAgent');



xrx.event.Type = function() {};



xrx.event.Type.CLICK = goog.userAgent.MOBILE ? goog.events.EventType.TOUCHSTART :
    goog.events.EventType.CLICK;



xrx.event.Type.DBLCLICK = goog.events.EventType.DBLCLICK; //TODO: mobile event?




xrx.event.Type.DOWN = goog.userAgent.MOBILE ? goog.events.EventType.TOUCHSTART :
    goog.events.EventType.MOUSEDOWN;



xrx.event.Type.IN = goog.events.EventType.MOUSEOVER; //TODO: mobile event?




xrx.event.Type.INPUT = (function() {
  if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(9)) {
    return goog.events.EventType.PROPERTYCHANGE
  } else if (goog.userAgent.IE && goog.userAgent.isVersionOrHigher(9) &&
      !goog.userAgent.isVersionOrHigher(10)) {
    return goog.events.EventType.KEYUP;
  } else {
    return goog.events.EventType.INPUT;
  };
  return goog.events.EventType.INPUT;
})();



xrx.event.Type.MOVE = goog.userAgent.MOBILE ? goog.events.EventType.TOUCHMOVE :
            goog.events.EventType.MOUSEMOVE;



xrx.event.Type.OUT = goog.events.EventType.MOUSEOUT; //TODO: mobile event?



xrx.event.Type.UP = goog.userAgent.MOBILE ? goog.events.EventType.TOUCHEND :
          goog.events.EventType.MOUSEUP;



xrx.event.Type.WHEEL = goog.events.MouseWheelHandler.EventType.MOUSEWHEEL;
