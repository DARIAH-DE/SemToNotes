/**
 * @fileoverview A class to create long-lived binary
 *     encodings for XML instances. 
 */


goog.provide('xrx.index.Index');
goog.provide('xrx.index.Namespace');



goog.require('goog.array');
goog.require('xrx.index.Structural');
goog.require('xrx.token');
goog.require('xrx.xml.Traverse');



/**
 * A class to create long-lived binary encodings for XML instances.
 * 
 * @param {string} The XML string to be indexed.
 * @constructor
 */
xrx.index.Index = function(xml) {

  /**
   * Structural Index.
   * @type {goog.structs.Trie}
   */
  this.structural_ = new xrx.index.Structural();

  /**
   * Indexed namespace table.
   * @type {Array<xrx.index.Namespace>}
   */
  this.tNamespace_ = [];

  // build the index
  this.build(xml);
};



/**
 * Returns the structural index.
 * @return {goog.structs.Trie}
 */
xrx.index.Index.prototype.getStructuralIndex = function() {
  return this.structural_;
};



/**
 * A namespace object. Namespace tokens as the only XML tokens
 * are statically extracted during index building.
 *
 * @param {xrx.xml.Label} opt_label The label of the namespace token.
 * @param {string} opt_prefix The namespace prefix.
 * @param {string} opt_uri The namespace URI.
 */
xrx.index.Namespace = function(opt_label, opt_prefix, opt_uri) {



  this.label = opt_label;



  this.parentLabel;



  this.prefix = opt_prefix;



  this.uri = opt_uri;
};



/**
 * @return {xrx.index.Namespace|undefined}
 */
xrx.index.Index.prototype.getNamespace = function(label, prefix) {
  return goog.array.findRight(this.tNamespace_, function(ns, ind, arr) {
    return ns.prefix === prefix && (label.sameAs(ns.parentLabel) ||
        label.isDescendantOf(ns.parentLabel));
  });
};



/**
 * @return {string|undefined}
 */
xrx.index.Index.prototype.getNamespaceUri = function(label, prefix) {
  var namespace = goog.array.findRight(this.tNamespace_, function(ns, ind, arr) {
    return ns.prefix === prefix && (label.sameAs(ns.parentLabel) ||
        label.isDescendantOf(ns.parentLabel));
  });
  return namespace ? namespace.uri : undefined;
};



/**
 * @return {string|undefined}
 */
xrx.index.Index.prototype.getNamespacePrefix = function(label, uri) {
  var namespace = goog.array.findRight(this.tNamespace_, function(ns, ind, arr) {
    return ns.uri === uri && (label.sameAs(ns.parentLabel) ||
        label.isDescendantOf(ns.parentLabel));
  });
  return namespace ? namespace.prefix : undefined;
};



/**
 * Rebuilds the index
 */
xrx.index.Index.prototype.rebuild = function(xml) {
  this.structural_ = null;
  this.structural_ = new xrx.index.Structural();
  this.tNamespace = [];
  this.build(xml);
};



/**
 * Builds an index from scratch.
 * @param {!string} The XML string.
 */
xrx.index.Index.prototype.build = function(xml) {
  var traverse = new xrx.xml.Traverse(xml);
  var arr;
  var row;
  var index = this;
  var struct = this.structural_;
  var parent;

  traverse.setFeature('NS_PREFIX', true);
  traverse.setFeature('NS_URI', true);

  traverse.rowStartTag = function(label, offset, length1, length2) {
    struct.add(xrx.token.START_TAG, label, offset, length1, length2);
  };

  traverse.rowEmptyTag = function(label, offset, length1, length2) {
    struct.add(xrx.token.EMPTY_TAG, label, offset, length1, length2);
  };

  traverse.rowEndTag = function(label, offset, length1, length2) {
    struct.add(xrx.token.END_TAG, label, offset, length1, length2);
  };

  traverse.eventNsPrefix = function(label, offset, length) {
    var pref = xml.substr(offset, length);
    var prefix;
    if (pref === 'xmlns') {
      prefix = pref;
    } else {
      prefix = pref.substr('xmlns:'.length);
    };
    var ns = new xrx.index.Namespace(label.clone(), prefix);
    var parent = label.clone();
    parent.parent();
    ns.parentLabel = parent;
    index.tNamespace_.push(ns);
  };

  traverse.eventNsUri = function(label, offset, length) {
    index.tNamespace_[index.tNamespace_.length - 1].uri = xml.substr(offset, length);
  };

  traverse.forward();
};
