/**
 * @fileoverview A class representing the fragment token.
 */

goog.provide('xrx.token.Fragment');



goog.require('xrx.token');
goog.require('xrx.token.Token');



/**
 * Constructs a new fragment token.
 *
 * @constructor
 * @extends xrx.token.Token
 */
xrx.token.Fragment = function(firstTag, opt_secondTag) {

  goog.base(this, xrx.token.FRAGMENT);

  this.firstTag_ = firstTag;

  this.secondTag_ = opt_secondTag;
};
goog.inherits(xrx.token.Fragment, xrx.token.Token);



/**
 * Returns the first tag of the fragment token.
 * @return {(xrx.token.StartTag|xrx.token.EmptyTag)} The tag.
 */
xrx.token.Fragment.prototype.firstTag = function() {
  return this.firstTag_;
};



/**
 * Returns the second tag of the fragment token.
 * @return {?xrx.token.EndTag} The end-tag token.
 */
xrx.token.Fragment.prototype.secondTag = function() {
  return this.secondTag_;
};



/**
 * Whether two tokens are the same.
 *
 * @param {!xrx.token} token The token to check against.
 * @return {!boolean}
 * @override
 */
xrx.token.Fragment.prototype.sameAs = function(token) {
  return token.type() === xrx.token.FRAGMENT &&
      this.firstTag_.sameAs(token.firstTag()) &&
      this.secondTag_.sameAs(token.secondTag());
};



/**
 * @override
 */
xrx.token.Fragment.prototype.compare = undefined;



/**
 * Indicates whether the token appears before the overloaded
 * token in document-order.
 * 
 * @param {!xrx.token} token The token to compare.
 * @return {!boolean}
 * @override
 */
xrx.token.Fragment.prototype.isBefore = function(token) {
  return this.firstTag_.label().isBefore(token.label()) || 
      (this.firstTag_.label().sameAs(token.label()) &&
           this.firstTag_.type() < token.type());
};



/**
 * Indicates whether the token appears after the overloaded
 * token in document-order.
 * 
 * @param {!xrx.token} token The token to compare.
 * @return {!boolean}
 * @override
 */
xrx.token.Fragment.prototype.isAfter = function(token) {
  return this.firstTag_.label().isAfter(token.label()) || 
      (this.firstTag_.label().sameAs(token.label()) &&
          this.firstTag_.type() > token.type());
};



/**
 * @override
 */
xrx.token.Fragment.prototype.set = undefined;



/**
 * A combined setter and getter function. Optionally sets the
 * type. Returns the type or the new type.
 * 
 * @param {?number} opt_type The value to be set (optional).
 * @return {!number}
 * @override
 */
xrx.token.Fragment.prototype.type = function(opt_type) {
  if (opt_type) this.type_ = opt_type;
  return this.type_;
};



/**
 * Returns the label of the fragment token.
 * 
 * @return {!number}
 * @override
 */
xrx.token.Fragment.prototype.label = function() {
  return this.firstTag_.label();
};



/**
 * Returns the offset of the fragment token.
 * 
 * @return {!number}
 * @override
 */
xrx.token.Fragment.prototype.offset = function() {
  return this.firstTag_.offset();
};



/**
 * Returns the length of the fragment token.
 * 
 * @return {!number}
 * @override
 */
xrx.token.Fragment.prototype.length = function() {
  return !this.secondTag_ ? this.firstTag_.length() : 
    this.secondTag_.offset() + this.secondTag_.length() - this.firstTag_.offset();
};



/**
 * Returns the XML string of a token in an XML stream.
 * 
 * @param {!string} stream An XML stream.
 * @return {!string} The token string.
 */
xrx.token.Fragment.prototype.xml = function(stream) {
  return stream.substr(this.offset(), this.length());
};
