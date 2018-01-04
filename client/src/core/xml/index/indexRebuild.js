/**
 * @fileoverview A static class providing rebuild operations on binary encodings. 
 */

goog.provide('xrx.index.Rebuild');



goog.require('goog.object');
goog.require('xrx.token');
goog.require('xrx.token.StartEmptyTag');



/**
 *
 */
xrx.index.Rebuild = function() {};



/**
 * Shared function to recalculate index offsets after a update
 * operation that requires no relabeling.
 * @param {!xrx.index} index The index.
 * @param {!integer} diff The offset difference.
 */
xrx.index.Rebuild.offset = function(struct, diff) {
  do {
    struct.updateOffset(diff);
  } while (struct.next());
};



/**
 * Shared function to recalculate index offsets and labels after a update
 * operation that requires relabeling.
 * @param {!xrx.index} index The index.
 * @param {!integer} diff The offset difference.
 * @param {!integer} parentKey The index key of the parent token which was
 * updated.
 * @param {!number} numParent Number of subsequent rows that were removed or
 * inserted. Positive integer, if rows were inserted and negative integer if
 * rows were removed.
 * @param {!number} numPosition Number of positions decremented or incremented
 * during remove or insert. Positive integer for insertions, negative for deletions.
 */
xrx.index.Rebuild.relabel = function(struct, diff, start, end) {
  var k;
  var p;
  var key;
  var type;
  var label;
  struct.atPos(end);
  var length = struct.getLabel().length();
  struct.previous();
  do {
    k = struct.getKey();
    p = struct.getPos();
    if (p === start) break;
    type = struct.getType();
    label = struct.getLabel();
    label.getArray()[length]++;
    key = struct.createKey(type, label);
    struct.updateOffset(diff);
    struct.rename(k, key);
  } while (struct.previous());
  struct.atPos(end);
  xrx.index.Rebuild.offset(struct, diff);
};



/**
 * Rebuilds an index after an XML instance has been updated by
 * an insertAttribute update operation.
 * 
 * @param {!xrx.index} index The index.
 * @param {!(xrx.token.StartTag|xrx.token.EmptyTag)} parent The tag token into which the
 * attribute was inserted.
 * @param {!integer} diff The length difference of the updated parent token.
 */
xrx.index.Rebuild.insertAttribute = function(index, parent, diff) {
  var struct = index.getStructuralIndex();
  var key = struct.createKey(parent.type(), parent.label());
  struct.atKey(key);
  struct.updateLength1(diff);
  struct.updateLength2(diff);
  struct.next();
  xrx.index.Rebuild.offset(struct, diff);  
};




/**
 * Rebuilds an index after a XML instance has been updated by
 * an insertEmptyTag update operation.
 * 
 * @param {!xrx.index} index The index.
 * @param {!xrx.token.NotTag} token The not-tag token into which the empty tag
 *   was inserted.
 * @param {!integer} token The offset relative to the not-tag token where the
 *   empty tag was inserted.
 * @param {!integer} diff The length difference of the updated token.
 */
xrx.index.Rebuild.insertEmptyTag = function(index, notTag, rowType, offset, diff) {
  var struct = index.getStructuralIndex();
  var rowLabel = notTag.label().clone();
  if (rowLabel.last() === 0) rowLabel.pop();
  var parentLabel = notTag.label().clone();
  parentLabel.pop();
  struct.atKey(struct.createKey(rowType, rowLabel));

  var length1 = struct.getLength1();
  var length2 = struct.getLength2();
  var rest = length2 - length1 - offset;
  
  // set length of updated row
  struct.updateLength2(length1 + offset - length2);

  // search row to start relabeling
  var start = struct.getPos();
  struct.atKey(struct.createKey(xrx.token.END_TAG, parentLabel));
  var end = struct.getPos();
  // rebuild all following siblings
  xrx.index.Rebuild.relabel(struct, diff, start, end);

  // insert new row
  struct.atPos(start);
  var newRow = new Array(3);
  newRow[0] = struct.getOffset() + struct.getLength2();
  newRow[1] = diff;
  newRow[2] = diff + rest;
  var newLabel = notTag.label().clone();
  newLabel.nextSibling();
  var newKey = struct.createKey(xrx.token.EMPTY_TAG, newLabel);
  struct.insert(newKey, newRow);
};



/**
 * 
 */
xrx.index.Rebuild.insertFragment = function(index, xml) {
  index.rebuild(xml);
};



/**
 * 
 */
xrx.index.Rebuild.insertMixed = function(index, token, offset, diff) {
  //TODO: implement this
};



/**
 * Rebuilds an index after an XML instance has been updated by
 * an insertNotTag update operation.
 * 
 * @param {!xrx.index} index The index.
 * @param {!xrx.token.NotTag} token The not-tag token which was updated.
 * @param {!integer} diff The length difference of the updated token.
 */
xrx.index.Rebuild.insertNotTag = function(index, notTag, rowType, diff) {
  var struct = index.getStructuralIndex();
  var rowLabel = notTag.label().clone();
  if (rowLabel.last() === 0) rowLabel.pop();
  struct.atKey(struct.createKey(rowType, rowLabel));
  console.log(struct.getKey());
  struct.updateLength2(diff);
  struct.next();
  xrx.index.Rebuild.offset(struct, diff);
};



/**
 * 
 */
xrx.index.Rebuild.insertStartEndTag = function(index, token1, token2, offset1, offset2,
    diff1, diff2) {
  // TODO: implement this
};



/**
 * Rebuilds an index after a XML instance has been updated by
 * a removeAttribute update operation.
 * TODO: handle namespace declaration
 * 
 * @param {!xrx.index} index The index.
 * @param {!xrx.token.Attribute} token The attribute token which was removed.
 * @param {!integer} diff The length difference of the updated parent token.
 */
xrx.index.Rebuild.removeAttribute = function(index, token, rowType, diff) {
  var struct = index.getStructuralIndex();
  var parentLabel = token.label().clone();
  parentLabel.parent();
  struct.atKey(struct.createKey(rowType, parentLabel));
  struct.updateLength1(diff);
  struct.updateLength2(diff);
  struct.next();
  xrx.index.Rebuild.offset(struct, diff);  
};



/**
 * Rebuilds an index after a XML instance has been updated by
 * a removeEmptyTag update operation.
 * 
 * @param {!xrx.index} index The index.
 * @param {!xrx.token.EmptyTag} token The empty tag which was removed.
 * @param {!integer} diff The length difference of the updated empty tag token.
 */
xrx.index.Rebuild.removeEmptyTag = function(index, token, diff) {
  var key = index.getKeyByNotTag(token);
  var row = index.getRowByKey(key);
  var length1 = row.getLength1();
  var length2 = row.getLength2();
  var notTagLength = length2 - length1;

  // rebuild row before
  index.iterSetKey(key);
  index.iterPrevious();
  var rowBefore = index.iterGetRow();
  rowBefore.updateLength2(notTagLength);
  
  // remove updated row
  index.removeRow(key);

  // rebuild all following rows
  var parentLabel = token.label().clone();
  parentLabel.parent();
  var parentToken = new xrx.token.StartEmptyTag(parentLabel);
  var parentKey = index.getKeyByTag(parentToken);

  index.iterSetKey(key);

  xrx.index.Rebuild.relabel(index, diff, parentKey, -1, -1);
};



/**
 *
 */
xrx.index.Rebuild.removeFragment = function(index, xml) {
  index.rebuild(xml);
};



/**
 *
 */
xrx.index.Rebuild.removeMixed = function() {
};



/**
 * Rebuilds an index after a XML instance has been updated by
 * a removeStartEndTag update operation.
 * TODO: handle namespace declaration
 * 
 * @param {!xrx.index} index The index.
 * @param {!xrx.token.EmptyTag} token The empty tag which was removed.
 * @param {!integer} diff The length difference of the updated empty tag token.
 */
xrx.index.Rebuild.removeStartEndTag = function(index, token1, token2, diff1, diff2) {
  // get token1
  var key1 = index.getKeyByTag(token1);
  var row1 = index.getRowByKey(key1);
  var offset1 = row1.getOffset();
  var length11 = row1.getLength1();
  var length12 = row1.getLength2();
  var notTagLength1 = length12 - length11;
  // get token2
  var key2 = index.getKeyByTag(token2);
  var row2 = index.getRowByKey(key2);
  var offset2 = row2.getOffset();
  var length21 = row2.getLength1();
  var length22 = row2.getLength2();
  var notTagLength2 = length22 - length21;

  // end-tag row directly after start-tag row
  if (key1 === key2 - 1) {

    // rebuild row before token1
    index.iterSetKey(key1);
    index.iterPrevious();
    var rowBefore = index.iterGetRow();
    rowBefore.updateLength2(notTagLength1 + notTagLength2);

    // remove both rows
    index.removeRow(key1, 2);

    var parentLabel = token1.label().clone();
    parentLabel.parent();
    var parentToken = new xrx.token.StartEmptyTag(parentLabel);
    var parentKey = index.getKeyByTag(parentToken);

    index.iterSetKey(key1);

    xrx.index.Rebuild.relabel(index, diff1 + diff2, parentKey, -2, -1);

  } else {

    //TODO: implement this
  }
};



/**
 * Rebuilds an index after an XML instance has been updated by
 * a replaceAttrValue update operation.
 * 
 * @param {!xrx.index} index The index.
 * @param {!xrx.token.AttrValue} token The attribute value token which was updated.
 * @param {!integer} diff The length difference of the updated token.
 */
xrx.index.Rebuild.replaceAttrValue = function(index, token, rowType, diff) {
  var struct = index.getStructuralIndex();
  var parentLabel = token.label().clone();
  parentLabel.parent();
  struct.atKey(struct.createKey(rowType, parentLabel));
  struct.updateLength1(diff);
  struct.updateLength2(diff);
  struct.next();
  xrx.index.Rebuild.offset(struct, diff);
};



/**
 * Rebuilds an index after a XML instance has been updated by
 * a replaceNotTag update operation.
 * 
 * @param {!xrx.index} index The index.
 * @param {!xrx.token.NotTag} token The not-tag token which was updated.
 * @param {!integer} diff The length difference of the updated token.
 */
xrx.index.Rebuild.replaceNotTag = function(index, token, rowType, diff) {
  var struct = index.getStructuralIndex();
  var rowLabel = token.label().clone();
  if (rowLabel.last() === 0) rowLabel.pop();
  struct.atKey(struct.createKey(rowType, rowLabel));
  struct.updateLength2(diff);
  struct.next();
  xrx.index.Rebuild.offset(struct, diff);
};



/**
 * 
 */
xrx.index.Rebuild.replaceTagName = function(instance, token, localName, opt_namespaceUri) {
  //TODO: implement this
};
