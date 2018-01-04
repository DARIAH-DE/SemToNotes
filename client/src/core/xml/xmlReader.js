/**
 * @fileoverview A class representing a string reader.
 */

goog.provide('xrx.xml.Reader');



/**
 * A class representing a string reader.
 * @param {string} input The input string.
 * @constructor
 */
xrx.xml.Reader = function(input) {

  /**
   * The string.
   * @type {string}
   * @private
   */
  this.input_ = input || '';

  /**
   * Cursor position.
   * @type {number}
   * @private
   */
  this.pos_ = 0;

  /**
   * Length of the string.
   * @type {number}
   * @private
   */
  this.length_ = input.length;
};



/**
 * Sets or returns the input string.
 * @param {string} opt_input The new input string.
 * @return {string} The input string of the reader.
 */
xrx.xml.Reader.prototype.input = function(opt_input) {
  if (opt_input) this.input_ = opt_input;
  return this.input_;
};



/**
 * Returns the current cursor position.
 * @return {number} The cursor position.
 */
xrx.xml.Reader.prototype.pos = function() {
  return this.pos_;
};



/**
 * Returns the length of the reader's input string.
 * @return {number} The length.
 */
xrx.xml.Reader.prototype.length = function() {
  return this.length_;
};



/**
 * Put the cursor at the beginning.
 */
xrx.xml.Reader.prototype.first = function() {
  this.pos_ = 0;
};



/**
 * Put the cursor at the end.
 */
xrx.xml.Reader.prototype.last = function() {
  this.pos_ = this.length_ - 1;
};



/**
 * Put the cursor at a position.
 * @param {number} The position.
 */
xrx.xml.Reader.prototype.set = function(pos) {
  this.pos_ = pos || 0;
};



/**
 * Returns the current symbol.
 * @return {string} The current symbol.
 */
xrx.xml.Reader.prototype.get = function() {
  return this.input_.charAt(this.pos_);
};



/**
 * Whether the reader reached the end of the input string.
 * @return {boolean} At end or not.
 */
xrx.xml.Reader.prototype.finished = function() {
  return this.pos_ < 0 || this.pos_ > this.length_ ? true : false;
};



/**
 * Returns the current symbol and after that moves the cursor one
 * symbol forward.
 * @return {string} The symbol.
 */
xrx.xml.Reader.prototype.next = function() {
  return this.input_.charAt(this.pos_++);
};



/**
 * Returns the current symbol and after that moves the cursor one
 * symbol backward.
 * @return {string} The symbol.
 */
xrx.xml.Reader.prototype.previous = function() {
  return this.input_.charAt(this.pos_--);
};



/**
 * Peeks a symbol at a position relative to the current cursor
 * position without moving the cursor and returns the symbol.
 * @param {number} i The position relative to the cursor. May be
 *    a positive or negative integer.
 * @return {string} The peeked symbol.
 */
xrx.xml.Reader.prototype.peek = function(i) {
  return this.input_.charAt(this.pos_ + (i || 0));
};



/**
 * Moves the cursor n steps forward.
 * @param {number} The number of steps. A positive integer only.
 */
xrx.xml.Reader.prototype.forward = function(i) {
  this.pos_ += (i || 0);
};



/**
 * Moves the cursor n steps backward.
 * @param {number} The number of steps. A positive integer only.
 */
xrx.xml.Reader.prototype.backward = function(i) {
  this.pos_ -= (i || 0);
};



/**
 * Moves the cursor forward until a specific symbol is reached. The
 * target position is one step behind the symbol (inclusive).
 * @param {string} ch The symbol to be reached.
 */
xrx.xml.Reader.prototype.forwardInclusive = function(ch) {
  var i;
  for (i = 1;; i++) {
    if (this.peek(i) === ch) break;
  }
  this.forward(++i);
};



/**
 * Moves the cursor forward until a specific symbol is reached. The
 * target position is at the symbol (exclusive).
 * @param {string} ch The symbol to be reached.
 */
xrx.xml.Reader.prototype.forwardExclusive = function(ch) {
  var i;
  for (i = 1;; i++) {
    if (this.peek(i) === ch) break;
  }
  this.forward(i);
};



/**
 * Moves the cursor backward until a specific symbol is reached. The
 * target position is at the symbol (inclusive).
 * @param {string} ch The symbol to be reached.
 */
xrx.xml.Reader.prototype.backwardInclusive = function(ch) {
  var i;
  for (i = 1;; i++) {
    if (this.peek(-i) === ch) break;
  }
  this.backward(i);
};



/**
 * Moves the cursor backward until a specific symbol is reached. The
 * target position is one step behind the symbol (exclusive).
 * @param {string} ch The symbol to be reached.
 */
xrx.xml.Reader.prototype.backwardExclusive = function(ch) {
  var i;
  for (i = 1;; i++) {
    if (this.peek(-i) === ch) break;
  }
  this.backward(--i);
};
