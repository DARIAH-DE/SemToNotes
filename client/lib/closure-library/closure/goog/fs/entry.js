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
***REMOVED*** @fileoverview Wrappers for HTML5 Entry objects. These are all in the same
***REMOVED*** file to avoid circular dependency issues.
***REMOVED***
***REMOVED*** When adding or modifying functionality in this namespace, be sure to update
***REMOVED*** the mock counterparts in goog.testing.fs.
***REMOVED***
***REMOVED***
goog.provide('goog.fs.DirectoryEntry');
goog.provide('goog.fs.DirectoryEntry.Behavior');
goog.provide('goog.fs.Entry');
goog.provide('goog.fs.FileEntry');



***REMOVED***
***REMOVED*** The interface for entries in the filesystem.
***REMOVED*** @interface
***REMOVED***
goog.fs.Entry = function() {***REMOVED***


***REMOVED***
***REMOVED*** @return {boolean} Whether or not this entry is a file.
***REMOVED***
goog.fs.Entry.prototype.isFile = function() {***REMOVED***


***REMOVED***
***REMOVED*** @return {boolean} Whether or not this entry is a directory.
***REMOVED***
goog.fs.Entry.prototype.isDirectory = function() {***REMOVED***


***REMOVED***
***REMOVED*** @return {string} The name of this entry.
***REMOVED***
goog.fs.Entry.prototype.getName = function() {***REMOVED***


***REMOVED***
***REMOVED*** @return {string} The full path to this entry.
***REMOVED***
goog.fs.Entry.prototype.getFullPath = function() {***REMOVED***


***REMOVED***
***REMOVED*** @return {!goog.fs.FileSystem} The filesystem backing this entry.
***REMOVED***
goog.fs.Entry.prototype.getFileSystem = function() {***REMOVED***


***REMOVED***
***REMOVED*** Retrieves the last modified date for this entry.
***REMOVED***
***REMOVED*** @return {!goog.async.Deferred} The deferred Date for this entry. If an error
***REMOVED***     occurs, the errback is called with a {@link goog.fs.Error}.
***REMOVED***
goog.fs.Entry.prototype.getLastModified = function() {***REMOVED***


***REMOVED***
***REMOVED*** Retrieves the metadata for this entry.
***REMOVED***
***REMOVED*** @return {!goog.async.Deferred} The deferred Metadata for this entry. If an
***REMOVED***     error occurs, the errback is called with a {@link goog.fs.Error}.
***REMOVED***
goog.fs.Entry.prototype.getMetadata = function() {***REMOVED***


***REMOVED***
***REMOVED*** Move this entry to a new location.
***REMOVED***
***REMOVED*** @param {!goog.fs.DirectoryEntry} parent The new parent directory.
***REMOVED*** @param {string=} opt_newName The new name of the entry. If omitted, the entry
***REMOVED***     retains its original name.
***REMOVED*** @return {!goog.async.Deferred} The deferred {@link goog.fs.FileEntry} or
***REMOVED***     {@link goog.fs.DirectoryEntry} for the new entry. If an error occurs, the
***REMOVED***     errback is called with a {@link goog.fs.Error}.
***REMOVED***
goog.fs.Entry.prototype.moveTo = function(parent, opt_newName) {***REMOVED***


***REMOVED***
***REMOVED*** Copy this entry to a new location.
***REMOVED***
***REMOVED*** @param {!goog.fs.DirectoryEntry} parent The new parent directory.
***REMOVED*** @param {string=} opt_newName The name of the new entry. If omitted, the new
***REMOVED***     entry has the same name as the original.
***REMOVED*** @return {!goog.async.Deferred} The deferred {@link goog.fs.FileEntry} or
***REMOVED***     {@link goog.fs.DirectoryEntry} for the new entry. If an error occurs, the
***REMOVED***     errback is called with a {@link goog.fs.Error}.
***REMOVED***
goog.fs.Entry.prototype.copyTo = function(parent, opt_newName) {***REMOVED***


***REMOVED***
***REMOVED*** Wrap an HTML5 entry object in an appropriate subclass instance.
***REMOVED***
***REMOVED*** @param {!Entry} entry The underlying Entry object.
***REMOVED*** @return {!goog.fs.Entry} The appropriate subclass wrapper.
***REMOVED*** @protected
***REMOVED***
goog.fs.Entry.prototype.wrapEntry = function(entry) {***REMOVED***


***REMOVED***
***REMOVED*** Get the URL for this file.
***REMOVED***
***REMOVED*** @param {string=} opt_mimeType The MIME type that will be served for the URL.
***REMOVED*** @return {string} The URL.
***REMOVED***
goog.fs.Entry.prototype.toUrl = function(opt_mimeType) {***REMOVED***


***REMOVED***
***REMOVED*** Get the URI for this file.
***REMOVED***
***REMOVED*** @deprecated Use {@link #toUrl} instead.
***REMOVED*** @param {string=} opt_mimeType The MIME type that will be served for the URI.
***REMOVED*** @return {string} The URI.
***REMOVED***
goog.fs.Entry.prototype.toUri = function(opt_mimeType) {***REMOVED***


***REMOVED***
***REMOVED*** Remove this entry.
***REMOVED***
***REMOVED*** @return {!goog.async.Deferred} A deferred object. If the removal succeeds,
***REMOVED***     the callback is called with true. If an error occurs, the errback is
***REMOVED***     called a {@link goog.fs.Error}.
***REMOVED***
goog.fs.Entry.prototype.remove = function() {***REMOVED***


***REMOVED***
***REMOVED*** Gets the parent directory.
***REMOVED***
***REMOVED*** @return {!goog.async.Deferred} The deferred {@link goog.fs.DirectoryEntry}.
***REMOVED***     If an error occurs, the errback is called with a {@link goog.fs.Error}.
***REMOVED***
goog.fs.Entry.prototype.getParent = function() {***REMOVED***



***REMOVED***
***REMOVED*** A directory in a local FileSystem.
***REMOVED***
***REMOVED*** @interface
***REMOVED*** @extends {goog.fs.Entry}
***REMOVED***
goog.fs.DirectoryEntry = function() {***REMOVED***


***REMOVED***
***REMOVED*** Behaviors for getting files and directories.
***REMOVED*** @enum {number}
***REMOVED***
goog.fs.DirectoryEntry.Behavior = {
 ***REMOVED*****REMOVED***
  ***REMOVED*** Get the file if it exists, error out if it doesn't.
 ***REMOVED*****REMOVED***
  DEFAULT: 1,
 ***REMOVED*****REMOVED***
  ***REMOVED*** Get the file if it exists, create it if it doesn't.
 ***REMOVED*****REMOVED***
  CREATE: 2,
 ***REMOVED*****REMOVED***
  ***REMOVED*** Error out if the file exists, create it if it doesn't.
 ***REMOVED*****REMOVED***
  CREATE_EXCLUSIVE: 3
***REMOVED***


***REMOVED***
***REMOVED*** Get a file in the directory.
***REMOVED***
***REMOVED*** @param {string} path The path to the file, relative to this directory.
***REMOVED*** @param {goog.fs.DirectoryEntry.Behavior=} opt_behavior The behavior for
***REMOVED***     handling an existing file, or the lack thereof.
***REMOVED*** @return {!goog.async.Deferred} The deferred {@link goog.fs.FileEntry}. If an
***REMOVED***     error occurs, the errback is called with a {@link goog.fs.Error}.
***REMOVED***
goog.fs.DirectoryEntry.prototype.getFile = function(path, opt_behavior) {***REMOVED***


***REMOVED***
***REMOVED*** Get a directory within this directory.
***REMOVED***
***REMOVED*** @param {string} path The path to the directory, relative to this directory.
***REMOVED*** @param {goog.fs.DirectoryEntry.Behavior=} opt_behavior The behavior for
***REMOVED***     handling an existing directory, or the lack thereof.
***REMOVED*** @return {!goog.async.Deferred} The deferred {@link goog.fs.DirectoryEntry}.
***REMOVED***     If an error occurs, the errback is called a {@link goog.fs.Error}.
***REMOVED***
goog.fs.DirectoryEntry.prototype.getDirectory = function(path, opt_behavior) {***REMOVED***


***REMOVED***
***REMOVED*** Opens the directory for the specified path, creating the directory and any
***REMOVED*** intermediate directories as necessary.
***REMOVED***
***REMOVED*** @param {string} path The directory path to create. May be absolute or
***REMOVED***     relative to the current directory. The parent directory ".." and current
***REMOVED***     directory "." are supported.
***REMOVED*** @return {!goog.async.Deferred} A deferred {@link goog.fs.DirectoryEntry} for
***REMOVED***     the requested path. If an error occurs, the errback is called with a
***REMOVED***     {@link goog.fs.Error}.
***REMOVED***
goog.fs.DirectoryEntry.prototype.createPath = function(path) {***REMOVED***


***REMOVED***
***REMOVED*** Gets a list of all entries in this directory.
***REMOVED***
***REMOVED*** @return {!goog.async.Deferred} The deferred list of {@link goog.fs.Entry}
***REMOVED***     results. If an error occurs, the errback is called with a
***REMOVED***     {@link goog.fs.Error}.
***REMOVED***
goog.fs.DirectoryEntry.prototype.listDirectory = function() {***REMOVED***


***REMOVED***
***REMOVED*** Removes this directory and all its contents.
***REMOVED***
***REMOVED*** @return {!goog.async.Deferred} A deferred object. If the removal succeeds,
***REMOVED***     the callback is called with true. If an error occurs, the errback is
***REMOVED***     called a {@link goog.fs.Error}.
***REMOVED***
goog.fs.DirectoryEntry.prototype.removeRecursively = function() {***REMOVED***



***REMOVED***
***REMOVED*** A file in a local filesystem.
***REMOVED***
***REMOVED*** @interface
***REMOVED*** @extends {goog.fs.Entry}
***REMOVED***
goog.fs.FileEntry = function() {***REMOVED***


***REMOVED***
***REMOVED*** Create a writer for writing to the file.
***REMOVED***
***REMOVED*** @return {!goog.async.Deferred.<!goog.fs.FileWriter>} If an error occurs, the
***REMOVED***     errback is called with a {@link goog.fs.Error}.
***REMOVED***
goog.fs.FileEntry.prototype.createWriter = function() {***REMOVED***


***REMOVED***
***REMOVED*** Get the file contents as a File blob.
***REMOVED***
***REMOVED*** @return {!goog.async.Deferred.<!File>} If an error occurs, the errback is
***REMOVED***     called with a {@link goog.fs.Error}.
***REMOVED***
goog.fs.FileEntry.prototype.file = function() {***REMOVED***
