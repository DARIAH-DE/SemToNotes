/**
 * @fileoverview A class representing the location of a token 
 *     in a XML stream.
 */

goog.provide('xrx.xml.Location');



/**
 * A class representing the location of a token in an XML 
 * stream.
 * 
 * @param {!number} offset The offset.
 * @param {!number} length The number of characters occupied.
 * @constructor
 */
xrx.xml.Location = function(offset, length) {

  this.offset = offset;

  this.length = length;
};



/**
 * Returns the XML string of the location in a XML stream.
 * 
 * @param {!string} stream The XML stream.
 * @return {!string} The XML string occupied by the location
 */
xrx.xml.Location.prototype.xml = function(stream) {
  return stream.substr(this.offset, this.length);
};
