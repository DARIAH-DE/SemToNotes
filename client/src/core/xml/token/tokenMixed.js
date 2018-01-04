/**
 * @fileoverview A class representing the mixed token.
 */

goog.provide('xrx.token.Mixed');



goog.require('xrx.token');
goog.require('xrx.token.Token');



/**
 * Constructs a new mixed token.
 *
 * @constructor
 * @extends xrx.token.Token
 */
xrx.token.Mixed = function(firstToken, opt_secondToken, opt_firstOffset,
      opt_secondOffset) {

  goog.base(this, xrx.token.MIXED);

  this.firstToken_ = firstToken;

  this.secondToken_ = opt_secondToken;

  this.firstOffset_ = opt_firstOffset || 0;

  this.secondOffset_ = opt_secondOffset || 0;
};
goog.inherits(xrx.token.Mixed, xrx.token.Token);



/**
 * Returns the first token of the mixed token.
 * @return {xrx.token.Token} The token.
 */
xrx.token.Mixed.prototype.firstToken = function() {
  return this.firstToken_;
};



/**
 * Returns the second token of the mixed token.
 * @return {xrx.token.Token} The token.
 */
xrx.token.Mixed.prototype.secondToken = function() {
  return this.secondToken_;
};



/**
 * Returns the offset of the first token of the fragment.
 * @return {number} The offset.
 */
xrx.token.Mixed.prototype.firstOffset = function() {
  return this.firstOffset_;
};



/**
 * Returns the offset of the second token of the fragment.
 * @return {number} The offset.
 */
xrx.token.Mixed.prototype.secondOffset = function() {
  return this.secondOffset_;
};



/**
 * Whether two tokens are the same.
 *
 * @param {!xrx.token} token The token to check against.
 * @return {!boolean}
 */
xrx.token.Mixed.prototype.sameAs = function(token) {
  return token.type() === xrx.token.MIXED &&
      this.firstToken_.sameAs(token.firstToken()) &&
      this.secondToken_.sameAs(token.secondToken()) &&
      this.firstOffset_ === token.firstOffset() &&
      this.secondOffset_ === token.secondOffset();
};



/**
 * @override
 */
xrx.token.Mixed.prototype.compare = undefined;



/**
 * Indicates whether the token appears before the overloaded
 * token in document-order.
 * 
 * @param {!xrx.token} token The token to compare.
 * @return {!boolean} 
 */
xrx.token.Mixed.prototype.isBefore = function(token) {
  return this.firstToken_.label().isBefore(token.label()) || 
      (this.firstToken_.label().sameAs(token.label()) &&
          this.firstToken_.type() < token.type());
};



/**
 * Indicates whether the token appears after the overloaded
 * token in document-order.
 * 
 * @param {!xrx.token} token The token to compare.
 * @return {!boolean} 
 */
xrx.token.Mixed.prototype.isAfter = function(token) {
  return this.firstToken_.label().isAfter(token.label()) || 
      (this.firstToken_.label().sameAs(token.label()) &&
          this.firstToken_.type() > token.type());
};



/**
 * @override
 */
xrx.token.Mixed.prototype.set = undefined;



/**
 * A combined setter and getter function. Optionally sets the
 * type. Returns the type or the new type.
 * 
 * @param {?number} opt_type The value to be set (optional).
 * @return {!number}
 * @override
 */
xrx.token.Mixed.prototype.type = function(opt_type) {
  if (opt_type) this.type_ = opt_type;
  return this.type_;
};



/**
 * @override
 */
xrx.token.Mixed.prototype.label = undefined;



/**
 * Returns the offset of the mixed token.
 * 
 * @return {!number} The offset.
 * @override
 */
xrx.token.Mixed.prototype.offset = function() {
  return this.firstToken_.offset() + this.firstOffset_;
};



/**
 * Returns the length of the mixed token.
 * 
 * @return {!number} The length.
 * @override
 */
xrx.token.Mixed.prototype.length = function() {
  return !this.secondToken_ ? this.firstToken_.length() - this.firstOffset_: 
    this.secondToken_.offset() + this.secondToken_.length() - this.secondOffset_ -
    this.firstToken_.offset() + this.firstOffset_;
};



/**
 * Returns the XML string of a token in an XML stream.
 * 
 * @param {!string} stream An XML stream.
 * @return {!string} The token string.
 */
xrx.token.Mixed.prototype.xml = function(stream) {
  return stream.substr(this.offset(), this.length());
};
