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
***REMOVED*** @fileoverview Implementation of HMAC in JavaScript.
***REMOVED***
***REMOVED*** Usage:
***REMOVED***   var hmac = new goog.crypt.Hmac(new goog.crypt.sha1(), key, 64);
***REMOVED***   var digest = hmac.getHmac(bytes);
***REMOVED***
***REMOVED***


goog.provide('goog.crypt.Hmac');

goog.require('goog.asserts');
goog.require('goog.crypt.Hash');



***REMOVED***
***REMOVED***
***REMOVED*** @param {!goog.crypt.Hash} hasher An object to serve as a hash function.
***REMOVED*** @param {Array.<number>} key The secret key to use to calculate the hmac.
***REMOVED***     Should be an array of not more than {@code blockSize} integers in
       {0, 255}.
***REMOVED*** @param {number=} opt_blockSize Optional. The block size {@code hasher} uses.
***REMOVED***     If not specified, 16.
***REMOVED*** @extends {goog.crypt.Hash}
***REMOVED***
goog.crypt.Hmac = function(hasher, key, opt_blockSize) {
  goog.base(this);

 ***REMOVED*****REMOVED***
  ***REMOVED*** The underlying hasher to calculate hash.
  ***REMOVED***
  ***REMOVED*** @type {!goog.crypt.Hash}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.hasher_ = hasher;

 ***REMOVED*****REMOVED***
  ***REMOVED*** The block size.
  ***REMOVED***
  ***REMOVED*** @type {number}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.blockSize_ = opt_blockSize || 16;

 ***REMOVED*****REMOVED***
  ***REMOVED*** The outer padding array of hmac
  ***REMOVED***
  ***REMOVED*** @type {!Array.<number>}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.keyO_ = new Array(this.blockSize_);

 ***REMOVED*****REMOVED***
  ***REMOVED*** The inner padding array of hmac
  ***REMOVED***
  ***REMOVED*** @type {!Array.<number>}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.keyI_ = new Array(this.blockSize_);

  this.initialize_(key);
***REMOVED***
goog.inherits(goog.crypt.Hmac, goog.crypt.Hash);


***REMOVED***
***REMOVED*** Outer padding byte of HMAC algorith, per http://en.wikipedia.org/wiki/HMAC
***REMOVED***
***REMOVED*** @type {number}
***REMOVED*** @private
***REMOVED***
goog.crypt.Hmac.OPAD_ = 0x5c;


***REMOVED***
***REMOVED*** Inner padding byte of HMAC algorith, per http://en.wikipedia.org/wiki/HMAC
***REMOVED***
***REMOVED*** @type {number}
***REMOVED*** @private
***REMOVED***
goog.crypt.Hmac.IPAD_ = 0x36;


***REMOVED***
***REMOVED*** Initializes Hmac by precalculating the inner and outer paddings.
***REMOVED***
***REMOVED*** @param {Array.<number>} key The secret key to use to calculate the hmac.
***REMOVED***     Should be an array of not more than {@code blockSize} integers in
       {0, 255}.
***REMOVED*** @private
***REMOVED***
goog.crypt.Hmac.prototype.initialize_ = function(key) {
  if (key.length > this.blockSize_) {
    this.hasher_.update(key);
    key = this.hasher_.digest();
  }
  // Precalculate padded and xor'd keys.
  var keyByte;
  for (var i = 0; i < this.blockSize_; i++) {
    if (i < key.length) {
      keyByte = key[i];
    } else {
      keyByte = 0;
    }
    this.keyO_[i] = keyByte ^ goog.crypt.Hmac.OPAD_;
    this.keyI_[i] = keyByte ^ goog.crypt.Hmac.IPAD_;
  }
  // Be ready for an immediate update.
  this.hasher_.update(this.keyI_);
***REMOVED***


***REMOVED*** @override***REMOVED***
goog.crypt.Hmac.prototype.reset = function() {
  this.hasher_.reset();
  this.hasher_.update(this.keyI_);
***REMOVED***


***REMOVED*** @override***REMOVED***
goog.crypt.Hmac.prototype.update = function(bytes, opt_length) {
  this.hasher_.update(bytes, opt_length);
***REMOVED***


***REMOVED*** @override***REMOVED***
goog.crypt.Hmac.prototype.digest = function() {
  var temp = this.hasher_.digest();
  this.hasher_.reset();
  this.hasher_.update(this.keyO_);
  this.hasher_.update(temp);
  return this.hasher_.digest();
***REMOVED***


***REMOVED***
***REMOVED*** Calculates an HMAC for a given message.
***REMOVED***
***REMOVED*** @param {Array.<number>} message  An array of integers in {0, 255}.
***REMOVED*** @return {!Array.<number>} the digest of the given message.
***REMOVED***
goog.crypt.Hmac.prototype.getHmac = function(message) {
  this.reset();
  this.update(message);
  return this.digest();
***REMOVED***
