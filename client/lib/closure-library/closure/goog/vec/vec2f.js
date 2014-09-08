// Copyright 2013 The Closure Library Authors. All Rights Reserved.
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


////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////
//                                                                           //
// Any edits to this file must be applied to vec2d.js by running:            //
//   swap_type.sh vec2f.js > vec2d.js                                        //
//                                                                           //
////////////////////////// NOTE ABOUT EDITING THIS FILE ///////////////////////


***REMOVED***
***REMOVED*** @fileoverview Provides functions for operating on 2 element float (32bit)
***REMOVED*** vectors.
***REMOVED***
***REMOVED*** The last parameter will typically be the output object and an object
***REMOVED*** can be both an input and output parameter to all methods except where
***REMOVED*** noted.
***REMOVED***
***REMOVED*** See the README for notes about the design and structure of the API
***REMOVED*** (especially related to performance).
***REMOVED***
***REMOVED***

goog.provide('goog.vec.vec2f');
goog.provide('goog.vec.vec2f.Type');

***REMOVED*** @suppress {extraRequire}***REMOVED***
goog.require('goog.vec');


***REMOVED*** @typedef {goog.vec.Float32}***REMOVED*** goog.vec.vec2f.Type;


***REMOVED***
***REMOVED*** Creates a vec2f with all elements initialized to zero.
***REMOVED***
***REMOVED*** @return {!goog.vec.vec2f.Type} The new vec2f.
***REMOVED***
goog.vec.vec2f.create = function() {
  return new Float32Array(2);
***REMOVED***


***REMOVED***
***REMOVED*** Initializes the vector with the given values.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec The vector to receive the values.
***REMOVED*** @param {number} v0 The value for element at index 0.
***REMOVED*** @param {number} v1 The value for element at index 1.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return vec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.setFromValues = function(vec, v0, v1) {
  vec[0] = v0;
  vec[1] = v1;
  return vec;
***REMOVED***


***REMOVED***
***REMOVED*** Initializes vec2f vec from vec2f src.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec The destination vector.
***REMOVED*** @param {goog.vec.vec2f.Type} src The source vector.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return vec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.setFromVec2f = function(vec, src) {
  vec[0] = src[0];
  vec[1] = src[1];
  return vec;
***REMOVED***


***REMOVED***
***REMOVED*** Initializes vec2f vec from vec2d src (typed as a Float64Array to
***REMOVED*** avoid circular goog.requires).
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec The destination vector.
***REMOVED*** @param {Float64Array} src The source vector.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return vec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.setFromVec2d = function(vec, src) {
  vec[0] = src[0];
  vec[1] = src[1];
  return vec;
***REMOVED***


***REMOVED***
***REMOVED*** Initializes vec2f vec from Array src.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec The destination vector.
***REMOVED*** @param {Array.<number>} src The source vector.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return vec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.setFromArray = function(vec, src) {
  vec[0] = src[0];
  vec[1] = src[1];
  return vec;
***REMOVED***


***REMOVED***
***REMOVED*** Performs a component-wise addition of vec0 and vec1 together storing the
***REMOVED*** result into resultVec.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The first addend.
***REMOVED*** @param {goog.vec.vec2f.Type} vec1 The second addend.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to
***REMOVED***     receive the result. May be vec0 or vec1.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.add = function(vec0, vec1, resultVec) {
  resultVec[0] = vec0[0] + vec1[0];
  resultVec[1] = vec0[1] + vec1[1];
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Performs a component-wise subtraction of vec1 from vec0 storing the
***REMOVED*** result into resultVec.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The minuend.
***REMOVED*** @param {goog.vec.vec2f.Type} vec1 The subtrahend.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to
***REMOVED***     receive the result. May be vec0 or vec1.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.subtract = function(vec0, vec1, resultVec) {
  resultVec[0] = vec0[0] - vec1[0];
  resultVec[1] = vec0[1] - vec1[1];
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Multiplies each component of vec0 with the matching element of vec0
***REMOVED*** storing the products into resultVec.
***REMOVED***
***REMOVED*** @param {!goog.vec.vec2f.Type} vec0 The first vector.
***REMOVED*** @param {!goog.vec.vec2f.Type} vec1 The second vector.
***REMOVED*** @param {!goog.vec.vec2f.Type} resultVec The vector to
***REMOVED***     receive the result. May be vec0.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.componentMultiply = function(vec0, vec1, resultVec) {
  resultVec[0] = vec0[0]***REMOVED*** vec1[0];
  resultVec[1] = vec0[1]***REMOVED*** vec1[1];
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Divides each component of vec0 with the matching element of vec0
***REMOVED*** storing the divisor into resultVec.
***REMOVED***
***REMOVED*** @param {!goog.vec.vec2f.Type} vec0 The first vector.
***REMOVED*** @param {!goog.vec.vec2f.Type} vec1 The second vector.
***REMOVED*** @param {!goog.vec.vec2f.Type} resultVec The vector to
***REMOVED***     receive the result. May be vec0.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.componentDivide = function(vec0, vec1, resultVec) {
  resultVec[0] = vec0[0] / vec1[0];
  resultVec[1] = vec0[1] / vec1[1];
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Negates vec0, storing the result into resultVec.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The vector to negate.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to
***REMOVED***     receive the result. May be vec0.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.negate = function(vec0, resultVec) {
  resultVec[0] = -vec0[0];
  resultVec[1] = -vec0[1];
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Takes the absolute value of each component of vec0 storing the result in
***REMOVED*** resultVec.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The source vector.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to receive the result.
***REMOVED***     May be vec0.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.abs = function(vec0, resultVec) {
  resultVec[0] = Math.abs(vec0[0]);
  resultVec[1] = Math.abs(vec0[1]);
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Multiplies each component of vec0 with scalar storing the product into
***REMOVED*** resultVec.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The source vector.
***REMOVED*** @param {number} scalar The value to multiply with each component of vec0.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to
***REMOVED***     receive the result. May be vec0.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.scale = function(vec0, scalar, resultVec) {
  resultVec[0] = vec0[0]***REMOVED*** scalar;
  resultVec[1] = vec0[1]***REMOVED*** scalar;
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Returns the magnitudeSquared of the given vector.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The vector.
***REMOVED*** @return {number} The magnitude of the vector.
***REMOVED***
goog.vec.vec2f.magnitudeSquared = function(vec0) {
  var x = vec0[0], y = vec0[1];
  return x***REMOVED*** x + y***REMOVED*** y;
***REMOVED***


***REMOVED***
***REMOVED*** Returns the magnitude of the given vector.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The vector.
***REMOVED*** @return {number} The magnitude of the vector.
***REMOVED***
goog.vec.vec2f.magnitude = function(vec0) {
  var x = vec0[0], y = vec0[1];
  return Math.sqrt(x***REMOVED*** x + y***REMOVED*** y);
***REMOVED***


***REMOVED***
***REMOVED*** Normalizes the given vector storing the result into resultVec.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The vector to normalize.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to
***REMOVED***     receive the result. May be vec0.
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.normalize = function(vec0, resultVec) {
  var x = vec0[0], y = vec0[1];
  var ilen = 1 / Math.sqrt(x***REMOVED*** x + y***REMOVED*** y);
  resultVec[0] = x***REMOVED*** ilen;
  resultVec[1] = y***REMOVED*** ilen;
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Returns the scalar product of vectors vec0 and vec1.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The first vector.
***REMOVED*** @param {goog.vec.vec2f.Type} vec1 The second vector.
***REMOVED*** @return {number} The scalar product.
***REMOVED***
goog.vec.vec2f.dot = function(vec0, vec1) {
  return vec0[0]***REMOVED*** vec1[0] + vec0[1]***REMOVED*** vec1[1];
***REMOVED***


***REMOVED***
***REMOVED*** Returns the squared distance between two points.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 First point.
***REMOVED*** @param {goog.vec.vec2f.Type} vec1 Second point.
***REMOVED*** @return {number} The squared distance between the points.
***REMOVED***
goog.vec.vec2f.distanceSquared = function(vec0, vec1) {
  var x = vec0[0] - vec1[0];
  var y = vec0[1] - vec1[1];
  return x***REMOVED*** x + y***REMOVED*** y;
***REMOVED***


***REMOVED***
***REMOVED*** Returns the distance between two points.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 First point.
***REMOVED*** @param {goog.vec.vec2f.Type} vec1 Second point.
***REMOVED*** @return {number} The distance between the points.
***REMOVED***
goog.vec.vec2f.distance = function(vec0, vec1) {
  return Math.sqrt(goog.vec.vec2f.distanceSquared(vec0, vec1));
***REMOVED***


***REMOVED***
***REMOVED*** Returns a unit vector pointing from one point to another.
***REMOVED*** If the input points are equal then the result will be all zeros.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 Origin point.
***REMOVED*** @param {goog.vec.vec2f.Type} vec1 Target point.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to receive the
***REMOVED***     results (may be vec0 or vec1).
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.direction = function(vec0, vec1, resultVec) {
  var x = vec1[0] - vec0[0];
  var y = vec1[1] - vec0[1];
  var d = Math.sqrt(x***REMOVED*** x + y***REMOVED*** y);
  if (d) {
    d = 1 / d;
    resultVec[0] = x***REMOVED*** d;
    resultVec[1] = y***REMOVED*** d;
  } else {
    resultVec[0] = resultVec[1] = 0;
  }
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Linearly interpolate from vec0 to vec1 according to f. The value of f should
***REMOVED*** be in the range [0..1] otherwise the results are undefined.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The first vector.
***REMOVED*** @param {goog.vec.vec2f.Type} vec1 The second vector.
***REMOVED*** @param {number} f The interpolation factor.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to receive the
***REMOVED***     results (may be vec0 or vec1).
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.lerp = function(vec0, vec1, f, resultVec) {
  var x = vec0[0], y = vec0[1];
  resultVec[0] = (vec1[0] - x)***REMOVED*** f + x;
  resultVec[1] = (vec1[1] - y)***REMOVED*** f + y;
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Compares the components of vec0 with the components of another vector or
***REMOVED*** scalar, storing the larger values in resultVec.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The source vector.
***REMOVED*** @param {goog.vec.vec2f.Type|number} limit The limit vector or scalar.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to receive the
***REMOVED***     results (may be vec0 or limit).
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.max = function(vec0, limit, resultVec) {
  if (goog.isNumber(limit)) {
    resultVec[0] = Math.max(vec0[0], limit);
    resultVec[1] = Math.max(vec0[1], limit);
  } else {
    resultVec[0] = Math.max(vec0[0], limit[0]);
    resultVec[1] = Math.max(vec0[1], limit[1]);
  }
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Compares the components of vec0 with the components of another vector or
***REMOVED*** scalar, storing the smaller values in resultVec.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The source vector.
***REMOVED*** @param {goog.vec.vec2f.Type|number} limit The limit vector or scalar.
***REMOVED*** @param {goog.vec.vec2f.Type} resultVec The vector to receive the
***REMOVED***     results (may be vec0 or limit).
***REMOVED*** @return {!goog.vec.vec2f.Type} Return resultVec so that operations can be
***REMOVED***     chained together.
***REMOVED***
goog.vec.vec2f.min = function(vec0, limit, resultVec) {
  if (goog.isNumber(limit)) {
    resultVec[0] = Math.min(vec0[0], limit);
    resultVec[1] = Math.min(vec0[1], limit);
  } else {
    resultVec[0] = Math.min(vec0[0], limit[0]);
    resultVec[1] = Math.min(vec0[1], limit[1]);
  }
  return resultVec;
***REMOVED***


***REMOVED***
***REMOVED*** Returns true if the components of vec0 are equal to the components of vec1.
***REMOVED***
***REMOVED*** @param {goog.vec.vec2f.Type} vec0 The first vector.
***REMOVED*** @param {goog.vec.vec2f.Type} vec1 The second vector.
***REMOVED*** @return {boolean} True if the vectors are equal, false otherwise.
***REMOVED***
goog.vec.vec2f.equals = function(vec0, vec1) {
  return vec0.length == vec1.length &&
      vec0[0] == vec1[0] && vec0[1] == vec1[1];
***REMOVED***
