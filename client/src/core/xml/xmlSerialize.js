/**
 * @fileoverview A static class providing functions for XML token
 *     serialization.
 */

goog.provide('xrx.xml.Serialize');



goog.require('xrx.token');
goog.require('xrx.xml.Traverse');



/**
 * A static class providing functions for XML token
 * serialization.
 */
xrx.xml.Serialize = function() {};



/**
 * Serialize an attribute token.
 * @return {string} The attribute token string.
 */
xrx.xml.Serialize.attribute = function(qName, value) {
  return ' ' + qName + '="' + value.replace(/\"/g, "'") + '"';
};



/**
 * Serialize an attribute token with namespace.
 * @return {string} The attribute token string.
 */
xrx.xml.Serialize.attributeNs = function(nsPrefix, qName, namespaceUri) {
  if (nsPrefix === undefined || nsPrefix === "xmlns") {
    return xrx.xml.Serialize.namespace('xmlns:' + qName.split(':')[0], namespaceUri) +
        xrx.xml.Serialize.attribute(qName, '');
  } else {
    return xrx.xml.Serialize.attribute(qName, '');
  }
};



/**
 * Serialize a comment token.
 * @return {string} The comment token string.
 */
xrx.xml.Serialize.comment = function(ch) {
  return '<!--' + ch + '-->';
};



/**
 * Serialize an empty-tag token.
 * @return {string} The empty-tag token string.
 */
xrx.xml.Serialize.emptyTag = function(qName, opt_namespaces, opt_attributes) {
  var namespaces = opt_namespaces || '';
  var attributes = opt_attributes || '';
  return '<' + qName + namespaces + attributes + '/>';
};



/**
 * Serialize an empty-tag token with namespace.
 * @return {string} The empty-tag token string.
 */
xrx.xml.Serialize.emptyTagNs = function(nsPrefix, localName, namespaceUri) {
  return xrx.xml.Serialize.tagNs_(xrx.xml.Serialize.emptyTag, nsPrefix, localName,
      namespaceUri);
};



/**
 * Serialize an end-tag token.
 * @return {string} The end-tag token string.
 */
xrx.xml.Serialize.endTag = function(qName) {
  return '</' + qName + '>';
};



/**
 * Serialize an end-tag token with namespace.
 * @return {string} The end-tag token string.
 */
xrx.xml.Serialize.endTagNs = function(nsPrefix, localName, namespaceUri) {
  if (nsPrefix === undefined || nsPrefix === 'xmlns') {
    return xrx.xml.Serialize.endTag(localName);
  } else {
    var colonIndex = nsPrefix.indexOf(':');
    return xrx.xml.Serialize.endTag(nsPrefix.substr(colonIndex + 1) + ':' + localName);
  }
};



/**
 * Serialize a namespace token.
 * @return {string} The namespace token string.
 */
xrx.xml.Serialize.namespace = function(prefix, uri) {
  return ' ' + prefix + '="' + uri + '"';
};



/**
 * Serialize a processing instruction token.
 * @return {string} The processing instruction token as string.
 */
xrx.xml.Serialize.processingInstruction = function(target, data) {
  return '<?' + target + ' ' + data + '?>';
};



/**
 * Serialize a start-empty-tag token.
 * @return {string} The start-empty-tag token string.
 */
xrx.xml.Serialize.startEmptyTag = function(qName, opt_namespaces, opt_attributes) {
  var namespaces = opt_namespaces || '';
  var attributes = opt_attributes || '';
  return '<' + qName + namespaces + attributes;
};



/**
 * Serialize a start-empty-tag token with namespace.
 * @return {string} The start-empty-tag token string.
 */
xrx.xml.Serialize.startEmptyTagNs = function(nsPrefix, localName, namespaceUri) {
  return xrx.xml.Serialize.tagNs_(xrx.xml.Serialize.startEmptyTag, nsPrefix, localName,
      namespaceUri);
};




/**
 * Serialize a start-tag token.
 * @return {string} The start-tag token string.
 */
xrx.xml.Serialize.startTag = function(qName, opt_namespaces, opt_attributes) {
  var namespaces = opt_namespaces || '';
  var attributes = opt_attributes || '';
  return '<' + qName + namespaces + attributes + '>';
};



/**
 * Serialize a start-tag token with namespace.
 * @return {string} The start-tag token string.
 */
xrx.xml.Serialize.startTagNs = function(nsPrefix, localName, namespaceUri) {
  return xrx.xml.Serialize.tagNs_(xrx.xml.Serialize.startTag, nsPrefix, localName,
      namespaceUri);
};



/**
 * Shared function for tag serialization.
 * @private
 * @return {string} The tag string.
 */
xrx.xml.Serialize.tagNs_ = function(func, nsPrefix, localName, namespaceUri) {
  if (nsPrefix === undefined) {
    return func(localName, xrx.xml.Serialize.namespace('xmlns',
        namespaceUri));
  } else if (nsPrefix === 'xmlns') {
    return func(localName);
  } else {
    var colonIndex = nsPrefix.indexOf(':');
    return func(nsPrefix.substr(colonIndex + 1) + ':' + localName);
  }
};
