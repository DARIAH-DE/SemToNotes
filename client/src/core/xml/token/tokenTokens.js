/**
 * @fileoverview Utility class to include all tokens at once.
 */

goog.provide('xrx.token.Tokens');



goog.require('xrx.token');
goog.require('xrx.token.Attribute');
goog.require('xrx.token.AttrName');
goog.require('xrx.token.AttrValue');
goog.require('xrx.token.EmptyTag');
goog.require('xrx.token.EndTag');
goog.require('xrx.token.Fragment');
goog.require('xrx.token.Mixed');
goog.require('xrx.token.Namespace');
goog.require('xrx.token.NotTag');
goog.require('xrx.token.NsPrefix');
goog.require('xrx.token.NsUri');
goog.require('xrx.token.Root');
goog.require('xrx.token.StartEmptyTag');
goog.require('xrx.token.StartTag');
goog.require('xrx.token.Tag');
goog.require('xrx.token.TagName');



/**
 * Converts a generic token into its native form.
 *
 * @param {!xrx.token} token The token to convert.
 * @return {?}
 */
xrx.token.Tokens.getNative = function(token) {
  var newToken;
  var label = token.label().clone();
  var offset = token.offset();
  var length = token.length();
  
  var convert = function(constr) {
    var tmp = new constr();
    tmp.label(label);
    tmp.offset(offset);
    tmp.length(length);
    return tmp;
  };
  
  switch(token.type()) {
  case xrx.token.START_TAG:
    newToken = convert(xrx.token.StartTag);
    break;
  case xrx.token.END_TAG:
    newToken = convert(xrx.token.EndTag);
    break;
  case xrx.token.EMPTY_TAG:
    newToken = convert(xrx.token.EmptyTag);
    break;
  case xrx.token.NOT_TAG:
    newToken = convert(xrx.token.NotTag);
    break;
  case xrx.token.TAG_NAME:
    newToken = convert(xrx.token.TagName);
    break;
  case xrx.token.ATTRIBUE:
    newToken = convert(xrx.token.Attribute);
    break;
  case xrx.token.ATTR_NAME:
    newToken = convert(xrx.token.AttrName);
    break;
  case xrx.token.ATTR_VALUE:
    newToken = convert(xrx.token.AttrValue);
    break;
  default:
    throw Error('Token is generic or unknown.');
    break;  
  };
  
  return newToken;
};
