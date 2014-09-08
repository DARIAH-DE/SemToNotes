// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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
***REMOVED*** @fileoverview Generic tree node data structure with arbitrary number of child
***REMOVED*** nodes.
***REMOVED***
***REMOVED***

goog.provide('goog.structs.TreeNode');

goog.require('goog.array');
goog.require('goog.asserts');
goog.require('goog.structs.Node');



***REMOVED***
***REMOVED*** Generic tree node data structure with arbitrary number of child nodes.
***REMOVED*** It is possible to create a dynamic tree structure by overriding
***REMOVED*** {@link #getParent} and {@link #getChildren} in a subclass. All other getters
***REMOVED*** will automatically work.
***REMOVED***
***REMOVED*** @param {KEY} key Key.
***REMOVED*** @param {VALUE} value Value.
***REMOVED***
***REMOVED*** @extends {goog.structs.Node.<KEY, VALUE>}
***REMOVED*** @template KEY, VALUE
***REMOVED***
goog.structs.TreeNode = function(key, value) {
  goog.structs.Node.call(this, key, value);

 ***REMOVED*****REMOVED***
  ***REMOVED*** Reference to the parent node or null if it has no parent.
  ***REMOVED*** @private {goog.structs.TreeNode.<KEY, VALUE>}
 ***REMOVED*****REMOVED***
  this.parent_ = null;

 ***REMOVED*****REMOVED***
  ***REMOVED*** Child nodes or null in case of leaf node.
  ***REMOVED*** @private {Array.<!goog.structs.TreeNode.<KEY, VALUE>>}
 ***REMOVED*****REMOVED***
  this.children_ = null;
***REMOVED***
goog.inherits(goog.structs.TreeNode, goog.structs.Node);


***REMOVED***
***REMOVED*** Constant for empty array to avoid unnecessary allocations.
***REMOVED*** @private
***REMOVED***
goog.structs.TreeNode.EMPTY_ARRAY_ = [];


***REMOVED***
***REMOVED*** @return {!goog.structs.TreeNode} Clone of the tree node without its parent
***REMOVED***     and child nodes. The key and the value are copied by reference.
***REMOVED*** @override
***REMOVED***
goog.structs.TreeNode.prototype.clone = function() {
  return new goog.structs.TreeNode(this.getKey(), this.getValue());
***REMOVED***


***REMOVED***
***REMOVED*** @return {!goog.structs.TreeNode} Clone of the subtree with this node as root.
***REMOVED***
goog.structs.TreeNode.prototype.deepClone = function() {
  var clone = this.clone();
  this.forEachChild(function(child) {
    clone.addChild(child.deepClone());
  });
  return clone;
***REMOVED***


***REMOVED***
***REMOVED*** @return {goog.structs.TreeNode.<KEY, VALUE>} Parent node or null if it has no
***REMOVED***     parent.
***REMOVED***
goog.structs.TreeNode.prototype.getParent = function() {
  return this.parent_;
***REMOVED***


***REMOVED***
***REMOVED*** @return {boolean} Whether the node is a leaf node.
***REMOVED***
goog.structs.TreeNode.prototype.isLeaf = function() {
  return !this.getChildCount();
***REMOVED***


***REMOVED***
***REMOVED*** Tells if the node is the last child of its parent. This method helps how to
***REMOVED*** connect the tree nodes with lines: L shapes should be used before the last
***REMOVED*** children and |- shapes before the rest. Schematic tree visualization:
***REMOVED***
***REMOVED*** <pre>
***REMOVED*** Node1
***REMOVED*** |-Node2
***REMOVED*** | L-Node3
***REMOVED*** |   |-Node4
***REMOVED*** |   L-Node5
***REMOVED*** L-Node6
***REMOVED*** </pre>
***REMOVED***
***REMOVED*** @return {boolean} Whether the node has parent and is the last child of it.
***REMOVED***
goog.structs.TreeNode.prototype.isLastChild = function() {
  var parent = this.getParent();
  return Boolean(parent && this == goog.array.peek(parent.getChildren()));
***REMOVED***


***REMOVED***
***REMOVED*** @return {!Array.<!goog.structs.TreeNode.<KEY, VALUE>>} Immutable child nodes.
***REMOVED***
goog.structs.TreeNode.prototype.getChildren = function() {
  return this.children_ || goog.structs.TreeNode.EMPTY_ARRAY_;
***REMOVED***


***REMOVED***
***REMOVED*** Gets the child node of this node at the given index.
***REMOVED*** @param {number} index Child index.
***REMOVED*** @return {goog.structs.TreeNode.<KEY, VALUE>} The node at the given index or
***REMOVED***     null if not found.
***REMOVED***
goog.structs.TreeNode.prototype.getChildAt = function(index) {
  return this.getChildren()[index] || null;
***REMOVED***


***REMOVED***
***REMOVED*** @return {number} The number of children.
***REMOVED***
goog.structs.TreeNode.prototype.getChildCount = function() {
  return this.getChildren().length;
***REMOVED***


***REMOVED***
***REMOVED*** @return {number} The number of ancestors of the node.
***REMOVED***
goog.structs.TreeNode.prototype.getDepth = function() {
  var depth = 0;
  var node = this;
  while (node.getParent()) {
    depth++;
    node = node.getParent();
  }
  return depth;
***REMOVED***


***REMOVED***
***REMOVED*** @return {!Array.<!goog.structs.TreeNode.<KEY, VALUE>>} All ancestor nodes in
***REMOVED***     bottom-up order.
***REMOVED***
goog.structs.TreeNode.prototype.getAncestors = function() {
  var ancestors = [];
  var node = this.getParent();
  while (node) {
    ancestors.push(node);
    node = node.getParent();
  }
  return ancestors;
***REMOVED***


***REMOVED***
***REMOVED*** @return {!goog.structs.TreeNode.<KEY, VALUE>} The root of the tree structure,
***REMOVED***     i.e. the farthest ancestor of the node or the node itself if it has no
***REMOVED***     parents.
***REMOVED***
goog.structs.TreeNode.prototype.getRoot = function() {
  var root = this;
  while (root.getParent()) {
    root = root.getParent();
  }
  return root;
***REMOVED***


***REMOVED***
***REMOVED*** Builds a nested array structure from the node keys in this node's subtree to
***REMOVED*** facilitate testing tree operations that change the hierarchy.
***REMOVED*** @return {!Array.<KEY>} The structure of this node's descendants as nested
***REMOVED***     array of node keys. The number of unclosed opening brackets up to a
***REMOVED***     particular node is proportional to the indentation of that node in the
***REMOVED***     graphical representation of the tree. Example:
***REMOVED***     <pre>
***REMOVED***       this
***REMOVED***       |- child1
***REMOVED***       |  L- grandchild
***REMOVED***       L- child2
***REMOVED***     </pre>
***REMOVED***     is represented as ['child1', ['grandchild'], 'child2'].
***REMOVED***
goog.structs.TreeNode.prototype.getSubtreeKeys = function() {
  var ret = [];
  this.forEachChild(function(child) {
    ret.push(child.getKey());
    if (!child.isLeaf()) {
      ret.push(child.getSubtreeKeys());
    }
  });
  return ret;
***REMOVED***


***REMOVED***
***REMOVED*** Tells whether this node is the ancestor of the given node.
***REMOVED*** @param {!goog.structs.TreeNode.<KEY, VALUE>} node A node.
***REMOVED*** @return {boolean} Whether this node is the ancestor of {@code node}.
***REMOVED***
goog.structs.TreeNode.prototype.contains = function(node) {
  var current = node;
  do {
    current = current.getParent();
  } while (current && current != this);
  return Boolean(current);
***REMOVED***


***REMOVED***
***REMOVED*** Finds the deepest common ancestor of the given nodes. The concept of
***REMOVED*** ancestor is not strict in this case, it includes the node itself.
***REMOVED*** @param {...!goog.structs.TreeNode.<KEY, VALUE>} var_args The nodes.
***REMOVED*** @return {goog.structs.TreeNode.<KEY, VALUE>} The common ancestor of the nodes
***REMOVED***     or null if they are from different trees.
***REMOVED*** @template KEY, VALUE
***REMOVED***
goog.structs.TreeNode.findCommonAncestor = function(var_args) {
  var ret = arguments[0];
  if (!ret) {
    return null;
  }

  var retDepth = ret.getDepth();
  for (var i = 1; i < arguments.length; i++) {
    var node = arguments[i];
    var depth = node.getDepth();
    while (node != ret) {
      if (depth <= retDepth) {
        ret = ret.getParent();
        retDepth--;
      }
      if (depth > retDepth) {
        node = node.getParent();
        depth--;
      }
    }
  }

  return ret;
***REMOVED***


***REMOVED***
***REMOVED*** Returns a node whose key matches the given one in the hierarchy rooted at
***REMOVED*** this node. The hierarchy is searched using an in-order traversal.
***REMOVED*** @param {KEY} key The key to search for.
***REMOVED*** @return {goog.structs.TreeNode.<KEY, VALUE>} The node with the given key, or
***REMOVED***     null if no node with the given key exists in the hierarchy.
***REMOVED***
goog.structs.TreeNode.prototype.getNodeByKey = function(key) {
  if (this.getKey() == key) {
    return this;
  }
  var children = this.getChildren();
  for (var i = 0; i < children.length; i++) {
    var descendant = children[i].getNodeByKey(key);
    if (descendant) {
      return descendant;
    }
  }
  return null;
***REMOVED***


***REMOVED***
***REMOVED*** Traverses all child nodes.
***REMOVED*** @param {function(this:THIS, !goog.structs.TreeNode.<KEY, VALUE>, number,
***REMOVED***     !Array.<!goog.structs.TreeNode.<KEY, VALUE>>)} f Callback function. It
***REMOVED***     takes the node, its index and the array of all child nodes as arguments.
***REMOVED*** @param {THIS=} opt_this The object to be used as the value of {@code this}
***REMOVED***     within {@code f}.
***REMOVED*** @template THIS
***REMOVED***
goog.structs.TreeNode.prototype.forEachChild = function(f, opt_this) {
  goog.array.forEach(this.getChildren(), f, opt_this);
***REMOVED***


***REMOVED***
***REMOVED*** Traverses all child nodes recursively in preorder.
***REMOVED*** @param {function(!goog.structs.TreeNode.<KEY, VALUE>)} f Callback function.
***REMOVED***     It takes the node as argument.
***REMOVED*** @param {Object=} opt_this The object to be used as the value of {@code this}
***REMOVED***     within {@code f}.
***REMOVED***
goog.structs.TreeNode.prototype.forEachDescendant = function(f, opt_this) {
  goog.array.forEach(this.getChildren(), function(child) {
    f.call(opt_this, child);
    child.forEachDescendant(f, opt_this);
  });
***REMOVED***


***REMOVED***
***REMOVED*** Traverses the subtree with the possibility to skip branches. Starts with
***REMOVED*** this node, and visits the descendant nodes depth-first, in preorder.
***REMOVED*** @param {function(this:THIS, !goog.structs.TreeNode.<KEY, VALUE>):
***REMOVED***     (boolean|undefined)} f Callback function. It takes the node as argument.
***REMOVED***     The children of this node will be visited if the callback returns true or
***REMOVED***     undefined, and will be skipped if the callback returns false.
***REMOVED*** @param {THIS=} opt_this The object to be used as the value of {@code this}
***REMOVED***     within {@code f}.
***REMOVED*** @template THIS
***REMOVED***
goog.structs.TreeNode.prototype.traverse = function(f, opt_this) {
  if (f.call(opt_this, this) !== false) {
    goog.array.forEach(this.getChildren(), function(child) {
      child.traverse(f, opt_this);
    });
  }
***REMOVED***


***REMOVED***
***REMOVED*** Sets the parent node of this node. The callers must ensure that the parent
***REMOVED*** node and only that has this node among its children.
***REMOVED*** @param {goog.structs.TreeNode.<KEY, VALUE>} parent The parent to set. If
***REMOVED***     null, the node will be detached from the tree.
***REMOVED*** @protected
***REMOVED***
goog.structs.TreeNode.prototype.setParent = function(parent) {
  this.parent_ = parent;
***REMOVED***


***REMOVED***
***REMOVED*** Appends a child node to this node.
***REMOVED*** @param {!goog.structs.TreeNode.<KEY, VALUE>} child Orphan child node.
***REMOVED***
goog.structs.TreeNode.prototype.addChild = function(child) {
  this.addChildAt(child, this.children_ ? this.children_.length : 0);
***REMOVED***


***REMOVED***
***REMOVED*** Inserts a child node at the given index.
***REMOVED*** @param {!goog.structs.TreeNode.<KEY, VALUE>} child Orphan child node.
***REMOVED*** @param {number} index The position to insert at.
***REMOVED***
goog.structs.TreeNode.prototype.addChildAt = function(child, index) {
  goog.asserts.assert(!child.getParent());
  child.setParent(this);
  this.children_ = this.children_ || [];
  goog.asserts.assert(index >= 0 && index <= this.children_.length);
  goog.array.insertAt(this.children_, child, index);
***REMOVED***


***REMOVED***
***REMOVED*** Replaces a child node at the given index.
***REMOVED*** @param {!goog.structs.TreeNode.<KEY, VALUE>} newChild Child node to set. It
***REMOVED***     must not have parent node.
***REMOVED*** @param {number} index Valid index of the old child to replace.
***REMOVED*** @return {!goog.structs.TreeNode.<KEY, VALUE>} The original child node,
***REMOVED***     detached from its parent.
***REMOVED***
goog.structs.TreeNode.prototype.replaceChildAt = function(newChild, index) {
  goog.asserts.assert(!newChild.getParent(),
      'newChild must not have parent node');
  var children = this.getChildren();
  var oldChild = children[index];
  goog.asserts.assert(oldChild, 'Invalid child or child index is given.');
  oldChild.setParent(null);
  children[index] = newChild;
  newChild.setParent(this);
  return oldChild;
***REMOVED***


***REMOVED***
***REMOVED*** Replaces the given child node.
***REMOVED*** @param {!goog.structs.TreeNode.<KEY, VALUE>} newChild New node to replace
***REMOVED***     {@code oldChild}. It must not have parent node.
***REMOVED*** @param {!goog.structs.TreeNode.<KEY, VALUE>} oldChild Existing child node to
***REMOVED***     be replaced.
***REMOVED*** @return {!goog.structs.TreeNode.<KEY, VALUE>} The replaced child node
***REMOVED***     detached from its parent.
***REMOVED***
goog.structs.TreeNode.prototype.replaceChild = function(newChild, oldChild) {
  return this.replaceChildAt(newChild,
      goog.array.indexOf(this.getChildren(), oldChild));
***REMOVED***


***REMOVED***
***REMOVED*** Removes the child node at the given index.
***REMOVED*** @param {number} index The position to remove from.
***REMOVED*** @return {goog.structs.TreeNode.<KEY, VALUE>} The removed node if any.
***REMOVED***
goog.structs.TreeNode.prototype.removeChildAt = function(index) {
  var child = this.children_ && this.children_[index];
  if (child) {
    child.setParent(null);
    goog.array.removeAt(this.children_, index);
    if (this.children_.length == 0) {
      delete this.children_;
    }
    return child;
  }
  return null;
***REMOVED***


***REMOVED***
***REMOVED*** Removes the given child node of this node.
***REMOVED*** @param {goog.structs.TreeNode.<KEY, VALUE>} child The node to remove.
***REMOVED*** @return {goog.structs.TreeNode.<KEY, VALUE>} The removed node if any.
***REMOVED***
goog.structs.TreeNode.prototype.removeChild = function(child) {
  return this.removeChildAt(goog.array.indexOf(this.getChildren(), child));
***REMOVED***


***REMOVED***
***REMOVED*** Removes all child nodes of this node.
***REMOVED***
goog.structs.TreeNode.prototype.removeChildren = function() {
  if (this.children_) {
    goog.array.forEach(this.children_, function(child) {
      child.setParent(null);
    });
  }
  delete this.children_;
***REMOVED***
