// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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
***REMOVED*** @fileoverview Provides a base class for custom Error objects such that the
***REMOVED*** stack is correctly maintained.
***REMOVED***
***REMOVED*** You should never need to throw goog.debug.Error(msg) directly, Error(msg) is
***REMOVED*** sufficient.
***REMOVED***
***REMOVED***

goog.provide('goog.debug.Error');



***REMOVED***
***REMOVED*** Base class for custom error objects.
***REMOVED*** @param {*=} opt_msg The message associated with the error.
***REMOVED***
***REMOVED*** @extends {Error}
***REMOVED***
goog.debug.Error = function(opt_msg) {

  // Attempt to ensure there is a stack trace.
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var stack = new Error().stack;
    if (stack) {
      this.stack = stack;
    }
  }

  if (opt_msg) {
    this.message = String(opt_msg);
  }
***REMOVED***
goog.inherits(goog.debug.Error, Error);


***REMOVED*** @override***REMOVED***
goog.debug.Error.prototype.name = 'CustomError';
