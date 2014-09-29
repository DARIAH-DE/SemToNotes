// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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
***REMOVED*** @fileoverview Logging and debugging utilities.
***REMOVED***
***REMOVED*** @see ../demos/debug.html
***REMOVED***

goog.provide('goog.debug');

goog.require('goog.array');
goog.require('goog.string');
goog.require('goog.structs.Set');
goog.require('goog.userAgent');


***REMOVED***
***REMOVED*** Catches onerror events fired by windows and similar objects.
***REMOVED*** @param {function(Object)} logFunc The function to call with the error
***REMOVED***    information.
***REMOVED*** @param {boolean=} opt_cancel Whether to stop the error from reaching the
***REMOVED***    browser.
***REMOVED*** @param {Object=} opt_target Object that fires onerror events.
***REMOVED***
goog.debug.catchErrors = function(logFunc, opt_cancel, opt_target) {
  var target = opt_target || goog.global;
  var oldErrorHandler = target.onerror;
  var retVal = !!opt_cancel;

  // Chrome interprets onerror return value backwards (http://crbug.com/92062)
  // until it was fixed in webkit revision r94061 (Webkit 535.3). This
  // workaround still needs to be skipped in Safari after the webkit change
  // gets pushed out in Safari.
  // See https://bugs.webkit.org/show_bug.cgi?id=67119
  if (goog.userAgent.WEBKIT && !goog.userAgent.isVersion('535.3')) {
    retVal = !retVal;
  }
  target.onerror = function(message, url, line) {
    if (oldErrorHandler) {
      oldErrorHandler(message, url, line);
    }
    logFunc({
      message: message,
      fileName: url,
      line: line
    });
    return retVal;
 ***REMOVED*****REMOVED***
***REMOVED***


***REMOVED***
***REMOVED*** Creates a string representing an object and all its properties.
***REMOVED*** @param {Object|null|undefined} obj Object to expose.
***REMOVED*** @param {boolean=} opt_showFn Show the functions as well as the properties,
***REMOVED***     default is false.
***REMOVED*** @return {string} The string representation of {@code obj}.
***REMOVED***
goog.debug.expose = function(obj, opt_showFn) {
  if (typeof obj == 'undefined') {
    return 'undefined';
  }
  if (obj == null) {
    return 'NULL';
  }
  var str = [];

  for (var x in obj) {
    if (!opt_showFn && goog.isFunction(obj[x])) {
      continue;
    }
    var s = x + ' = ';
   ***REMOVED*****REMOVED*** @preserveTry***REMOVED***
    try {
      s += obj[x];
    } catch (e) {
      s += '*** ' + e + '***REMOVED*****';
    }
    str.push(s);
  }
  return str.join('\n');
***REMOVED***


***REMOVED***
***REMOVED*** Creates a string representing a given primitive or object, and for an
***REMOVED*** object, all its properties and nested objects.  WARNING: If an object is
***REMOVED*** given, it and all its nested objects will be modified.  To detect reference
***REMOVED*** cycles, this method identifies objects using goog.getUid() which mutates the
***REMOVED*** object.
***REMOVED*** @param {*} obj Object to expose.
***REMOVED*** @param {boolean=} opt_showFn Also show properties that are functions (by
***REMOVED***     default, functions are omitted).
***REMOVED*** @return {string} A string representation of {@code obj}.
***REMOVED***
goog.debug.deepExpose = function(obj, opt_showFn) {
  var previous = new goog.structs.Set();
  var str = [];

  var helper = function(obj, space) {
    var nestspace = space + '  ';

    var indentMultiline = function(str) {
      return str.replace(/\n/g, '\n' + space);
   ***REMOVED*****REMOVED***

   ***REMOVED*****REMOVED*** @preserveTry***REMOVED***
    try {
      if (!goog.isDef(obj)) {
        str.push('undefined');
      } else if (goog.isNull(obj)) {
        str.push('NULL');
      } else if (goog.isString(obj)) {
        str.push('"' + indentMultiline(obj) + '"');
      } else if (goog.isFunction(obj)) {
        str.push(indentMultiline(String(obj)));
      } else if (goog.isObject(obj)) {
        if (previous.contains(obj)) {
          // TODO(user): This is a bug; it falsely detects non-loops as loops
          // when the reference tree contains two references to the same object.
          str.push('*** reference loop detected***REMOVED*****');
        } else {
          previous.add(obj);
          str.push('{');
          for (var x in obj) {
            if (!opt_showFn && goog.isFunction(obj[x])) {
              continue;
            }
            str.push('\n');
            str.push(nestspace);
            str.push(x + ' = ');
            helper(obj[x], nestspace);
          }
          str.push('\n' + space + '}');
        }
      } else {
        str.push(obj);
      }
    } catch (e) {
      str.push('*** ' + e + '***REMOVED*****');
    }
 ***REMOVED*****REMOVED***

  helper(obj, '');
  return str.join('');
***REMOVED***


***REMOVED***
***REMOVED*** Recursively outputs a nested array as a string.
***REMOVED*** @param {Array} arr The array.
***REMOVED*** @return {string} String representing nested array.
***REMOVED***
goog.debug.exposeArray = function(arr) {
  var str = [];
  for (var i = 0; i < arr.length; i++) {
    if (goog.isArray(arr[i])) {
      str.push(goog.debug.exposeArray(arr[i]));
    } else {
      str.push(arr[i]);
    }
  }
  return '[ ' + str.join(', ') + ' ]';
***REMOVED***


***REMOVED***
***REMOVED*** Exposes an exception that has been caught by a try...catch and outputs the
***REMOVED*** error with a stack trace.
***REMOVED*** @param {Object} err Error object or string.
***REMOVED*** @param {Function=} opt_fn Optional function to start stack trace from.
***REMOVED*** @return {string} Details of exception.
***REMOVED***
goog.debug.exposeException = function(err, opt_fn) {
 ***REMOVED*****REMOVED*** @preserveTry***REMOVED***
  try {
    var e = goog.debug.normalizeErrorObject(err);

    // Create the error message
    var error = 'Message: ' + goog.string.htmlEscape(e.message) +
        '\nUrl: <a href="view-source:' + e.fileName + '" target="_new">' +
        e.fileName + '</a>\nLine: ' + e.lineNumber + '\n\nBrowser stack:\n' +
        goog.string.htmlEscape(e.stack + '-> ') +
        '[end]\n\nJS stack traversal:\n' + goog.string.htmlEscape(
            goog.debug.getStacktrace(opt_fn) + '-> ');
    return error;
  } catch (e2) {
    return 'Exception trying to expose exception! You win, we lose. ' + e2;
  }
***REMOVED***


***REMOVED***
***REMOVED*** Normalizes the error/exception object between browsers.
***REMOVED*** @param {Object} err Raw error object.
***REMOVED*** @return {Object} Normalized error object.
***REMOVED***
goog.debug.normalizeErrorObject = function(err) {
  var href = goog.getObjectByName('window.location.href');
  if (goog.isString(err)) {
    return {
      'message': err,
      'name': 'Unknown error',
      'lineNumber': 'Not available',
      'fileName': href,
      'stack': 'Not available'
   ***REMOVED*****REMOVED***
  }

  var lineNumber, fileName;
  var threwError = false;

  try {
    lineNumber = err.lineNumber || err.line || 'Not available';
  } catch (e) {
    // Firefox 2 sometimes throws an error when accessing 'lineNumber':
    // Message: Permission denied to get property UnnamedClass.lineNumber
    lineNumber = 'Not available';
    threwError = true;
  }

  try {
    fileName = err.fileName || err.filename || err.sourceURL ||
        // $googDebugFname may be set before a call to eval to set the filename
        // that the eval is supposed to present.
        goog.global['$googDebugFname'] || href;
  } catch (e) {
    // Firefox 2 may also throw an error when accessing 'filename'.
    fileName = 'Not available';
    threwError = true;
  }

  // The IE Error object contains only the name and the message.
  // The Safari Error object uses the line and sourceURL fields.
  if (threwError || !err.lineNumber || !err.fileName || !err.stack) {
    return {
      'message': err.message,
      'name': err.name,
      'lineNumber': lineNumber,
      'fileName': fileName,
      'stack': err.stack || 'Not available'
   ***REMOVED*****REMOVED***
  }

  // Standards error object
  return err;
***REMOVED***


***REMOVED***
***REMOVED*** Converts an object to an Error if it's a String,
***REMOVED*** adds a stacktrace if there isn't one,
***REMOVED*** and optionally adds an extra message.
***REMOVED*** @param {Error|string} err  the original thrown object or string.
***REMOVED*** @param {string=} opt_message  optional additional message to add to the
***REMOVED***     error.
***REMOVED*** @return {Error} If err is a string, it is used to create a new Error,
***REMOVED***     which is enhanced and returned.  Otherwise err itself is enhanced
***REMOVED***     and returned.
***REMOVED***
goog.debug.enhanceError = function(err, opt_message) {
  var error = typeof err == 'string' ? Error(err) : err;
  if (!error.stack) {
    error.stack = goog.debug.getStacktrace(arguments.callee.caller);
  }
  if (opt_message) {
    // find the first unoccupied 'messageX' property
    var x = 0;
    while (error['message' + x]) {
      ++x;
    }
    error['message' + x] = String(opt_message);
  }
  return error;
***REMOVED***


***REMOVED***
***REMOVED*** Gets the current stack trace. Simple and iterative - doesn't worry about
***REMOVED*** catching circular references or getting the args.
***REMOVED*** @param {number=} opt_depth Optional maximum depth to trace back to.
***REMOVED*** @return {string} A string with the function names of all functions in the
***REMOVED***     stack, separated by \n.
***REMOVED***
goog.debug.getStacktraceSimple = function(opt_depth) {
  var sb = [];
  var fn = arguments.callee.caller;
  var depth = 0;

  while (fn && (!opt_depth || depth < opt_depth)) {
    sb.push(goog.debug.getFunctionName(fn));
    sb.push('()\n');
   ***REMOVED*****REMOVED*** @preserveTry***REMOVED***
    try {
      fn = fn.caller;
    } catch (e) {
      sb.push('[exception trying to get caller]\n');
      break;
    }
    depth++;
    if (depth >= goog.debug.MAX_STACK_DEPTH) {
      sb.push('[...long stack...]');
      break;
    }
  }
  if (opt_depth && depth >= opt_depth) {
    sb.push('[...reached max depth limit...]');
  } else {
    sb.push('[end]');
  }

  return sb.join('');
***REMOVED***


***REMOVED***
***REMOVED*** Max length of stack to try and output
***REMOVED*** @type {number}
***REMOVED***
goog.debug.MAX_STACK_DEPTH = 50;


***REMOVED***
***REMOVED*** Gets the current stack trace, either starting from the caller or starting
***REMOVED*** from a specified function that's currently on the call stack.
***REMOVED*** @param {Function=} opt_fn Optional function to start getting the trace from.
***REMOVED***     If not provided, defaults to the function that called this.
***REMOVED*** @return {string} Stack trace.
***REMOVED***
goog.debug.getStacktrace = function(opt_fn) {
  return goog.debug.getStacktraceHelper_(opt_fn || arguments.callee.caller, []);
***REMOVED***


***REMOVED***
***REMOVED*** Private helper for getStacktrace().
***REMOVED*** @param {Function} fn Function to start getting the trace from.
***REMOVED*** @param {Array} visited List of functions visited so far.
***REMOVED*** @return {string} Stack trace starting from function fn.
***REMOVED*** @private
***REMOVED***
goog.debug.getStacktraceHelper_ = function(fn, visited) {
  var sb = [];

  // Circular reference, certain functions like bind seem to cause a recursive
  // loop so we need to catch circular references
  if (goog.array.contains(visited, fn)) {
    sb.push('[...circular reference...]');

  // Traverse the call stack until function not found or max depth is reached
  } else if (fn && visited.length < goog.debug.MAX_STACK_DEPTH) {
    sb.push(goog.debug.getFunctionName(fn) + '(');
    var args = fn.arguments;
    for (var i = 0; i < args.length; i++) {
      if (i > 0) {
        sb.push(', ');
      }
      var argDesc;
      var arg = args[i];
      switch (typeof arg) {
        case 'object':
          argDesc = arg ? 'object' : 'null';
          break;

        case 'string':
          argDesc = arg;
          break;

        case 'number':
          argDesc = String(arg);
          break;

        case 'boolean':
          argDesc = arg ? 'true' : 'false';
          break;

        case 'function':
          argDesc = goog.debug.getFunctionName(arg);
          argDesc = argDesc ? argDesc : '[fn]';
          break;

        case 'undefined':
        default:
          argDesc = typeof arg;
          break;
      }

      if (argDesc.length > 40) {
        argDesc = argDesc.substr(0, 40) + '...';
      }
      sb.push(argDesc);
    }
    visited.push(fn);
    sb.push(')\n');
   ***REMOVED*****REMOVED*** @preserveTry***REMOVED***
    try {
      sb.push(goog.debug.getStacktraceHelper_(fn.caller, visited));
    } catch (e) {
      sb.push('[exception trying to get caller]\n');
    }

  } else if (fn) {
    sb.push('[...long stack...]');
  } else {
    sb.push('[end]');
  }
  return sb.join('');
***REMOVED***


***REMOVED***
***REMOVED*** Set a custom function name resolver.
***REMOVED*** @param {function(Function): string} resolver Resolves functions to their
***REMOVED***     names.
***REMOVED***
goog.debug.setFunctionResolver = function(resolver) {
  goog.debug.fnNameResolver_ = resolver;
***REMOVED***


***REMOVED***
***REMOVED*** Gets a function name
***REMOVED*** @param {Function} fn Function to get name of.
***REMOVED*** @return {string} Function's name.
***REMOVED***
goog.debug.getFunctionName = function(fn) {
  if (goog.debug.fnNameCache_[fn]) {
    return goog.debug.fnNameCache_[fn];
  }
  if (goog.debug.fnNameResolver_) {
    var name = goog.debug.fnNameResolver_(fn);
    if (name) {
      goog.debug.fnNameCache_[fn] = name;
      return name;
    }
  }

  // Heuristically determine function name based on code.
  var functionSource = String(fn);
  if (!goog.debug.fnNameCache_[functionSource]) {
    var matches = /function ([^\(]+)/.exec(functionSource);
    if (matches) {
      var method = matches[1];
      goog.debug.fnNameCache_[functionSource] = method;
    } else {
      goog.debug.fnNameCache_[functionSource] = '[Anonymous]';
    }
  }

  return goog.debug.fnNameCache_[functionSource];
***REMOVED***


***REMOVED***
***REMOVED*** Makes whitespace visible by replacing it with printable characters.
***REMOVED*** This is useful in finding diffrences between the expected and the actual
***REMOVED*** output strings of a testcase.
***REMOVED*** @param {string} string whose whitespace needs to be made visible.
***REMOVED*** @return {string} string whose whitespace is made visible.
***REMOVED***
goog.debug.makeWhitespaceVisible = function(string) {
  return string.replace(/ /g, '[_]')
      .replace(/\f/g, '[f]')
      .replace(/\n/g, '[n]\n')
      .replace(/\r/g, '[r]')
      .replace(/\t/g, '[t]');
***REMOVED***


***REMOVED***
***REMOVED*** Hash map for storing function names that have already been looked up.
***REMOVED*** @type {Object}
***REMOVED*** @private
***REMOVED***
goog.debug.fnNameCache_ = {***REMOVED***


***REMOVED***
***REMOVED*** Resolves functions to their names.  Resolved function names will be cached.
***REMOVED*** @type {function(Function):string}
***REMOVED*** @private
***REMOVED***
goog.debug.fnNameResolver_;
