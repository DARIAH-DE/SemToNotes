/**
 * @fileoverview XRX utility functions.
 * @private
 */

goog.provide('xrx.Util');



goog.require('goog.math');


/**
 * @constructor
 * @private
 */
xrx.Util = function() {};



xrx.Util.createUUID = function() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c==='x' ? r : (r&0x7|0x8)).toString(16);
 });
 return uuid;
};
