/**
 * @fileoverview Class implements data instance component for 
 *     the model-view-controller.
 */

goog.provide('xrx.mvc.Instance');



goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.net.XhrIo');
goog.require('xrx.index.Index');
goog.require('xrx.mvc.ComponentModel');
goog.require('xrx.node');
goog.require('xrx.node.DocumentB');
goog.require('xrx.xml.Parser');
goog.require('xrx.xml.Stream');
goog.require('xrx.xml.Pilot');



/**
 * @constructor
 */
xrx.mvc.Instance = function(element) {

  this.xml_;

  this.stream_;

  this.pilot_;

  this.document_ = new xrx.node.DocumentB(this);

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Instance, xrx.mvc.ComponentModel);



/**
 * 
 */
xrx.mvc.Instance.prototype.update = function(offset, length, xml) {
  var tmp = this.xml_.substr(0, offset) + xml + this.xml_.substr(
      offset + length);
  this.xml_ = undefined;
  this.xml_ = tmp;
  this.stream_ = undefined;
  this.stream_ = new xrx.xml.Stream(this.xml_);
  this.pilot_ = undefined;
  this.pilot_ = new xrx.xml.Pilot(this.xml_);
};



/**
 * 
 */
xrx.mvc.Instance.prototype.getDataInline = function() {
  var parse = new xrx.xml.Parser();

  this.xml_ = parse.normalize(goog.dom.getRawTextContent(this.getElement()));
  this.stream_ = new xrx.xml.Stream(this.xml_);
  this.pilot_ = new xrx.xml.Pilot(this.xml_);
};



/**
 * 
 */
xrx.mvc.Instance.prototype.getDataRemote = function(xml) {
  var parse = new xrx.xml.Parser();
  this.xml_ = parse.normalize(xml);
  this.stream_ = new xrx.xml.Stream(this.xml_);
  this.pilot_ = new xrx.xml.Pilot(this.xml_);
};



xrx.mvc.Instance.prototype.mvcRecalculate = function() {};



/**
 * @override
 */
xrx.mvc.Instance.prototype.setData = function(xml) {
  this.getSrcUri() ? this.getDataRemote(xml) : this.getDataInline();
};



/**
 * @return {!string} The XML instance as string.
 */
xrx.mvc.Instance.prototype.xml = function(xml) {
  if (xml) this.xml_ = xml;
  if (!this.xml_) this.setData();
  return this.xml_;
};



/**
 * @return {xrx.xml.Stream} The stream.
 */
xrx.mvc.Instance.prototype.getStream = function() {
  return this.stream_;
};



/**
 * @return {xrx.xml.Pilot} The pilot.
 */
xrx.mvc.Instance.prototype.getPilot = function() {
  return this.pilot_;
};



/**
 * @return {!xrx.node.Document} The XML instance as node.
 */
xrx.mvc.Instance.prototype.getDocument = function(id) {
  return this.document_;
};



/**
 * @return {!xrx.index}
 */
xrx.mvc.Instance.prototype.getIndex = function() {
  if (!this.xml_) this.setData();
  if (this.index_ === undefined) this.index_ = new xrx.index.Index(this.xml_);
  return this.index_;
};
