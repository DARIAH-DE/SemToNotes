/**
 * @fileoverview A static class providing constants for
 *   the token classes.
 */

goog.provide('xrx.token');



/**
 * Static token class. If included, all available tokens are
 * included at once.
 */
xrx.token = function() {};



/**
 * Primary tokens
 */
/** @const */ xrx.token.START_TAG = 7;
/** @const */ xrx.token.EMPTY_TAG = 8;
/** @const */ xrx.token.COMMENT = 9;
/** @const */ xrx.token.PI = 10;
/** @const */ xrx.token.END_TAG = 11;
/** @const */ xrx.token.NOT_TAG = 13;
/** @const */ xrx.token.CDATA = 14;



/**
 * Secondary tokens (part of a tag)
 */
/** @const */ xrx.token.TAG_NAME = 5;
/** @const */ xrx.token.ATTRIBUTE = 1;
/** @const */ xrx.token.ATTR_NAME = 2;
/** @const */ xrx.token.ATTR_VALUE = 3;
/** @const */ xrx.token.NAMESPACE = 4;
/** @const */ xrx.token.NS_PREFIX = 5;
/** @const */ xrx.token.NS_URI = 6;



/**
 * Generic tokens
 */
/** @const */ xrx.token.UNDEFINED = -1;

// either xrx.token.START_TAG or xrx.token.EMPTY_TAG
/** @const */ xrx.token.START_EMPTY_TAG = 12;

// either xrx.token.END_TAG or xrx.token.START_EMPTY_TAG
/** @const */ xrx.token.TAG = 15;



/**
 * Complex tokens
 */
// A selection of sequenced tokens of 
// different type forming a peace of 
// well-formed XML. Corresponds to what 
// a DOM element is.
/** @const */ xrx.token.FRAGMENT = 16;

// xrx.token.START_TAG plus xrx.token.END_TAG
/** @const */ xrx.token.START_END = 17;

// same as xrx.token.FRAGMENT, but may 
// start and end with xrx.token.NOT_TAG 
// or even may end or start with a part 
// of xrx.token.NOT_TAG
/** @const */ xrx.token.MIXED = 18;

// numbering of tokens is important to 
// compute document order!
