***REMOVED***
***REMOVED*** @fileoverview Class represents a generic token called
***REMOVED*** start-empty-tag.
***REMOVED***

goog.provide('xrx.token.StartEmptyTag');



goog.require('xrx.token');
goog.require('xrx.token.Abstract');



***REMOVED***
***REMOVED*** Constructs a new start-empty-tag token. xrx.token.StartEmptyTag
***REMOVED*** is a generic token which stands for either the start-tag or the
***REMOVED*** empty-tag token. This is especially useful to evaluate Path
***REMOVED*** expressions which do not distinguish between start and empty tags.
***REMOVED*** 
***REMOVED***
***REMOVED*** @extends xrx.token
***REMOVED***
xrx.token.StartEmptyTag = function(label, opt_offset, opt_length) {
  goog.base(this, xrx.token.START_EMPTY_TAG, label, opt_offset, opt_length);
***REMOVED***
goog.inherits(xrx.token.StartEmptyTag, xrx.token.Abstract);



***REMOVED***
***REMOVED*** Compares the generic type of two tokens.
***REMOVED***
***REMOVED*** @param {!number} type The type to check against.
***REMOVED*** @return {!boolean}
***REMOVED***
xrx.token.StartEmptyTag.prototype.typeOf = function(type) {
  return this.type_ === type || xrx.token.START_TAG === type || 
      xrx.token.EMPTY_TAG === type || xrx.token.TAG === type;
***REMOVED***
