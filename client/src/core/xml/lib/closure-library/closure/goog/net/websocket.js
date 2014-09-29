// Copyright 2011 The Closure Library Authors. All Rights Reserved.
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
***REMOVED*** @fileoverview Definition of the WebSocket class.  A WebSocket provides a
***REMOVED*** bi-directional, full-duplex communications channel, over a single TCP socket.
***REMOVED***
***REMOVED*** See http://dev.w3.org/html5/websockets/
***REMOVED*** for the full HTML5 WebSocket API.
***REMOVED***
***REMOVED*** Typical usage will look like this:
***REMOVED***
***REMOVED***  var ws = new goog.net.WebSocket();
***REMOVED***
***REMOVED***  var handler = new goog.events.EventHandler();
***REMOVED***  handler.listen(ws, goog.net.WebSocket.EventType.OPENED, onOpen);
***REMOVED***  handler.listen(ws, goog.net.WebSocket.EventType.MESSAGE, onMessage);
***REMOVED***
***REMOVED***  try {
***REMOVED***    ws.open('ws://127.0.0.1:4200');
***REMOVED***  } catch (e) {
***REMOVED***    ...
***REMOVED***  }
***REMOVED***
***REMOVED***

goog.provide('goog.net.WebSocket');
goog.provide('goog.net.WebSocket.ErrorEvent');
goog.provide('goog.net.WebSocket.EventType');
goog.provide('goog.net.WebSocket.MessageEvent');

goog.require('goog.Timer');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.debug.entryPointRegistry');
***REMOVED***
goog.require('goog.events.Event');
goog.require('goog.events.EventTarget');



***REMOVED***
***REMOVED*** Class encapsulating the logic for using a WebSocket.
***REMOVED***
***REMOVED*** @param {boolean=} opt_autoReconnect True if the web socket should
***REMOVED***     automatically reconnect or not.  This is true by default.
***REMOVED*** @param {function(number):number=} opt_getNextReconnect A function for
***REMOVED***     obtaining the time until the next reconnect attempt. Given the reconnect
***REMOVED***     attempt count (which is a positive integer), the function should return a
***REMOVED***     positive integer representing the milliseconds to the next reconnect
***REMOVED***     attempt.  The default function used is an exponential back-off. Note that
***REMOVED***     this function is never called if auto reconnect is disabled.
***REMOVED***
***REMOVED*** @extends {goog.events.EventTarget}
***REMOVED***
goog.net.WebSocket = function(opt_autoReconnect, opt_getNextReconnect) {
  goog.base(this);

 ***REMOVED*****REMOVED***
  ***REMOVED*** True if the web socket should automatically reconnect or not.
  ***REMOVED*** @type {boolean}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.autoReconnect_ = goog.isDef(opt_autoReconnect) ?
      opt_autoReconnect : true;

 ***REMOVED*****REMOVED***
  ***REMOVED*** A function for obtaining the time until the next reconnect attempt.
  ***REMOVED*** Given the reconnect attempt count (which is a positive integer), the
  ***REMOVED*** function should return a positive integer representing the milliseconds to
  ***REMOVED*** the next reconnect attempt.
  ***REMOVED*** @type {function(number):number}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.getNextReconnect_ = opt_getNextReconnect ||
      goog.net.WebSocket.EXPONENTIAL_BACKOFF_;

 ***REMOVED*****REMOVED***
  ***REMOVED*** The time, in milliseconds, that must elapse before the next attempt to
  ***REMOVED*** reconnect.
  ***REMOVED*** @type {number}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.nextReconnect_ = this.getNextReconnect_(this.reconnectAttempt_);
***REMOVED***
goog.inherits(goog.net.WebSocket, goog.events.EventTarget);


***REMOVED***
***REMOVED*** The actual web socket that will be used to send/receive messages.
***REMOVED*** @type {WebSocket}
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.webSocket_ = null;


***REMOVED***
***REMOVED*** The URL to which the web socket will connect.
***REMOVED*** @type {?string}
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.url_ = null;


***REMOVED***
***REMOVED*** The subprotocol name used when establishing the web socket connection.
***REMOVED*** @type {string|undefined}
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.protocol_ = undefined;


***REMOVED***
***REMOVED*** True if a call to the close callback is expected or not.
***REMOVED*** @type {boolean}
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.closeExpected_ = false;


***REMOVED***
***REMOVED*** Keeps track of the number of reconnect attempts made since the last
***REMOVED*** successful connection.
***REMOVED*** @type {number}
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.reconnectAttempt_ = 0;


***REMOVED***
***REMOVED*** The logger for this class.
***REMOVED*** @type {goog.debug.Logger}
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.logger_ = goog.debug.Logger.getLogger(
    'goog.net.WebSocket');


***REMOVED***
***REMOVED*** The events fired by the web socket.
***REMOVED*** @enum {string} The event types for the web socket.
***REMOVED***
goog.net.WebSocket.EventType = {

 ***REMOVED*****REMOVED***
  ***REMOVED*** Fired when an attempt to open the WebSocket fails or there is a connection
  ***REMOVED*** failure after a successful connection has been established.
 ***REMOVED*****REMOVED***
  CLOSED: goog.events.getUniqueId('closed'),

 ***REMOVED*****REMOVED***
  ***REMOVED*** Fired when the WebSocket encounters an error.
 ***REMOVED*****REMOVED***
  ERROR: goog.events.getUniqueId('error'),

 ***REMOVED*****REMOVED***
  ***REMOVED*** Fired when a new message arrives from the WebSocket.
 ***REMOVED*****REMOVED***
  MESSAGE: goog.events.getUniqueId('message'),

 ***REMOVED*****REMOVED***
  ***REMOVED*** Fired when the WebSocket connection has been established.
 ***REMOVED*****REMOVED***
  OPENED: goog.events.getUniqueId('opened')
***REMOVED***


***REMOVED***
***REMOVED*** The various states of the web socket.
***REMOVED*** @enum {number} The states of the web socket.
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.ReadyState_ = {
  // This is the initial state during construction.
  CONNECTING: 0,
  // This is when the socket is actually open and ready for data.
  OPEN: 1,
  // This is when the socket is in the middle of a close handshake.
  // Note that this is a valid state even if the OPEN state was never achieved.
  CLOSING: 2,
  // This is when the socket is actually closed.
  CLOSED: 3
***REMOVED***


***REMOVED***
***REMOVED*** The maximum amount of time between reconnect attempts for the exponential
***REMOVED*** back-off in milliseconds.
***REMOVED*** @type {number}
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.EXPONENTIAL_BACKOFF_CEILING_ = 60***REMOVED*** 1000;


***REMOVED***
***REMOVED*** Computes the next reconnect time given the number of reconnect attempts since
***REMOVED*** the last successful connection.
***REMOVED***
***REMOVED*** @param {number} attempt The number of reconnect attempts since the last
***REMOVED***     connection.
***REMOVED*** @return {number} The time, in milliseconds, until the next reconnect attempt.
***REMOVED*** @const
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.EXPONENTIAL_BACKOFF_ = function(attempt) {
  var time = Math.pow(2, attempt)***REMOVED*** 1000;
  return Math.min(time, goog.net.WebSocket.EXPONENTIAL_BACKOFF_CEILING_);
***REMOVED***


***REMOVED***
***REMOVED*** Installs exception protection for all entry points introduced by
***REMOVED*** goog.net.WebSocket instances which are not protected by
***REMOVED*** {@link goog.debug.ErrorHandler#protectWindowSetTimeout},
***REMOVED*** {@link goog.debug.ErrorHandler#protectWindowSetInterval}, or
***REMOVED*** {@link goog.events.protectBrowserEventEntryPoint}.
***REMOVED***
***REMOVED*** @param {!goog.debug.ErrorHandler} errorHandler Error handler with which to
***REMOVED***     protect the entry points.
***REMOVED***
goog.net.WebSocket.protectEntryPoints = function(errorHandler) {
  goog.net.WebSocket.prototype.onOpen_ = errorHandler.protectEntryPoint(
      goog.net.WebSocket.prototype.onOpen_);
  goog.net.WebSocket.prototype.onClose_ = errorHandler.protectEntryPoint(
      goog.net.WebSocket.prototype.onClose_);
  goog.net.WebSocket.prototype.onMessage_ = errorHandler.protectEntryPoint(
      goog.net.WebSocket.prototype.onMessage_);
  goog.net.WebSocket.prototype.onError_ = errorHandler.protectEntryPoint(
      goog.net.WebSocket.prototype.onError_);
***REMOVED***


***REMOVED***
***REMOVED*** Creates and opens the actual WebSocket.  Only call this after attaching the
***REMOVED*** appropriate listeners to this object.  If listeners aren't registered, then
***REMOVED*** the {@code goog.net.WebSocket.EventType.OPENED} event might be missed.
***REMOVED***
***REMOVED*** @param {string} url The URL to which to connect.
***REMOVED*** @param {string=} opt_protocol The subprotocol to use.  The connection will
***REMOVED***     only be established if the server reports that it has selected this
***REMOVED***     subprotocol. The subprotocol name must all be a non-empty ASCII string
***REMOVED***     with no control characters and no spaces in them (i.e. only characters
***REMOVED***     in the range U+0021 to U+007E).
***REMOVED***
goog.net.WebSocket.prototype.open = function(url, opt_protocol) {
  // Sanity check.  This works only in modern browsers.
  goog.asserts.assert(goog.global['WebSocket'],
      'This browser does not support WebSocket');

  // Don't do anything if the web socket is already open.
  goog.asserts.assert(!this.isOpen(), 'The WebSocket is already open');

  // Clear any pending attempts to reconnect.
  this.clearReconnectTimer_();

  // Construct the web socket.
  this.url_ = url;
  this.protocol_ = opt_protocol;

  // This check has to be made otherwise you get protocol mismatch exceptions
  // for passing undefined, null, '', or [].
  if (this.protocol_) {
    this.logger_.info('Opening the WebSocket on ' + this.url_ +
        ' with protocol ' + this.protocol_);
    this.webSocket_ = new WebSocket(this.url_, this.protocol_);
  } else {
    this.logger_.info('Opening the WebSocket on ' + this.url_);
    this.webSocket_ = new WebSocket(this.url_);
  }

  // Register the event handlers.  Note that it is not possible for these
  // callbacks to be missed because it is registered after the web socket is
  // instantiated.  Because of the synchronous nature of JavaScript, this code
  // will execute before the browser creates the resource and makes any calls
  // to these callbacks.
  this.webSocket_.onopen = goog.bind(this.onOpen_, this);
  this.webSocket_.onclose = goog.bind(this.onClose_, this);
  this.webSocket_.onmessage = goog.bind(this.onMessage_, this);
  this.webSocket_.onerror = goog.bind(this.onError_, this);
***REMOVED***


***REMOVED***
***REMOVED*** Closes the web socket connection.
***REMOVED***
goog.net.WebSocket.prototype.close = function() {

  // Clear any pending attempts to reconnect.
  this.clearReconnectTimer_();

  // Attempt to close only if the web socket was created.
  if (this.webSocket_) {
    this.logger_.info('Closing the WebSocket.');

    // Close is expected here since it was a direct call.  Close is considered
    // unexpected when opening the connection fails or there is some other form
    // of connection loss after being connected.
    this.closeExpected_ = true;
    this.webSocket_.close();
    this.webSocket_ = null;
  }
***REMOVED***


***REMOVED***
***REMOVED*** Sends the message over the web socket.
***REMOVED***
***REMOVED*** @param {string} message The message to send.
***REMOVED***
goog.net.WebSocket.prototype.send = function(message) {
  // Make sure the socket is ready to go before sending a message.
  goog.asserts.assert(this.isOpen(), 'Cannot send without an open socket');

  // Send the message and let onError_ be called if it fails thereafter.
  this.webSocket_.send(message);
***REMOVED***


***REMOVED***
***REMOVED*** Checks to see if the web socket is open or not.
***REMOVED***
***REMOVED*** @return {boolean} True if the web socket is open, false otherwise.
***REMOVED***
goog.net.WebSocket.prototype.isOpen = function() {
  return !!this.webSocket_ &&
      this.webSocket_.readyState == goog.net.WebSocket.ReadyState_.OPEN;
***REMOVED***


***REMOVED***
***REMOVED*** Called when the web socket has connected.
***REMOVED***
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.onOpen_ = function() {
  this.logger_.info('WebSocket opened on ' + this.url_);
  this.dispatchEvent(goog.net.WebSocket.EventType.OPENED);

  // Set the next reconnect interval.
  this.reconnectAttempt_ = 0;
  this.nextReconnect_ = this.getNextReconnect_(this.reconnectAttempt_);
***REMOVED***


***REMOVED***
***REMOVED*** Called when the web socket has closed.
***REMOVED***
***REMOVED*** @param {!Event} event The close event.
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.onClose_ = function(event) {
  this.logger_.info('The WebSocket on ' + this.url_ + ' closed.');

  // Firing this event allows handlers to query the URL.
  this.dispatchEvent(goog.net.WebSocket.EventType.CLOSED);

  // Always clear out the web socket on a close event.
  this.webSocket_ = null;

  // See if this is an expected call to onClose_.
  if (this.closeExpected_) {
    this.logger_.info('The WebSocket closed normally.');
    // Only clear out the URL if this is a normal close.
    this.url_ = null;
    this.protocol_ = undefined;
  } else {
    // Unexpected, so try to reconnect.
    this.logger_.severe('The WebSocket disconnected unexpectedly: ' +
        event.data);

    // Only try to reconnect if it is enabled.
    if (this.autoReconnect_) {
      // Log the reconnect attempt.
      var seconds = Math.floor(this.nextReconnect_ / 1000);
      this.logger_.info('Seconds until next reconnect attempt: ' + seconds);

      // Actually schedule the timer.
      this.reconnectTimer_ = goog.Timer.callOnce(
          goog.bind(this.open, this, this.url_, this.protocol_),
          this.nextReconnect_, this);

      // Set the next reconnect interval.
      this.reconnectAttempt_++;
      this.nextReconnect_ = this.getNextReconnect_(this.reconnectAttempt_);
    }
  }
  this.closeExpected_ = false;
***REMOVED***


***REMOVED***
***REMOVED*** Called when a new message arrives from the server.
***REMOVED***
***REMOVED*** @param {MessageEvent} event The web socket message event.
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.onMessage_ = function(event) {
  var message =***REMOVED*****REMOVED*** @type {string}***REMOVED*** (event.data);
  this.dispatchEvent(new goog.net.WebSocket.MessageEvent(message));
***REMOVED***


***REMOVED***
***REMOVED*** Called when there is any error in communication.
***REMOVED***
***REMOVED*** @param {Event} event The error event containing the error data.
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.onError_ = function(event) {
  var data =***REMOVED*****REMOVED*** @type {string}***REMOVED*** (event.data);
  this.logger_.severe('An error occurred: ' + data);
  this.dispatchEvent(new goog.net.WebSocket.ErrorEvent(data));
***REMOVED***


***REMOVED***
***REMOVED*** Clears the reconnect timer.
***REMOVED***
***REMOVED*** @private
***REMOVED***
goog.net.WebSocket.prototype.clearReconnectTimer_ = function() {
  if (goog.isDefAndNotNull(this.reconnectTimer_)) {
    goog.Timer.clear(this.reconnectTimer_);
  }
  this.reconnectTimer_ = null;
***REMOVED***


***REMOVED*** @override***REMOVED***
goog.net.WebSocket.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.close();
***REMOVED***



***REMOVED***
***REMOVED*** Object representing a new incoming message event.
***REMOVED***
***REMOVED*** @param {string} message The raw message coming from the web socket.
***REMOVED*** @extends {goog.events.Event}
***REMOVED***
***REMOVED***
goog.net.WebSocket.MessageEvent = function(message) {
  goog.base(this, goog.net.WebSocket.EventType.MESSAGE);

 ***REMOVED*****REMOVED***
  ***REMOVED*** The new message from the web socket.
  ***REMOVED*** @type {string}
 ***REMOVED*****REMOVED***
  this.message = message;
***REMOVED***
goog.inherits(goog.net.WebSocket.MessageEvent, goog.events.Event);



***REMOVED***
***REMOVED*** Object representing an error event. This is fired whenever an error occurs
***REMOVED*** on the web socket.
***REMOVED***
***REMOVED*** @param {string} data The error data.
***REMOVED*** @extends {goog.events.Event}
***REMOVED***
***REMOVED***
goog.net.WebSocket.ErrorEvent = function(data) {
  goog.base(this, goog.net.WebSocket.EventType.ERROR);

 ***REMOVED*****REMOVED***
  ***REMOVED*** The error data coming from the web socket.
  ***REMOVED*** @type {string}
 ***REMOVED*****REMOVED***
  this.data = data;
***REMOVED***
goog.inherits(goog.net.WebSocket.ErrorEvent, goog.events.Event);


// Register the WebSocket as an entry point, so that it can be monitored for
// exception handling, etc.
goog.debug.entryPointRegistry.register(
   ***REMOVED*****REMOVED***
    ***REMOVED*** @param {function(!Function): !Function} transformer The transforming
    ***REMOVED***     function.
   ***REMOVED*****REMOVED***
    function(transformer) {
      goog.net.WebSocket.prototype.onOpen_ =
          transformer(goog.net.WebSocket.prototype.onOpen_);
      goog.net.WebSocket.prototype.onClose_ =
          transformer(goog.net.WebSocket.prototype.onClose_);
      goog.net.WebSocket.prototype.onMessage_ =
          transformer(goog.net.WebSocket.prototype.onMessage_);
      goog.net.WebSocket.prototype.onError_ =
          transformer(goog.net.WebSocket.prototype.onError_);
    });
