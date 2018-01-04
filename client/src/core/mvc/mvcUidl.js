/**
 * @fileoverview A class implementing UIDL validation.
 */

goog.provide('xrx.mvc.Uidl');
goog.provide('xrx.mvc.Validate');



goog.require('goog.dom.classes');
goog.require('goog.dom.dataset');
goog.require('goog.dom.DomHelper');



/**
 * @constructor
 */
xrx.mvc.Uidl = function(tagName, className, opt_choice) {

  this['tagName'] = tagName;

  this['className'] = className;

  this['choice'] = opt_choice;
};



/**
 * @constructor
 */
xrx.mvc.Validate = function() {

  this.stack_ = [];
};



xrx.mvc.Validate.prototype.push = function(message) {
  this.stack_.push(message);
};



xrx.mvc.Validate.prototype.empty = function() {
  this.stack_ = [];
};



xrx.mvc.Validate.prototype.report = function() {
  var s = '';
  for (var i = 0; i < this.stack_.length; i++) {
    s += '(' + i + ') ';
    s += this.stack_[i];
    s += ' ';
  }
  return s;
};



xrx.mvc.Validate.prototype.isValid = function() {
  return this.stack_.length === 0;
};



xrx.mvc.Validate.prototype.assert = function(test, message) {
  if (test !== true) this.push(message);
};



xrx.mvc.Validate.prototype.tagName = function() {
  var n1 = this.element_.tagName.toLowerCase();
  var n2 = this.uidl['tagName'];
  this.assert(n1 === n2,
      'Wrong tag-name, "' + n1 + '". "' + n2 + '" expected.');
  return n1 === n2;
};



xrx.mvc.Validate.prototype.className = function() {
  var n = this.uidl['className'];
  var test = goog.dom.classes.has(this.element_, n);
  this.assert(test, 'Missing class-name "' + n + '"');
  return test;
};



xrx.mvc.Validate.prototype.dataset = function(key) {
  if (key === undefined) return;
  var test = goog.dom.dataset.has(this.element_, key);
  this.assert(test, 'Missing dataset, "' + key + '" expected.');
  return test;
};



xrx.mvc.Validate.prototype.text = function(flag) {
  if (flag === undefined) return;
  var test = ((flag === true) && (goog.dom.getTextContent(this.element_) !== '')) ||
      ((flag === false) && (goog.dom.getTextContent(this.element_) === ''));
  this.assert(test, 'Missing text-content.');
  return test;
};



xrx.mvc.Validate.prototype.choice = function() {
  var c = this.uidl['choice'];
  if (!c) return;
  var count = 0;
  var validate;
  var arg;
  var tmp;
  for (var i = 0; i < c.length; i++) {
    validate = c[i][0];
    arg = c[i][1];
    if (this[validate] === undefined) {
      throw Error('UIDL validation function "' + validate + '" not known.')
    } else {
      if (this[validate](arg) === true) count += 1;
    }
  };
  this.assert(count === 1, 'Invalid choice, one of the last ' + c.length +
    ' conditions are required.');
  if (count === 1) {
    for (var i = 0; i < c.length; i++) {
      this.stack_.pop();
    };
  }
  return count === 1;
};



xrx.mvc.Validate.prototype.validate = function() {
  if (!this.uidl) return;
  this.tagName();
  this.className();
  this.choice();
  if (!this.isValid()) throw Error('UIDL (' + this.element_.id + '): '
      + this.report());
  this.empty();
};
