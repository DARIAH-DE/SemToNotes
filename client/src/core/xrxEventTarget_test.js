/**
 * @fileoverview Test classes for xrx.EventTarget.
 * @private
 */

goog.provide('xrx.test.EventTargetA');
goog.provide('xrx.test.EventTargetB');



goog.require('xrx');
goog.require('xrx.EventTarget');



xrx.test.EventType = {
  TEST: 'eventTest',
  TEST_THIS_OBJ: 'eventThisObject',
  TEST_ARGS: 'eventArguments'
};



xrx.test.EventTargetA = function() {

  goog.base(this);
};
goog.inherits(xrx.test.EventTargetA, xrx.EventTarget);



xrx.test.EventTargetA.prototype.test = function() {
  this.dispatchExternal(xrx.test.EventType.TEST);
};



xrx.test.EventTargetA.prototype.testArguments = function(arg1, arg2, arg3) {
  this.dispatchExternal(xrx.test.EventType.TEST_ARGS, undefined, arg1, arg2, arg3);
};



xrx.test.EventTargetB = function(other) {

  goog.base(this);

  this.other_ = other;
};
goog.inherits(xrx.test.EventTargetB, xrx.EventTarget);



xrx.test.EventTargetB.prototype.test = function() {
  this.dispatchExternal(xrx.test.EventType.TEST);
};



xrx.test.EventTargetB.prototype.testThisObject = function() {
  this.dispatchExternal(xrx.test.EventType.TEST_THIS_OBJ, this.other_);
};
