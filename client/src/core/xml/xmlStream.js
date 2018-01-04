/**
 * @fileoverview A class to stream the tokens of an XML instance.
 * TODO(jochen): test special cases like <a b="/>"/>
 */

goog.provide('xrx.xml.Stream');



goog.require('goog.object');
goog.require('goog.string');
goog.require('xrx.xml.Event');
goog.require('xrx.xml.Lexer');
goog.require('xrx.xml.Location');
goog.require('xrx.xml.Reader');
goog.require('xrx.token');



/**
 * A class to stream the tokens of an XML instance.
 * @param {!string} xml A well-formed, normalized XML instance.
 * Make sure that the XML input is parsed with {@link xrx.xml.Parser}
 * beforehand.
 * @constructor
 */
xrx.xml.Stream = function(xml) {

  goog.base(this);

  /**
   * @type
   * @private
   */
  this.reader_ = new xrx.xml.Reader(xml);

  /**
   * Whether the stream is stopped.
   * @type {boolean}
   * @private
   */
  this.stopped_ = false;
};
goog.inherits(xrx.xml.Stream, xrx.xml.Event);



/**
 * Returns or sets the content of the current stream reader.
 * @param opt_xml Well-formed, normalized UTF-8 XML string.
 * @return The content of the stream reader.
 */
xrx.xml.Stream.prototype.xml = function(opt_xml) {
  return !opt_xml ? this.reader_.input() : this.reader_.input(opt_xml);
};



/**
 * Updates the XML stream at a location.
 * @param {!number} offset The offset.
 * @param {!number} length Number of characters to replace.
 * @param {!string} xml The new string.
 */
xrx.xml.Stream.prototype.update = function(offset, length, xml) {
  this.reader_.input(this.xml().substr(0, offset) + xml + 
      this.xml().substr(offset + length));
};



/**
 * Can be called to stop streaming.
 */
xrx.xml.Stream.prototype.stop = function() {
  this.stopped_ = true;
};



/**
 * Returns or sets the position of the stream reader.
 * @param opt_pos The position.
 * @return {!number} The position or the new position.
 */
xrx.xml.Stream.prototype.pos = function(opt_pos) {
  if (opt_pos) this.reader_.set(opt_pos);
  return this.reader_.pos();
};



/**
 * Throws events for the secondary tokens of a tag for the features
 * turned on.
 * TODO(jochen): can we avoid re-parsing of tokens?
 * @param token The current token.
 * @param {!number} offset The current offset.
 * @param {!number} length The current length.
 */
xrx.xml.Stream.prototype.features = function(token, offset, length) {
  var stream = this;

  if (stream.oneFeatureOn_ === true) {
    var tag = stream.xml().substr(offset, length);
    // tag name feature on?
    if (stream.hasFeature('TAG_NAME')) {
      var name = stream.tagName(tag);
      stream.eventTagName(name.offset + offset, name.length);
    }
    // attribute or namespace feature on?
    if (stream.hasFeature('NAMESPACE') || stream.hasFeature('ATTRIBUTE') ||
        stream.hasFeature('ATTR_NAME') || stream.hasFeature('ATTR_VALUE') ||
        stream.hasFeature('NS_PREFIX') || stream.hasFeature('NS_URI')) {
      if ((token === xrx.token.START_TAG || token === xrx.token.EMPTY_TAG)) {
        var atts = stream.secondaries(tag);
        goog.object.forEach(atts, function(att, pos, atts) {
          if (goog.string.startsWith(att.xml(tag), 'xmlns:') ||
              goog.string.startsWith(att.xml(tag), 'xmlns=')) {
            // namespace feature on?
            if (stream.hasFeature('NAMESPACE')) {
              stream.eventNamespace(att.offset + offset, att.length);
            }
            // namespace prefix feature on?
            if (stream.hasFeature('NS_PREFIX')) {
              var nsPrefix = stream.attr_(tag, 1, xrx.token.ATTR_NAME, att.offset);
              stream.eventNsPrefix(nsPrefix.offset + offset, nsPrefix.length);
            }
            // namespace uri feature on?
            if (stream.hasFeature('NS_URI')) {
              var nsUri = stream.attr_(tag, 1, xrx.token.ATTR_VALUE, att.offset);
              stream.eventNsUri(nsUri.offset + offset, nsUri.length);
            }
          } else {
            // attribute on?
            if (stream.hasFeature('ATTRIBUTE')) {
              stream.eventAttribute(att.offset + offset, att.length);
            }
            // attribute name feature on?
            if (stream.hasFeature('ATTR_NAME')) {
              var attrName = stream.attr_(tag, 1, xrx.token.ATTR_NAME, att.offset);
              stream.eventAttrName(attrName.offset + offset, attrName.length);
            }
            // attribute value feature on?
            if (stream.hasFeature('ATTR_VALUE')) {
              var attrValue = stream.attr_(tag, 1, xrx.token.ATTR_VALUE, att.offset);
              stream.eventAttrValue(attrValue.offset + offset, attrValue.length);
            }
          }
        });
      }
    }
  }
};



/**
 * Enumeration of internal states used by the streamer.
 * @enum
 * @private
 */
xrx.xml.Stream.State_ = {
  ATTR_NAME: 'ATTR_NAME',
  ATTR_VAL: 'ATTR_VAL',
  CDATA: 'CDATA',
  COMMENT: 'COMMENT',
  EMPTY_TAG: 'EMPTY_TAG',
  END_TAG: 'END_TAG',
  GT_SEEN: 'GT_SEEN',
  LT_SEEN: 'LT_SEEN',
  NOT_TAG: 'NOT_TAG',
  PI: 'PI',
  START_TAG: 'START_TAG',
  TAG_NAME: 'TAG_NAME',
  TAG_START: 'TAG_START',
  TOK_END: 'TOK_END',
  WS_SEEN: 'WS_SEEN',
  XML_DECL: 'XML_DECL',
  XML_END: 'XML_END',
  XML_PROLOG: 'XML_PROLOG'
};



/**
 * Streams an XML document or XML fragment in forward direction
 * and fires start-row, end-row, empty row and namespace events. 
 * The streaming starts at the beginning of the XML instance by
 * default or optionally at an offset.
 * @param {?number} opt_offset The offset.
 */
xrx.xml.Stream.prototype.forward = function(opt_offset) {
  var state = xrx.xml.Stream.State_.XML_PROLOG;
  var token;
  var offset;
  var length;
  var reader = this.reader_;
  var isCdata = false;

  !opt_offset ? reader.first() : reader.set(opt_offset);
  this.stopped_ = false;

  var process = {
    'CDATA': function(stream) {
      reader.forward('![CDATA['.length);
      while (!xrx.xml.Lexer.atCDEnd(reader)) {
        reader.forwardExclusive(']');
      };
      reader.forwardInclusive('>');
      state = xrx.xml.Stream.State_.NOT_TAG;
      isCdata = true;
    },
    'COMMENT': function(stream) {
      offset = reader.pos();
      reader.forward('!--'.length);
      while (!xrx.xml.Lexer.atCommentEnd(reader)) {
        reader.forwardExclusive('-');
      };
      reader.forwardInclusive('>');
      state = xrx.xml.Stream.State_.NOT_TAG;
      token = xrx.token.COMMENT;
      length = reader.pos() - offset;
    },
    'END_TAG': function() {
      offset = reader.pos();
      reader.forwardInclusive('>');
      state = xrx.xml.Stream.State_.NOT_TAG;
      token = xrx.token.END_TAG;
      length = reader.pos() - offset;
    },
    'EMPTY_TAG': function() {},
    'LT_SEEN': function() {
      if (xrx.xml.Lexer.atEndTag(reader)) {
        state = xrx.xml.Stream.State_.END_TAG;
      } else if (xrx.xml.Lexer.atCommentStart(reader)) {
        state = xrx.xml.Stream.State_.COMMENT;
      } else if (xrx.xml.Lexer.atPIStart(reader)) {
        state = xrx.xml.Stream.State_.PI;
      } else if (xrx.xml.Lexer.atCDStart(reader)) {
        state = xrx.xml.Stream.State_.CDATA;
      } else {
        state = xrx.xml.Stream.State_.START_TAG;
      }
    },
    'NOT_TAG': function(stream) {
      if (!reader.get()) {
        state = xrx.xml.Stream.State_.XML_END;
      } else if (reader.get() === '<') {
        state = xrx.xml.Stream.State_.LT_SEEN;
      } else {
        reader.forwardExclusive('<');
        state = xrx.xml.Stream.State_.LT_SEEN;
      }
      if (xrx.xml.Lexer.atCDStart(reader)) return;
      if (isCdata) stream.rowCDATA();
      isCdata = false;
      // if we have parsed the not-tag, the row is complete.
      if (token === xrx.token.START_TAG) {
        stream.rowStartTag(offset, length, reader.pos() - offset);
      } else if (token === xrx.token.END_TAG) {
        stream.rowEndTag(offset, length, reader.pos() - offset);
      } else if (token === xrx.token.EMPTY_TAG) {
        stream.rowEmptyTag(offset, length, reader.pos() - offset);
      } else if (token === xrx.token.COMMENT) {
        stream.rowComment(offset, length, reader.pos() - offset);
      } else if (token === xrx.token.PI) {
        stream.rowPI(offset, length, reader.pos() - offset);
      } else {}

      stream.features(token, offset, length);
    },
    'PI': function() {
      offset = reader.pos();
      while (!xrx.xml.Lexer.atPIEnd(reader)) {
        reader.forwardExclusive('?');
      };
      reader.forward('?>'.length);
      state = xrx.xml.Stream.State_.NOT_TAG;
      token = xrx.token.PI;
      length = reader.pos() - offset;
    },
    'START_TAG': function() {
      offset = reader.pos();
      reader.forwardInclusive('>');
      state = xrx.xml.Stream.State_.NOT_TAG;
      reader.peek(-2) === '/' ? token = xrx.token.EMPTY_TAG : 
          token = xrx.token.START_TAG;
      length = reader.pos() - offset;
    },
    'XML_DECL': function(stream) {
      offset = reader.pos();
      reader.forwardInclusive('>');
      state = xrx.xml.Stream.State_.XML_PROLOG;
      if (stream.hasFeature('XML_DECL')) {
        stream.eventXmlDecl(offset, reader.pos() - offset);
      }
    }, 
    'XML_END': function() {},
    'XML_PROLOG': function() {
      if (reader.pos() === 0 && xrx.xml.Lexer.atXmlDecl(reader)) {
        state = xrx.xml.Stream.State_.XML_DECL;
      } else if (reader.get() === '<') {
        state = xrx.xml.Stream.State_.LT_SEEN;
      } else {
        state = xrx.xml.Stream.State_.NOT_TAG;
      }
    }
  };
  for (;;) {
    if (process[state]) { 
      process[state](this);
    } else {
      throw Error('Invalid parser state.');
    }
    if (state === xrx.xml.Stream.State_.XML_END || this.stopped_) {
      this.stopped_ = false;
      break;
    }
  }
};



/**
 * Streams an XML document or XML fragment in backward direction
 * and fires start-row, end-row, empty row and namespace events. The 
 * streaming starts at the end of the XML instance by default or
 * optionally at an offset.
 * @param {?number} opt_offset The offset.
 */
xrx.xml.Stream.prototype.backward = function(opt_offset) {
  var state = xrx.xml.Stream.State_.XML_PROLOG;
  var reader = this.reader_;
  var token;
  var offset;
  var length;
  var isCdata = false;
  var pos = !opt_offset ? reader.length() : opt_offset;

  !opt_offset ? reader.last() : reader.set(opt_offset);
  this.stopped_ = false;

  var process = {
    'CDATA': function(stream) {
      reader.backward(']]'.length);
      do {
        reader.backwardInclusive('[');
      } while (!xrx.xml.Lexer.atCDStart(reader, true));
      reader.backwardInclusive('<');
      state = xrx.xml.Stream.State_.NOT_TAG;
      reader.previous();
      isCdata = true;
      if (reader.finished()) state = xrx.xml.Stream.State_.XML_END;
    },
    'COMMENT': function(stream) {
      offset = reader.pos();
      reader.backward('--'.length);
      do {
        reader.backwardInclusive('-');
      } while (!xrx.xml.Lexer.atCommentStart(reader, true));
      reader.backwardInclusive('<');
      state = xrx.xml.Stream.State_.NOT_TAG;
      var off = reader.pos();
      var len1 = offset - reader.pos() + 1;
      // throw event
      if (isCdata) stream.rowCDATA();
      isCdata = false;
      stream.rowComment(off, len1, pos - reader.pos());
      pos = reader.pos();
      reader.previous();
      if (reader.finished()) state = xrx.xml.Stream.State_.XML_END;
    },
    'EMPTY_TAG': function(stream) {
      offset = reader.pos();
      reader.backwardInclusive('<');
      state = xrx.xml.Stream.State_.NOT_TAG;
      var off = reader.pos();
      var len1 = offset - reader.pos() + 1;
      // throw event
      if (isCdata) stream.rowCDATA();
      stream.rowEmptyTag(off, len1, pos - reader.pos());
      isCdata = false;
      pos = reader.pos();
      stream.features(xrx.token.EMPTY_TAG, off, len1);
      reader.previous();
      if (reader.finished()) state = xrx.xml.Stream.State_.XML_END;
    },
    'END_TAG': function(stream) {
      offset = reader.pos();
      reader.backwardInclusive('<');
      state = xrx.xml.Stream.State_.NOT_TAG;
      if (reader.peek(1) !== '/') {
        var off = reader.pos();
        var len1 = offset - reader.pos() + 1;
        // throw event
        if (isCdata) stream.rowCDATA();
        stream.rowStartTag(off, len1, pos - reader.pos());
        isCdata = false;
        pos = reader.pos();
        stream.features(xrx.token.START_TAG, off, len1);
      } else {
        // throw event
        if (isCdata) stream.rowCDATA();
        stream.rowEndTag(reader.pos(), offset - reader.pos() + 1, pos - reader.pos());
        isCdata = false;
        pos = reader.pos();
        stream.features(xrx.token.END_TAG, reader.pos(), offset - reader.pos() + 1);
      }
      reader.previous();
      if (reader.finished()) state = xrx.xml.Stream.State_.XML_END;
    },
    'GT_SEEN': function() {
      if (reader.peek(-1) === '/') {
        state = xrx.xml.Stream.State_.EMPTY_TAG;
      } else if (xrx.xml.Lexer.atCommentEnd(reader, true)) {
        state = xrx.xml.Stream.State_.COMMENT;
      } else if (xrx.xml.Lexer.atPIEnd(reader, true)) {
        state = xrx.xml.Stream.State_.PI;
      } else if (xrx.xml.Lexer.atCDEnd(reader, true)) {
        state = xrx.xml.Stream.State_.CDATA;
      } else {
        state = xrx.xml.Stream.State_.END_TAG;
      }
    },
    'NOT_TAG': function(stream) {
      if (reader.get() === '>') {
        state = xrx.xml.Stream.State_.GT_SEEN;
      } else {
        offset = reader.pos();
        reader.backwardExclusive('>');
        reader.previous();
        state = xrx.xml.Stream.State_.GT_SEEN;
      }
      if (reader.finished()) state = xrx.xml.Stream.State_.XML_END;
    },
    'PI': function(stream) {
      offset = reader.pos();
      reader.backward('?'.length);
      while (!xrx.xml.Lexer.atPIStart(reader, true)) {
        reader.backwardInclusive('?');
      };
      reader.backward('<'.length);
      state = xrx.xml.Stream.State_.NOT_TAG;
      var off = reader.pos();
      var len1 = offset - reader.pos() + 1;
      // throw event
      if (isCdata) stream.rowCDATA();
      stream.rowPI(off, len1, pos - reader.pos());
      isCdata = false;
      pos = reader.pos();
      reader.previous();
      if (reader.finished()) state = xrx.xml.Stream.State_.XML_END;
    },
    'START_TAG': function() {},
    'XML_END': function() {},
    'XML_PROLOG': function() {
      if (reader.get() === '<') reader.previous();
      reader.get() === '>' ? state = xrx.xml.Stream.State_.GT_SEEN : 
          state = xrx.xml.Stream.State_.NOT_TAG;
    }
  };
  for (;;) {
    if (process[state]) { 
      process[state](this);
    } else {
      throw Error('Invalid parser state.');
    }
    if (state === xrx.xml.Stream.State_.XML_END || this.stopped_) {
      this.stopped_ = false;
      break;
    }
  }
};



/**
 * Streams a start-tag, an empty tag or an end-tag and
 * returns the location of the name of the tag.
 * @param {!string} xml The tag.
 * @param {?xrx.xml.Reader} opt_reader Optional reader object.
 * @return {!xrx.xml.Location} The tag-name.
 */
xrx.xml.Stream.prototype.tagName = function(xml, opt_reader) {
  var state = xrx.xml.Stream.State_.TAG_START;
  var offset;
  var length;
  var reader = opt_reader || new xrx.xml.Reader(xml);

  this.stopped_ = false;

  var process = {
    'TAG_START': function() {
      if (reader.next() === '<') {
        state = xrx.xml.Stream.State_.TAG_NAME;
        if (reader.get() === '/') reader.next();
        offset = reader.pos();
      } else {
        throw Error('< is expected.');
      }
    },
    'TAG_NAME': function() {
      var next = reader.next();
      if (next === ' ' || next === '/' || next === '>') {
        state = xrx.xml.Stream.State_.TOK_END;
        reader.backward();
        length = reader.pos() - offset - 1;
      }
    }
  };
  for (;;) {
    if (process[state]) { 
      process[state](this);
    } else {
      throw Error('Invalid parser state.');
    }
    if (state === xrx.xml.Stream.State_.TOK_END) break; 
  }
  return new xrx.xml.Location(offset, length);
};



/**
 * Streams a start-tag or an empty tag and returns the location
 * of the n'th attribute, or null if the attribute does not exist.
 * @param {!string} xml The start-tag or empty tag string.
 * @param {!number} pos The attribute position.
 * @param {?number} opt_offset Offset where to start streaming if known.
 * @return {string|null} The attribute at position n or null.
 */
xrx.xml.Stream.prototype.attribute = function(xml, pos, opt_offset) {
  return this.attr_(xml, pos, xrx.token.ATTRIBUTE, opt_offset);
};



/**
 * Streams a start-tag or an empty tag and returns an array of 
 * locations of all attributes found in the tag.
 * @param {!string} xml The start-tag or empty tag string.
 * @return {Array<xrx.xml.Location>} The location array.
 */
xrx.xml.Stream.prototype.attributes = function(xml) {
  var locs = {};
  var location = new xrx.xml.Location();
  for(var i = 1;;i++) {
    var newLocation = this.attribute(xml, i, location.offset + location.length);
    if (!newLocation) break;
    
    if(newLocation.xml(xml).match(/^xmlns(:|=)/) === null) locs[i] = newLocation;
  }
  return locs;
};



/**
 * Streams a start-tag or an empty tag and returns an array of 
 * locations of all namespaces found in the tag.
 * @param {!string} xml The start-tag or empty tag string.
 * @return {Array<xrx.xml.Location>} The location array.
 */
xrx.xml.Stream.prototype.namespaces = function(xml) {
  var locs = {};
  var location = new xrx.xml.Location();

  for(var i = 1;;i++) {
    var newLocation = this.attribute(xml, i, location.offset + location.length);
    if (!newLocation) break;
    
    if(newLocation.xml(xml).match(/^xmlns(:|=)/) !== null) locs[i] = newLocation;
  }

  return locs;
};



/**
 * Streams a start-tag or an empty tag and returns an array of 
 * locations of all attributes and namespaces found in the tag.
 * @param {!string} xml The start-tag or empty tag string.
 * @return {Array<xrx.xml.Location>} The location array.
 */
xrx.xml.Stream.prototype.secondaries = function(xml) {
  var locs = {};
  var location = new xrx.xml.Location();
  for(var i = 1;;i++) {
    var newLocation = this.attribute(xml, i, location.offset + location.length);
    if (!newLocation) break;
    
    locs[i] = newLocation;
  }
  return locs;
};



/**
 * Streams a start-tag or an empty tag and returns the location
 * of the name of the n'th attribute.
 * @param {!string} xml The tag.
 * @param {!number} pos The attribute position.
 * @return {!xrx.xml.Location} The attribute name location.
 */
xrx.xml.Stream.prototype.attrName = function(xml, pos) {
  return this.attr_(xml, pos, xrx.token.ATTR_NAME);
};



/**
 * Streams a start-tag or an empty tag and returns the location 
 * of the value of the n'th attribute.
 * @param {!string} xml The attribute.
 * @param {!number} pos The attribute position.
 * @param {?number} opt_offset Offset where to start streaming if known.
 * @return {!xrx.xml.Location} The attribute value location.
 */
xrx.xml.Stream.prototype.attrValue = function(xml, pos, opt_offset) {
  return this.attr_(xml, pos, xrx.token.ATTR_VALUE, opt_offset);
};


/**
 * Shared utility function for attribute tokens.
 * @private
 */
xrx.xml.Stream.prototype.attr_ = function(xml, pos, tokenType, opt_offset, opt_reader) {
  var reader = opt_reader || new xrx.xml.Reader(xml);
  if (opt_offset) reader.set(opt_offset);
  this.stopped_ = false;
  
  var location = !opt_offset ? this.tagName(xml, reader) : new xrx.xml.Location();
  // tag does not contain any attributes ? => return null
  if (reader.peek(-1).match(/(\/|>)/g)) return null; 

  var state = xrx.xml.Stream.State_.ATTR_NAME;
  var offset = reader.pos();
  var length;
  var found = 0;
  var quote;

  var process = {
    'ATTR_NAME': function() {
      found += 1;
      if (tokenType === xrx.token.ATTRIBUTE || tokenType === xrx.token.ATTR_NAME) 
          offset = reader.pos();
      reader.forwardInclusive('=');
      if (tokenType === xrx.token.ATTR_NAME && found === pos) {
        location.offset = offset;
        location.length = reader.pos() - offset - 1;
        state = xrx.xml.Stream.State_.TOK_END;
      } else {
        quote = reader.next();
        if (tokenType === xrx.token.ATTR_VALUE) offset = reader.pos();
        state = xrx.xml.Stream.State_.ATTR_VAL;
      }
    },
    'ATTR_VAL': function() {
      reader.get() === quote ? reader.forward(1) : reader.forwardInclusive(quote);
      if(found === pos) {
        location.offset = offset;
        if (tokenType === xrx.token.ATTRIBUTE) {
          location.length = reader.pos() - offset;
        } else if (tokenType === xrx.token.ATTR_VALUE) {
          location.length = reader.pos() - offset - 1;
        } else {}
        state = xrx.xml.Stream.State_.TOK_END;
      } else {
        reader.next();
        var lst = reader.peek(-1);
        if(lst === '/' || lst === '>') {
          state = xrx.xml.Stream.State_.TOK_END;
          location = null;
        } else {
          state = xrx.xml.Stream.State_.ATTR_NAME;
        }
      }
    }
  };
  for (;;) {
    if (process[state]) { 
      process[state](this);
    } else {
      throw Error('Invalid parser state.');
    }
    if (state === xrx.xml.Stream.State_.TOK_END) break;
  }
  return location;
};
