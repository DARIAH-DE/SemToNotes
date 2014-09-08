// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

***REMOVED***
***REMOVED*** @fileoverview Loads a list of URIs in bulk. All requests must be a success
***REMOVED*** in order for the load to be considered a success.
***REMOVED***
***REMOVED***

goog.provide('goog.net.BulkLoader');

goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('goog.log');
goog.require('goog.net.BulkLoaderHelper');
goog.require('goog.net.EventType');
***REMOVED***



***REMOVED***
***REMOVED*** Class used to load multiple URIs.
***REMOVED*** @param {Array.<string|goog.Uri>} uris The URIs to load.
***REMOVED***
***REMOVED*** @extends {goog.events.EventTarget}
***REMOVED*** @final
***REMOVED***
goog.net.BulkLoader = function(uris) {
  goog.events.EventTarget.call(this);

 ***REMOVED*****REMOVED***
  ***REMOVED*** The bulk loader helper.
  ***REMOVED*** @type {goog.net.BulkLoaderHelper}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.helper_ = new goog.net.BulkLoaderHelper(uris);

 ***REMOVED*****REMOVED***
  ***REMOVED*** The handler for managing events.
  ***REMOVED*** @type {goog.events.EventHandler.<!goog.net.BulkLoader>}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.eventHandler_ = new goog.events.EventHandler(this);
***REMOVED***
goog.inherits(goog.net.BulkLoader, goog.events.EventTarget);


***REMOVED***
***REMOVED*** A logger.
***REMOVED*** @type {goog.log.Logger}
***REMOVED*** @private
***REMOVED***
goog.net.BulkLoader.prototype.logger_ =
    goog.log.getLogger('goog.net.BulkLoader');


***REMOVED***
***REMOVED*** Gets the response texts, in order.
***REMOVED*** @return {Array.<string>} The response texts.
***REMOVED***
goog.net.BulkLoader.prototype.getResponseTexts = function() {
  return this.helper_.getResponseTexts();
***REMOVED***


***REMOVED***
***REMOVED*** Gets the request Uris.
***REMOVED*** @return {Array.<string>} The request URIs, in order.
***REMOVED***
goog.net.BulkLoader.prototype.getRequestUris = function() {
  return this.helper_.getUris();
***REMOVED***


***REMOVED***
***REMOVED*** Starts the process of loading the URIs.
***REMOVED***
goog.net.BulkLoader.prototype.load = function() {
  var eventHandler = this.eventHandler_;
  var uris = this.helper_.getUris();
  goog.log.info(this.logger_,
      'Starting load of code with ' + uris.length + ' uris.');

  for (var i = 0; i < uris.length; i++) {
    var xhrIo = new goog.net.XhrIo();
    eventHandler.listen(xhrIo,
        goog.net.EventType.COMPLETE,
        goog.bind(this.handleEvent_, this, i));

    xhrIo.send(uris[i]);
  }
***REMOVED***


***REMOVED***
***REMOVED*** Handles all events fired by the XhrManager.
***REMOVED*** @param {number} id The id of the request.
***REMOVED*** @param {goog.events.Event} e The event.
***REMOVED*** @private
***REMOVED***
goog.net.BulkLoader.prototype.handleEvent_ = function(id, e) {
  goog.log.info(this.logger_, 'Received event "' + e.type + '" for id ' + id +
      ' with uri ' + this.helper_.getUri(id));
  var xhrIo =***REMOVED*****REMOVED*** @type {goog.net.XhrIo}***REMOVED*** (e.target);
  if (xhrIo.isSuccess()) {
    this.handleSuccess_(id, xhrIo);
  } else {
    this.handleError_(id, xhrIo);
  }
***REMOVED***


***REMOVED***
***REMOVED*** Handles when a request is successful (i.e., completed and response received).
***REMOVED*** Stores thhe responseText and checks if loading is complete.
***REMOVED*** @param {number} id The id of the request.
***REMOVED*** @param {goog.net.XhrIo} xhrIo The XhrIo objects that was used.
***REMOVED*** @private
***REMOVED***
goog.net.BulkLoader.prototype.handleSuccess_ = function(
    id, xhrIo) {
  // Save the response text.
  this.helper_.setResponseText(id, xhrIo.getResponseText());

  // Check if all response texts have been received.
  if (this.helper_.isLoadComplete()) {
    this.finishLoad_();
  }
  xhrIo.dispose();
***REMOVED***


***REMOVED***
***REMOVED*** Handles when a request has ended in error (i.e., all retries completed and
***REMOVED*** none were successful). Cancels loading of the URI's.
***REMOVED*** @param {number|string} id The id of the request.
***REMOVED*** @param {goog.net.XhrIo} xhrIo The XhrIo objects that was used.
***REMOVED*** @private
***REMOVED***
goog.net.BulkLoader.prototype.handleError_ = function(
    id, xhrIo) {
  // TODO(user): Abort all pending requests.

  // Dispatch the ERROR event.
  this.dispatchEvent(goog.net.EventType.ERROR);
  xhrIo.dispose();
***REMOVED***


***REMOVED***
***REMOVED*** Finishes the load of the URI's. Dispatches the SUCCESS event.
***REMOVED*** @private
***REMOVED***
goog.net.BulkLoader.prototype.finishLoad_ = function() {
  goog.log.info(this.logger_, 'All uris loaded.');

  // Dispatch the SUCCESS event.
  this.dispatchEvent(goog.net.EventType.SUCCESS);
***REMOVED***


***REMOVED*** @override***REMOVED***
goog.net.BulkLoader.prototype.disposeInternal = function() {
  goog.net.BulkLoader.superClass_.disposeInternal.call(this);

  this.eventHandler_.dispose();
  this.eventHandler_ = null;

  this.helper_.dispose();
  this.helper_ = null;
***REMOVED***
