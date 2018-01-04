/**
 * @fileoverview A static class to parse and normalize 
 *     stringified XML instances.
 */

goog.provide('xrx.xml.Parser');



goog.require('goog.string');
goog.require('xrx.xml.Serialize');



/**
 * A static class to parse and normalize stringified XML
 * instances.
 * @constructor
 */
xrx.xml.Parser = function() {

  /**
   * @type {DefaultHandler2}
   * @private
   */
  this.contentHandler_;

  /**
   * @type {XMLReader}
   * @private
   */
  this.saxParser_;

  this.initSax_();
};



/**
 * @private
 */
xrx.xml.Parser.prototype.initSax_ = function() {
  this.contentHandler_ = new DefaultHandler2();
  this.saxParser_ = XMLReaderFactory.createXMLReader();
  this.saxParser_.setHandler(this.contentHandler_);
};



/**
 * Normalize a stringified XML instance. Whitespace and Document
 * Type Declarations (DTD) are removed.
 * @return {string} The normalized XML instance string.
 */
xrx.xml.Parser.prototype.normalize = function(xml) {
  var self = this;
  var idx = -2;
  var namespaces = [];
  var normalized = '';
  var reader;
  var lastToken;

  var completeStartTag = function() {
    if (lastToken === xrx.token.START_TAG) normalized += '>';
  };

  this.contentHandler_.characters = function(ch, start, length) {
    completeStartTag();
    normalized += ch;
    idx = -2;
    lastToken = xrx.token.NOT_TAG;
  };

  this.contentHandler_.comment = function(ch, start, length) {
    completeStartTag();
    normalized += xrx.xml.Serialize.comment(ch);
    idx = -2;
    lastToken = xrx.token.NOT_TAG;
  };

  this.contentHandler_.endCDATA = function() {
    normalized += ']]>';
    idx = -2;
    lastToken = xrx.token.NOT_TAG;
  };

  this.contentHandler_.endDocument = function() {}; // do nothing

  this.contentHandler_.endDTD = function() { // do nothing
    /*
    var str = '';
    reader = self.saxParser_.saxScanner.reader.reader;
    str = reader.s.substring(0, reader.nextIdx - 1);
    str = str.substr(str.indexOf('<!DOCTYPE'));
    normalized += str;
    */
  };

  this.contentHandler_.endElement = function(uri, localName, qName) {
    if (self.saxParser_.saxScanner.reader.reader.nextIdx === idx) {
      normalized += '/>';
      lastToken = xrx.token.EMPTY_TAG;
    } else if (lastToken === xrx.token.START_TAG) {
      normalized += '>' + xrx.xml.Serialize.endTag(qName);
      lastToken = xrx.token.END_TAG;
    } else {
      normalized += xrx.xml.Serialize.endTag(qName);
    }
  };

  this.contentHandler_.endEntity = function() {}; // do nothing

  this.contentHandler_.endPrefixMapping = function(prefix) {}; // do nothing

  this.contentHandler_.ignorableWhitespace = function(ch, start, length) {
    completeStartTag();
    idx = -2;
    lastToken = xrx.token.NOT_TAG;
  };

  this.contentHandler_.processingInstruction = function(target, data) {
    completeStartTag();
    normalized += xrx.xml.Serialize.processingInstruction(target, data);
    idx = -2;
    lastToken = xrx.token.NOT_TAG;
  };

  this.contentHandler_.skippedEntity = function(name) {}; // do nothing

  this.contentHandler_.startCDATA = function() {
    completeStartTag();
    normalized += '<![CDATA[';
    idx = -2;
    lastToken = xrx.token.NOT_TAG;
  };

  this.contentHandler_.startDocument = function() {
    reader = self.saxParser_.saxScanner.reader.reader;
    if (reader.s[0] === '<' &&
        reader.s[1] === '?' &&
        reader.s[2] === 'x' &&
        reader.s[3] === 'm' &&
        reader.s[4] === 'l' &&
        reader.s[5] === ' ') {
      normalized += reader.s.substring(0, reader.s.indexOf('?>') + 2);
    }
  };

  this.contentHandler_.startDTD = function(name, publicId, systemId) {}; // do nothing

  this.contentHandler_.startElement = function(uri, localName, qName, atts) {
    var n = "";
    var a = "";
    var arr = atts.attsArray;

    completeStartTag();

    idx = self.saxParser_.saxScanner.reader.reader.nextIdx;
    for (var i = 0; i < namespaces.length; i++) {
      var prefix = namespaces[i].prefix;
      prefix === '' ? prefix += 'xmlns' : prefix = 'xmlns:' + prefix;
      n += xrx.xml.Serialize.namespace(prefix, namespaces[i].uri);
    };
    namespaces = [];
    for (var i = 0; i < arr.length; i++) {
      a += xrx.xml.Serialize.attribute(arr[i].qName, arr[i].value);
    };

    normalized += xrx.xml.Serialize.startEmptyTag(qName, n, a);
    lastToken = xrx.token.START_TAG;
  };

  this.contentHandler_.startEntity = function() {}; // do nothing

  this.contentHandler_.startPrefixMapping = function(prefix, uri) {
    namespaces.push({ prefix: prefix, uri: uri });
  };

  this.saxParser_.parseString(xml);

  return normalized;
};
