/**
 * @fileoverview A class representing a numeric, array like 
 *     XML labeling scheme known as Dewey ID.
 */

goog.provide('xrx.xml.Label');



/**
 * Constructs a new label.
 *
 * @constructor
 * @param {?Array<!number>} array The array of numbers.
 */
xrx.xml.Label = function(array) {
  this.label_ = array || [];
};



xrx.xml.Label.prototype.getArray = function() {
  return this.label_;
};



/**
 * Returns the length of the label. The length corresponds 
 * to the nesting depth of a node or token in the XML tree.
 * @return {!number}
 */
xrx.xml.Label.prototype.length = function() {
  return this.label_.length;
};



/**
 * Returns a label item at position index.
 * @param {!number} index The index. 
 * @return {!number}
 */
xrx.xml.Label.prototype.value = function(index) {
  return this.label_[index];
};



/**
 * Returns the first label item.
 * @return {!number} 
 */
xrx.xml.Label.prototype.first = function() {
  return this.label_[0];
};



/**
 * Returns the last label item.
 * @return {!number}
 */
xrx.xml.Label.prototype.last = function() {
  return this.label_[this.length() - 1];
};



/**
 * Adds a value to the end of the label array.
 */
xrx.xml.Label.prototype.push = function(value) {
  this.label_.push(value);
};



/**
 * Removes the last item of the label array and
 * return the value of the item.
 * @return {!number}
 */
xrx.xml.Label.prototype.pop = function(value) {
  return this.label_.pop();
};




/**
 * Returns a copy of the label.
 * @return {!xrx.xml.Label}
 */
xrx.xml.Label.prototype.clone = function() {
  var length = this.length();
  var array = new Array(length);

  for(var i = 0; i < length; i++) {
    array[i] = this.label_[i];
  }
  return new xrx.xml.Label(array);
};



/**
 * Returns the joint parent of two labels.
 * @param {!xrx.xml.Label} label
 * @return {!xrx.xml.Label}
 */
xrx.xml.Label.prototype.jointParent = function(label) {
  var arr = [];

  for(var i = 0; i < label.length(); i++) {
    val = this.label_[i];
    if (val === label.value(i)) arr.push(val);
  }
  return arr.length === 0 ? new xrx.xml.Label() : new xrx.xml.Label(arr);
};



/**
 * Mutates the label into its parent label.
 */
xrx.xml.Label.prototype.parent = function() {
  this.label_.pop();
};



/**
 * Mutates the label into its child label.
 */
xrx.xml.Label.prototype.child = function() {
  this.label_.push(1);
};



/**
 * Mutates the label into its preceding sibling label.
 */
xrx.xml.Label.prototype.precedingSibling = function() {
  this.label_[this.length() - 1] -= 1;
};



/**
 * Mutates the label into its next sibling label.
 */
xrx.xml.Label.prototype.nextSibling = function() {
  this.label_[this.length() - 1] += 1;
};



/**
 * Helper function for xrx.token.NOT_TAG.
 */
xrx.xml.Label.prototype.push0 = function() {
  this.label_.push(0);
};



/**
 * Indicates whether two labels are the same.
 * @param {!xrx.xml.Label}
 * @return {!boolean}
 */
xrx.xml.Label.prototype.sameAs = function(label) {

  if (this.label_.length !== label.length()) {
    return false;
  }
  for(var i = 0; i < label.length(); i++) {
    if (this.label_[i] !== label.value(i)) {
      return false;
    }
  }
  return true;
};



/**
 * Tests whether a label is the root label.
 * @return {boolean} 
 */
xrx.xml.Label.prototype.isRoot = function() {
  return this.label_.length === 0;
};



/**
 * Tests whether the label appears before another label
 * in document order.
 * @return {boolean} 
 */
xrx.xml.Label.prototype.isBefore = function(label) {

  for(var i = 0; i < this.length(); i++) {
    if (this.label_[i] < label.value(i)) return true;
  }
  if (this.length() < label.length()) return true;
  return false;
};



/**
 * Tests whether the label appears after another label
 * in document order.
 * @return {boolean} 
 */
xrx.xml.Label.prototype.isAfter = function(label) {

  for(var i = 0; i < this.length(); i++) {
    if (this.label_[i] > label.value(i)) return true;
  }
  if (this.length() > label.length()) return true;
  return false;
};



/**
 * Tests whether the label is the child label of another
 * label.
 * @return {boolean} 
 */
xrx.xml.Label.prototype.isChildOf = function(label) {

  if (this.length() - 1 !== label.length()) return false;

  for (var i = 0; i < label.length(); i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  return true;
};



/**
 * Tests whether the label is an ancestor label of another
 * label.
 * @return {boolean} 
 */
xrx.xml.Label.prototype.isAncestorOf = function(label) {

  if (this.length() >= label.length()) return false;

  for (var i = 0; i < this.length(); i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  return true;
};



xrx.xml.Label.prototype.isDescendantOf = function(label) {

  if (this.length() <= label.length()) return false;

  for (var i = 0; i < label.length(); i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  return true;
};



xrx.xml.Label.prototype.isParentOf = function(label) {

  if (this.length() !== label.length() - 1) return false;

  for (var i = 0; i < this.length(); i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  return true;
};



xrx.xml.Label.prototype.isPrecedingSiblingOf = function(label) {

  if (this.length() !== label.length()) return false;
  var len = this.length();
  for (var i = 0; i < len - 1; i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  if (this.label_[len - 1] >= label.value(len - 1)) return false;
  return true;
};



xrx.xml.Label.prototype.isFollowingSiblingOf = function(label) {

  if (this.length() !== label.length()) return false;
  var len = this.length();
  for (var i = 0; i < len - 1; i++) {
    if (this.label_[i] !== label.value(i)) return false;
  }
  if (this.label_[len - 1] <= label.value(len - 1)) return false;
  return true;
};



xrx.xml.Label.prototype.toString = function() {
  return this.label_.join('.');
};
