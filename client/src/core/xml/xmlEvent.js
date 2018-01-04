/**
 * @fileoverview A class interface for XML events.
 */

goog.provide('xrx.xml.Event');



/**
 * A class interface for XML events.
 */
xrx.xml.Event = function() {

  /**
   * Feature flags
   * @type {Object}
   * @private
   */
  this.features_ = {  
    'ATTRIBUTE': false,
    'ATTR_NAME': false,
    'ATTR_VALUE': false,
    'NAMESPACE': false,
    'NS_PREFIX': false,
    'NS_URI': false,
    'TAG_NAME': false,
    'XML_DECL': false
  }

  /**
   * Whether at least one feature is on.
   * @private
   */
  this.oneFeatureOn_ = false;
};



/**
 * Function to turn events on and off.
 * @param {!string} feature The name of the feature.
 * @param {!boolean} opt_flag On or off.
 */
xrx.xml.Event.prototype.setFeature = function(feature, opt_flag) {
  if (this.features_[feature] === undefined) throw Error('Unknown feature.');
  var on = false;
  this.features_[feature] = opt_flag || true;
  for(var f in this.features_) {
    if (this.features_[f] === true) on = true;
  };
  this.oneFeatureOn_ = on;
};



/**
 * Convenience function to turn all events on or off.
 * @param {!boolean} flag On or off.
 */
xrx.xml.Event.prototype.setFeatures = function(flag) {
  
  for(var f in this.features_) {
    this.features_[f] = flag;
  }
  flag === true ? this.oneFeatureOn_ = true :
    this.oneFeatureOn_ = false;
};



/**
 * Whether a specific feature is turned on or off.
 * @param {!string} feature The feature to test.
 * @return {!boolean} True when on otherwise false.
 */
xrx.xml.Event.prototype.hasFeature = function(feature) {
  return this.features_[feature] === true;
};




/**
 * Event, thrown whenever a start-tag row is found.
 */
xrx.xml.Event.prototype.rowStartTag = goog.abstractMethod;



/**
 * Event, thrown whenever an end-tag row is found.
 */
xrx.xml.Event.prototype.rowEndTag = goog.abstractMethod;



/**
 * Event, thrown whenever an empty-tag row is found.
 */
xrx.xml.Event.prototype.rowEmptyTag = goog.abstractMethod;



/**
 * Event, thrown whenever a comment row is found.
 */
xrx.xml.Event.prototype.rowComment = goog.abstractMethod;



/**
 * Event, thrown whenever a processing instruction row is found.
 */
xrx.xml.Event.prototype.rowPI = goog.abstractMethod;



/**
 * Event, thrown whenever a CDATA row is found.
 */
xrx.xml.Event.prototype.rowCDATA = goog.abstractMethod;



/**
 * Event, thrown whenever a tag-name is found.
 */
xrx.xml.Event.prototype.eventTagName = goog.abstractMethod;



/**
 * Event, thrown whenever a attribute token is found.
 */
xrx.xml.Event.prototype.eventAttribute = goog.abstractMethod;



/**
 * Event, thrown whenever a attribute name is found.
 */
xrx.xml.Event.prototype.eventAttrName = goog.abstractMethod;



/**
 * Event, thrown whenever a attribute value is found.
 */
xrx.xml.Event.prototype.eventAttrValue = goog.abstractMethod;



/**
 * Event, thrown whenever a namespace token is found.
 */
xrx.xml.Event.prototype.eventNamespace = goog.abstractMethod;



/**
 * Event, thrown whenever a namespace prefix is found.
 */
xrx.xml.Event.prototype.eventNsPrefix = goog.abstractMethod;



/**
 * Event, thrown whenever a namespace URI is found.
 */
xrx.xml.Event.prototype.eventNsUri = goog.abstractMethod;



/**
 * Event, thrown when an XML declaration is found.
 */
xrx.xml.Event.prototype.eventXmlDecl = goog.abstractMethod;
