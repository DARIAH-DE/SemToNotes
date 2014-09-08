// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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
***REMOVED*** @fileoverview Callback object that counts matches.
***REMOVED***
***REMOVED*** @author robbyw@google.com (Robby Walker)
***REMOVED***

goog.provide('goog.dom.pattern.callback.Counter');



***REMOVED***
***REMOVED*** Callback class for counting matches.
***REMOVED***
***REMOVED*** @final
***REMOVED***
goog.dom.pattern.callback.Counter = function() {
***REMOVED***


***REMOVED***
***REMOVED*** The count of objects matched so far.
***REMOVED***
***REMOVED*** @type {number}
***REMOVED***
goog.dom.pattern.callback.Counter.prototype.count = 0;


***REMOVED***
***REMOVED*** The callback function.  Suitable as a callback for
***REMOVED*** {@link goog.dom.pattern.Matcher}.
***REMOVED*** @type {Function}
***REMOVED*** @private
***REMOVED***
goog.dom.pattern.callback.Counter.prototype.callback_ = null;


***REMOVED***
***REMOVED*** Get a bound callback function that is suitable as a callback for
***REMOVED*** {@link goog.dom.pattern.Matcher}.
***REMOVED***
***REMOVED*** @return {!Function} A callback function.
***REMOVED***
goog.dom.pattern.callback.Counter.prototype.getCallback = function() {
  if (!this.callback_) {
    this.callback_ = goog.bind(function() {
      this.count++;
      return false;
    }, this);
  }
  return this.callback_;
***REMOVED***


***REMOVED***
***REMOVED*** Reset the counter.
***REMOVED***
goog.dom.pattern.callback.Counter.prototype.reset = function() {
  this.count = 0;
***REMOVED***
