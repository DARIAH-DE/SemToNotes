/**
 * @fileoverview Class implements different data instance components for 
 *     the model-view-controller.
 */

goog.provide('xrx.mvc.Instance');
goog.provide('xrx.mvc.InstanceGithub');
goog.provide('xrx.mvc.InstanceRest');


goog.require('goog.dom.DomHelper');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.json');
goog.require('goog.net.XhrIo');
goog.require('goog.string');
goog.require('goog.Uri');
goog.require('xrx.index.Index');
goog.require('xrx.mvc.ComponentModel');
goog.require('xrx.mvc.Uidl');
goog.require('xrx.node.Nodes');
goog.require('xrx.xml.Parser');
goog.require('xrx.xml.Stream');
goog.require('xrx.xml.Pilot');
goog.require('xrx.xml.Indent');



/**
 * @constructor
 */
xrx.mvc.Instance = function(element) {

  this.xml_;

  this.stream_;

  this.pilot_;

  goog.base(this, element);

  this.document_ = new xrx.node.DocumentB(this.getId());;
};
goog.inherits(xrx.mvc.Instance, xrx.mvc.ComponentModel);



/**
 * @override
 */
xrx.mvc.Instance.prototype.createDom = function() {};



/**
 *
 */
xrx.mvc.Instance.prototype.suidl = {
  'tagName': 'span',
  'className': 'xrx-instance',
  'dataset': {'src': undefined, 'xrxResource': undefined},
  'text': true,
  'choice': [[['dataset']['src']], [['dataset']['xrxResource']],
      [['text']]]
};



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
  this.dispatch('xrx-event-instance-update');
};



/**
 * 
 */
xrx.mvc.Instance.prototype.getDataInline = function() {
  var parse = new xrx.xml.Parser();
  var wrapper = goog.dom.getElementByClass('xrx-document', this.element_);
  var child = goog.dom.getChildren(wrapper)[0];
  if (child) {
  var stringifiedHtml = goog.dom.getOuterHtml(child);
    this.xml_ = parse.normalize(stringifiedHtml);
  } else {
    this.xml_ = parse.normalize(goog.dom.getTextContent(wrapper));
  }
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
  if (this.getResourceUri()) {
    this.getDataRemote(xml)
  } else if (goog.dom.getElementByClass('xrx-document', this.element_)) {
    this.getDataInline();
  } else {
    console.error(this.element_);
    throw Error('Ressource attribute or child element .xrx-document expected.');
  }
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



/**
 * Creates a new instance using a REST client.
 * @constructor
 */
xrx.mvc.InstanceRest = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.InstanceRest, xrx.mvc.Instance);



xrx.mvc.InstanceRest.prototype.createDom = function() {};



/**
 * Creates a new instance using a GitHub client.
 * @constructor
 */
xrx.mvc.InstanceGithub = function(element) {

  this.sha_;

  goog.base(this, element);
};
goog.inherits(xrx.mvc.InstanceGithub, xrx.mvc.Instance);



xrx.mvc.InstanceGithub.prototype.createDom = function() {};



xrx.mvc.InstanceGithub.prototype.setSha = function(sha) {
  this.sha_ = sha;
};



xrx.mvc.InstanceGithub.prototype.save = function() {
  var self = this;
  var srcUri = this.getResourceUri()
  var xhr = new goog.net.XhrIo();
  var creds = goog.crypt.base64.encodeString('');
  xhr.headers.set('Authorization', 'Basic ' + creds);

  var successHandler = function(e) {
    self.sha_ = e.target.getResponseJson().content.sha;
  };

  goog.events.listen(
    xhr,
    goog.net.EventType.SUCCESS,
    successHandler
  );

  var responseBody = {
    'path': srcUri,
    'message': 'SKOS test data updated.',
    'content': goog.crypt.base64.encodeString(goog.string.decodeUrl(xrx.xml.Indent.forward(self.xml_, 2))),
    'sha': self.sha_,
    'branch': 'master'
  };

  xhr.send(srcUri, 'PUT', goog.json.serialize(responseBody));
};
