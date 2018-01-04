/**
 * @fileoverview A class representing an event-target. This
 * class is introduced (in addition to goog.event.EventTarget)
 * since we sometimes want to offer events for external JavaScript
 * classes such as jQuery or Angular that do not know about
 * Google Closure event handling.
 * @private
 */

goog.provide('xrx.EventTarget');



goog.require('goog.Disposable');
goog.require('goog.string');



/**
 * A class representing an event-target.
 * @constructor
 * @private
 */
xrx.EventTarget = function() {

  goog.base(this);
};
goog.inherits(xrx.EventTarget, goog.Disposable);



/**
 * Dispatch an event to a foreign JavaScript application. The function
 * dispatches the event only if the foreign JavaScript object implements
 * an according event handler function.
 * @param {string} eventType The name of the event. Must start with prefix "event*".
 * @param {?Object} opt_eventHandler The object used to apply the event.
 *   Defaults to this or this.eventHanlder_ if available.  
 */
xrx.EventTarget.prototype.dispatchExternal = function(eventType, opt_eventHandler) {
  if (!goog.string.startsWith(eventType, 'event')) throw Error('Invalid event-type "' +
      '". Prefix "event*" expected.');
  var handler;
  opt_eventHandler !== undefined ? handler = opt_eventHandler : handler = this;
  if (handler[eventType]) {
    if (arguments.length <= 2) {
      handler[eventType].apply(handler);
    } else {
      handler[eventType].apply(handler, this.argsArray_(arguments));
    }
  }
};



/**
 * @private
 */
xrx.EventTarget.prototype.argsArray_ = function(args) {
  var length = args.length - 2;
  var arr = new Array(length);
  for (var i = 0; i < length; i++) {
    arr[i] = args[i + 2];
  };
  return arr;
};



xrx.EventTarget.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
};
