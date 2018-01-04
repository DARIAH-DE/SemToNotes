/**
 * @fileoverview A class implementing the event target behavior of a
 * drawing canvas.
 * @private
 */

goog.provide('xrx.drawing.EventTarget');



goog.require('goog.events');
goog.require('goog.Disposable');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.events.MouseWheelHandler');
goog.require('goog.events.MouseWheelHandler.EventType');
goog.require('goog.math');
goog.require('goog.style');
goog.require('goog.Timer');
goog.require('goog.userAgent');
goog.require('xrx.event.Handler');
goog.require('xrx.event.Type');
goog.require('xrx.drawing.Cursor');
goog.require('xrx.drawing.Mode');
goog.require('xrx.shape.Shapes');



/**
 * A class implementing the event target behavior of a drawing canvas.
 * It receives events and invokes handler functions.
 * @constructor
 * @private
 */
xrx.drawing.EventTarget = function() {

  goog.base(this);

  /**
   * The event handler of this drawing canvas.
   * @type {goog.events.EventHandler}
   */
  this.handler_ = new goog.events.EventHandler(this);

  /**
   * The drawing cursor.
   * @type {xrx.drawing.Cursor}
   */
  this.cursor_ = new xrx.drawing.Cursor(this);


  /**
   * The event target. If xrx.drawing.EventTarget.DRAWING, panning is possible,
   * just dragging of image otherwise.
   * @type {xrx.drawing.EventTarget.DRAWING|xrx.drawing.EventTarget.VIEWBOX}
   */
  this.eventTarget_ = xrx.drawing.EventTarget.DRAWING;
};
goog.inherits(xrx.drawing.EventTarget, goog.Disposable);



xrx.drawing.EventTarget.DRAWING = 'DRAWING';



xrx.drawing.EventTarget.VIEWBOX = 'VIEWBOX';



/**
 * Either makes the drawing canvas or just the background image the target for all events.
 * @param {xrx.drawing.EventTarget.DRAWING|xrx.drawing.EventTarget.VIEWBOX} target The target.
 */
xrx.drawing.EventTarget.prototype.setEventTarget = function(target) {
  if (target !== xrx.drawing.EventTarget.DRAWING &&
      target !== xrx.drawing.EventTarget.VIEWBOX) throw Error('xrx.drawing.EventTarget.DRAWING' +
      ' or xrx.drawing.EventTarget.VIEWBOX expected.');
  this.eventTarget_ = target;
};



/**
 * Returns the event handler of this drawing canvas.
 * @return {goog.events.EventHandler} The event handler.
 */
xrx.drawing.EventTarget.prototype.getHandler = function() {
  return this.handler_;
};



/**
 * @private
 */
xrx.drawing.EventTarget.prototype.registerEvent_ = function(e, handler, event) {
  this.cursor_.init(e);
  var isInViewbox = this.viewbox_.containsPoint(this.cursor_.getPoint());
  if ((this.eventTarget_ === xrx.drawing.EventTarget.VIEWBOX && isInViewbox) ||
        this.eventTarget_ === xrx.drawing.EventTarget.DRAWING) {
    e.preventDefault();
    e.stopPropagation();
    // re-initialize the browser event in the case of mobile touch events
    if (e.getBrowserEvent().changedTouches) 
        e.init(e.getBrowserEvent().changedTouches[0], e.currentTarget);
    handler[event](e, this.cursor_);
    this.draw();
  }
};



/**
 * Function registers a click event which is propagated to a handler object.
 * @param {Object} The handler object.
 */
xrx.drawing.EventTarget.prototype.registerClick = function(handler) {
  var self = this;
  this.handler_.listen(
    self.canvas_.getEngineElement().getEventTarget(),
    xrx.event.Type.CLICK,
    function(e) { self.registerEvent_(e, handler, xrx.event.Handler.CLICK); },
    false
  );
};



/**
 * Function registers a double-click event which is propagated to a handler object.
 * @param {Object} The handler object.
 */
xrx.drawing.EventTarget.prototype.registerDblClick = function(handler) {
  var self = this;
  this.handler_.listen(
    self.canvas_.getEngineElement().getEventTarget(),
    xrx.event.Type.DBLCLICK,
    function(e) { self.registerEvent_(e, handler, xrx.event.Handler.DBLCLICK); },
    false
  );
};



/**
 * @private
 */
xrx.drawing.EventTarget.prototype.registerDown = function(handler) {
  var self = this;
  this.handler_.listen(
    self.canvas_.getEngineElement().getEventTarget(),
    xrx.event.Type.DOWN,
    function(e) { self.registerEvent_(e, handler, xrx.event.Handler.DOWN); },
    false
  );
};



/**
 * Function registers a drag event which is propagated to a handler object.
 * @param {Object} The handler object.
 */
xrx.drawing.EventTarget.prototype.registerDrag = function(handler) {
  this.registerDown(handler);
  this.registerMove(handler);
  this.registerUp(handler);
};



/**
 * @private
 */
xrx.drawing.EventTarget.prototype.registerMove = function(handler) {
  var self = this;
  this.handler_.listen(
    self.canvas_.getEngineElement().getEventTarget(),
    xrx.event.Type.MOVE,
    function(e) { self.registerEvent_(e, handler, xrx.event.Handler.MOVE); },
    false
  );
};



/**
 * @private
 */
xrx.drawing.EventTarget.prototype.registerHover = function(handler) {
  var self = this;
  this.handler_.listen(
    self.canvas_.getEngineElement().getEventTarget(),
    xrx.event.Type.MOVE,
    function(e) { self.registerEvent_(e, handler, xrx.event.Handler.MOVE); },
    false
  );
};



/**
 * Function registers a mouse out event which is propagated to a handler object.
 * @param {Object} The handler object.
 */
xrx.drawing.EventTarget.prototype.registerOut = function(handler) {
  var self = this;
  this.handler_.listen(
    self.canvas_.getEngineElement().getEventTarget(),
    xrx.event.Type.OUT,
    function(e) { self.registerEvent_(e, handler, xrx.event.Handler.OUT); },
    false
  );
};



/**
 * @private
 */
xrx.drawing.EventTarget.prototype.registerUp = function(handler) {
  var self = this;
  this.handler_.listen(
    self.canvas_.getEngineElement().getEventTarget(),
    xrx.event.Type.UP,
    function(e) { self.registerEvent_(e, handler, xrx.event.Handler.UP) },
    false
  );
};



/**
 * Function registers a wheel event which is propagated to a handler object.
 * @param {Object} The handler object.
 */
xrx.drawing.EventTarget.prototype.registerWheel = function(handler) {
  if (goog.userAgent.MOBILE) return;
  var self = this;
  var mwh = new goog.events.MouseWheelHandler(self.canvas_.getEngineElement().getEventTarget());
  this.handler_.listen(mwh, xrx.event.Type.WHEEL,
    function(e) { self.registerEvent_(e, handler, xrx.event.Handler.WHEEL) },
    false
  );
};



/**
 * @override
 */
xrx.drawing.EventTarget.prototype.disposeInternal = function() {
  if (this.handler_) {
    this.handler_.dispose();
    this.handler_ = null;
  }
};



/**
 * Function registers all events necessary for a specific mode of this
 * drawing canvas.
 * @param {string} The mode.
 */
xrx.drawing.EventTarget.prototype.registerEvents = function(mode) {
  this.handler_.removeAll();
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
  case xrx.drawing.Mode.SELECT:
    this.registerDown(this.selectable_);
    this.registerWheel(this.viewbox_);
    break;
  case xrx.drawing.Mode.MODIFY:
    this.registerDrag(this.modifiable_);
    this.registerWheel(this.viewbox_);
    break;
  case xrx.drawing.Mode.CREATE:
    this.registerDown(this.creatable_);
    this.registerMove(this.creatable_);
    this.registerUp(this.creatable_);
    this.registerWheel(this.viewbox_);
    break;
  case xrx.drawing.Mode.HOVER:
    this.registerHover(this.hoverable_);
    this.registerOut(this.hoverable_);
    this.registerWheel(this.viewbox_);
    this.registerDrag(this.viewbox_);
    break;
  case xrx.drawing.Mode.HOVERMULTIPLE:
    this.registerHover(this.hoverable_);
    this.registerOut(this.hoverable_);
    this.registerWheel(this.viewbox_);
    this.registerDrag(this.viewbox_);
    break;
  default:
    throw Error('Unknown mode.');
    break;
  }
};



xrx.drawing.EventTarget.prototype.disposeInternal = function() {
  this.handler_.removeAll();
  this.handler_.dispose();
  this.handler_ = null;
  this.cursor_.dispose();
  this.cursor_ = null;
  goog.base(this, 'disposeInternal');
};
