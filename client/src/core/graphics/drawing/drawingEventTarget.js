***REMOVED***
***REMOVED*** @fileoverview A class implementing the event target behavior of a
***REMOVED***     drawing canvas.
***REMOVED***

goog.provide('xrx.drawing.EventTarget');
goog.provide('xrx.drawing.Event');
goog.provide('xrx.drawing.EventType');



***REMOVED***
goog.require('goog.Disposable');
goog.require('goog.events.EventHandler');
***REMOVED***
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.events.MouseWheelHandler.EventType');
goog.require('goog.math');
goog.require('goog.style');
goog.require('goog.userAgent');
goog.require('xrx.drawing');
goog.require('xrx.drawing.Mode');
goog.require('xrx.shape.Shapes');



xrx.drawing.EventType = {
  CLICK: [goog.events.EventType.TOUCHSTART, goog.events.EventType.CLICK],
  DBLCLICK: goog.events.EventType.DBLCLICK, //TODO: mobile event?
  DOWN: [goog.events.EventType.TOUCHSTART, goog.events.EventType.MOUSEDOWN],
  MOVE: [goog.events.EventType.TOUCHMOVE, goog.events.EventType.MOUSEMOVE],
  OUT: goog.events.EventType.MOUSEOUT, //TODO: mobile event?
  UP: [goog.events.EventType.TOUCHEND, goog.events.EventType.MOUSEUP],
  ZOOM: goog.events.MouseWheelHandler.EventType.MOUSEWHEEL
***REMOVED***



xrx.drawing.Event = {
  CLICK: 'handleClick',
  DBLCLICK: 'handleDblClick',
  DOWN: 'handleDown',
  MOVE: 'handleMove',
  OUT: 'handleOut',
  UP: 'handleUp',
  ZOOM: 'handleZoom'
***REMOVED***



***REMOVED***
***REMOVED*** A class implementing the event target behavior of a drawing canvas.
***REMOVED*** It receives events and invokes handler functions in xrx.drawing.EventHandler.
***REMOVED***
***REMOVED***
xrx.drawing.EventTarget = function() {

  goog.base(this);

  this.handler_ = new goog.events.EventHandler(this);

  this.keyClick_;

  this.keyDblClick_;

  this.keyDown_;

  this.keyMove_;

  this.keyOut_;

  this.keyUp_;

  this.keyWheel_;
***REMOVED***
goog.inherits(xrx.drawing.EventTarget, goog.Disposable);



xrx.drawing.EventTarget.prototype.getHandler = function() {
  return this.handler_;
***REMOVED***



xrx.drawing.EventTarget.prototype.registerEvent_ = function(e, handler, event) {
  // re-initialize the browser event in the case of mobile touch events
  if (e.getBrowserEvent().changedTouches) 
      e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
  e.preventDefault();
  e.stopPropagation();
  handler[event](e);
  this.draw();
***REMOVED***



xrx.drawing.EventTarget.prototype.registerClick = function(handler) {
***REMOVED***
  if (!this.keyClick_) this.keyClick_ = this.handler_.listen(self.canvas_.getEventTarget(),
    xrx.drawing.EventType.CLICK,
    function(e) { self.registerEvent_(e, handler, xrx.drawing.Event.CLICK); },
    true,
    handler
***REMOVED***
***REMOVED***



xrx.drawing.EventTarget.prototype.registerDblClick = function(handler) {
***REMOVED***
  if (!this.keyDblClick_) this.keyDblClick_ = this.handler_.listen(self.canvas_.getEventTarget(),
    xrx.drawing.EventType.DBLCLICK,
    function(e) { self.registerEvent_(e, handler, xrx.drawing.Event.DBLCLICK); },
    true,
    handler
***REMOVED***
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.EventTarget.prototype.registerDown_ = function(handler) {
***REMOVED***
  if (!this.keyDown_) this.keyDown_ = this.handler_.listen(self.canvas_.getEventTarget(),
    xrx.drawing.EventType.DOWN,
    function(e) { self.registerEvent_(e, handler, xrx.drawing.Event.DOWN); },
    true,
    handler
***REMOVED***
***REMOVED***



xrx.drawing.EventTarget.prototype.registerDrag = function(handler) {
  this.registerDown_(handler);
  this.registerMove_(handler);
  this.registerUp_(handler);
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.EventTarget.prototype.registerMove_ = function(handler) {
***REMOVED***
  if (!this.keyMove_) this.keyMove_ = this.handler_.listen(self.canvas_.getEventTarget(),
    xrx.drawing.EventType.MOVE,
    function(e) { self.registerEvent_(e, handler, xrx.drawing.Event.MOVE); },
    true,
    handler
***REMOVED***
***REMOVED***



xrx.drawing.EventTarget.prototype.registerOut = function(handler) {
***REMOVED***
  if (!this.keyOut_) this.keyOut_ = this.handler_.listen(self.canvas_.getEventTarget(),
    xrx.drawing.EventType.OUT,
    function(e) { self.registerEvent_(e, handler, xrx.drawing.Event.OUT); },
    true,
    handler
***REMOVED***
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.drawing.EventTarget.prototype.registerUp_ = function(handler) {
***REMOVED***
  if (!this.keyUp_) this.keyUp_ = this.handler_.listen(self.canvas_.getEventTarget(),
    xrx.drawing.EventType.UP,
    function(e) { self.registerEvent_(e, handler, xrx.drawing.Event.UP) },
    true,
    handler
***REMOVED***
***REMOVED***



xrx.drawing.EventTarget.prototype.registerWheel = function(handler) {
  if (goog.userAgent.MOBILE) return;
***REMOVED***
  var mwh = new goog.events.MouseWheelHandler(self.canvas_.getEventTarget());
  if (!this.keyWheel_) this.keyWheel_ = this.handler_.listen(mwh, xrx.drawing.EventType.ZOOM,
    function(e) { self.registerEvent_(e, handler, xrx.drawing.Event.ZOOM) },
    true,
    handler
***REMOVED***
***REMOVED***



***REMOVED***
***REMOVED*** @override
***REMOVED***
xrx.drawing.EventTarget.prototype.disposeInternal = function() {
  if (this.handler_) {
    this.handler_.dispose();
    this.handler_ = null;
  }
  goog.base(this, 'disposeInternal');
***REMOVED***



xrx.drawing.EventTarget.prototype.unregisterAll = function() {
  this.handler_.removeAll();
  this.keyClick_ = null;
  this.keyDblClick_ = null;
  this.keyDown_ = null;
  this.keyMove_ = null;
  this.keyOut_ = null;
  this.keyUp_ = null;
  this.keyWheel_ = null;
***REMOVED***



xrx.drawing.EventTarget.prototype.registerEvents = function(mode) {
  this.unregisterAll();

  switch(mode) {
  case undefined:
  case xrx.drawing.Mode.DISABLED:
    break;
  case xrx.drawing.Mode.VIEW:
    this.registerDblClick(this.viewbox_);
    this.registerDrag(this.viewbox_);
    this.registerOut(this.viewbox_);
    this.registerWheel(this.viewbox_);
    break;
  case xrx.drawing.Mode.MODIFY:
    this.registerDrag(this.modifiable_);
    this.registerWheel(this.viewbox_);
    break;
  case xrx.drawing.Mode.DELETE:
    this.registerClick(this.modifiable_);
    this.registerWheel(this.viewbox_);
    break;
  case xrx.drawing.Mode.CREATE:
    this.registerWheel(this.viewbox_);
    break;
  default:
    break;
  }
***REMOVED***
