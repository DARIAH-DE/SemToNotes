/**
 * @fileoverview A static class providing functions for XML indentation.
 */

goog.provide('xrx.xml.Indent');



/**
 * A static class providing functions for XML indentation.
 */
xrx.xml.Indent = function() {};



/**
 * Serialize a XML fragment with indentation in forward direction.
 * @return {string} The indented XML fragment.
 */
xrx.xml.Indent.forward = function(xml, indent, opt_start, opt_maxLines) {
  var traverse = new xrx.xml.Traverse(xml);
  var lastToken = opt_start ? opt_start.type() : xrx.token.UNDEFINED;
  var output = '';
  var lines = 0;

  var line = function(label, offset, length1, length2) {

    output += traverse.xml().substr(offset, length1);

    if (length1 !== length2) {
      output += traverse.xml().substr(offset + length1, length2 - length1);
    }
  };
  
  var newLine = function(label, offset, length1, length2) {
    var level = label.length() - 1;

    output += '\n';

    for(var i = 0, ind = level * indent; i < ind; i++) {
      output += ' ';
    }
    line(label, offset, length1, length2);
    if (opt_maxLines && (++lines >= opt_maxLines)) traverse.stop();
  };

  var inLine = function(label, offset, length1, length2) {

    line(label, offset, length1, length2);
  };
  
  traverse.rowStartTag = function(label, offset, length1, length2) {

    if (lastToken === xrx.token.START_TAG || lastToken === xrx.token.END_TAG) {
      newLine(label, offset, length1, length2);
    } else {
      inLine(label, offset, length1, length2);
    };

    length1 !== length2 ? lastToken = xrx.token.NOT_TAG : 
        lastToken = xrx.token.START_TAG;
  };
  
  traverse.rowEmptyTag = function(label, offset, length1, length2) {

    if (lastToken === xrx.token.START_TAG || lastToken === xrx.token.END_TAG) {
      newLine(label, offset, length1, length2);
    } else {
      inLine(label, offset, length1, length2);
    };

    length1 !== length2 ? lastToken = xrx.token.NOT_TAG : 
      lastToken = xrx.token.END_TAG;
  };
  
  traverse.rowEndTag = function(label, offset, length1, length2) {

    if (lastToken === xrx.token.NOT_TAG || lastToken === xrx.token.START_TAG) {
      inLine(label, offset, length1, length2);
    } else {
      newLine(label, offset, length1, length2);
    }

    length1 !== length2 ? lastToken = xrx.token.NOT_TAG : 
      lastToken = xrx.token.END_TAG;
  };
  
  traverse.forward(opt_start);
  
  return output;
};



/**
 * Serialize a XML fragment with indentation in backward direction.
 * @return {string} The indented XML fragment.
 */
xrx.xml.Indent.backward = function(xml, indent, opt_start, opt_maxLines) {
  var traverse = new xrx.xml.Traverse(xml);
  var lastToken = opt_start ? opt_start.type() : xrx.token.UNDEFINED;
  var output = '';
  var lines = 0;

  var line = function(label, offset, length1, length2) {

    if (length1 !== length2) {
      output = traverse.xml().substr(offset + length1, length2 - length1) + output;
    }

    output = traverse.xml().substr(offset, length1) + output;
  };
  
  var newLine = function(label, offset, length1, length2) {
    var level = label.length() - 1;

    for(var i = 0, ind = level * indent; i < ind; i++) {
      output = ' ' + output;
    }

    output = '\n' + output;

    line(label, offset, length1, length2);

    if (opt_maxLines && (++lines >= opt_maxLines)) traverse.stop();
  };

  var inLine = function(label, offset, length1, length2) {

    line(label, offset, length1, length2);
  };
  
  traverse.rowStartTag = function(label, offset, length1, length2) {

    if (lastToken === xrx.token.START_TAG) {
      label.push(0);
      newLine(label, offset, length1, length2);
    } else {
      inLine(label, offset, length1, length2);
    }

    lastToken = xrx.token.START_TAG;
  };
  
  traverse.rowEmptyTag = function(label, offset, length1, length2) {

    if (lastToken === xrx.token.END_TAG) {
      label.parent();
      newLine(label, offset, length1, length2);
    } else {
      newLine(label, offset, length1, length2);
    }

    lastToken = xrx.token.START_TAG;
  };
  
  traverse.rowEndTag = function(label, offset, length1, length2) {

    if (lastToken === xrx.token.UNDEFINED) {
      inLine(label, offset, length1, length2);
    } else if (lastToken === xrx.token.END_TAG) {
      label.parent();
      newLine(label, offset, length1, length2);
    } else {
      newLine(label, offset, length1, length2);
    }

    lastToken = xrx.token.END_TAG;
  };
  
  traverse.backward(opt_start);
  
  return output;
};
