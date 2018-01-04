/**
 * @fileoverview A static class providing functions for lexical tests.
 */

goog.provide('xrx.xml.Lexer');



/**
 * A static class providing functions for lexical tests according to the
 * <a href="http://www.w3.org/TR/REC-xml/">Extensible Markup Language (XML)</a>.
 * Like the {@link xrx.xml.Stream} class, this class assumes a well-formed and
 * normalized XML input. Make sure that the XML input is parsed
 * with {@link xrx.xml.Parser} beforehand.
 * @constructor
 */
xrx.xml.Lexer = function() {};



/**
 * Whether the reader is located at a CDStart token.
 * <br>[19] CDStart ::= '&lt;![CDATA['
 * @param {xrx.xml.Reader} reader The XML reader.
 * @param {boolean} opt_reverse Whether to test in forward direction
 *     (false|undefined) or in backward direction (true).
 * @return {boolean} Located or not.
 */
xrx.xml.Lexer.atCDStart = function(reader, opt_reverse) {
  return opt_reverse ?
      reader.peek(-1) === 'A' && reader.peek(-2) === 'T' &&
      reader.peek(-3) === 'A' && reader.peek(-4) === 'D' &&
      reader.peek(-5) === 'C' && reader.peek(-6) === '[' &&
      reader.peek(-7) === '!' && reader.peek(-8) === '<' :
      reader.peek(1) === '!' && reader.peek(2) === '[' &&
      reader.peek(3) === 'C' && reader.peek(4) === 'D' &&
      reader.peek(5) === 'A' && reader.peek(6) === 'T' &&
      reader.peek(7) === 'A' && reader.peek(8) === '[';
};



/**
 * Whether the reader is located at a CDEnd token.
 * <li>[21] CDEnd   ::= ']]'&gt;
 * @param {xrx.xml.Reader} reader The XML reader.
 * @param {boolean} opt_reverse Whether to test in forward direction
 *     (false|undefined) or in backward direction (true).
 * @return {boolean} Located or not.
 */
xrx.xml.Lexer.atCDEnd = function(reader, opt_reverse) {
  return opt_reverse ? reader.peek(-1) === ']' && reader.peek(-2) === ']' :
      reader.peek(1) === ']' && reader.peek(2) === '>';
};



/**
 * Whether the reader is located at the start of a comment token.
 * <br>[15] Comment ::= '&lt;!--' ((Char - '-') | ('-' (Char - '-')))* '--'&gt;
 * @param {xrx.xml.Reader} reader The XML reader.
 * @param {boolean} opt_reverse Whether to test in forward direction
 *     (false|undefined) or in backward direction (true).
 * @return {boolean} Located or not.
 */
xrx.xml.Lexer.atCommentStart = function(reader, opt_reverse) {
  return opt_reverse ? reader.peek(-1) === '-' : reader.peek(1) === '!' &&
      reader.peek(2) === '-' && reader.peek(3) === '-';
};



/**
 * Whether the reader is located at the end of a comment token.
 * <br>[15] Comment ::= '&lt;!--' ((Char - '-') | ('-' (Char - '-')))* '--'&gt;
 * @param {xrx.xml.Reader} reader The XML reader.
 * @param {boolean} opt_reverse Whether to test in forward direction
 *     (false|undefined) or in backward direction (true).
 * @return {boolean} Located or not.
 */
xrx.xml.Lexer.atCommentEnd = function(reader, opt_reverse) {
  return opt_reverse ? reader.peek(-1) === '-' : reader.peek(1) === '-';
};



/**
 * Whether the reader is located at an end-tag token.
 * @param {xrx.xml.Reader} reader The XML reader.
 * @return {boolean} Located or not.
 */
xrx.xml.Lexer.atEndTag = function(reader) {
  return reader.peek(1) === '/';
};



/**
 * Whether the reader is located at the start of a processing instruction
 * token.
 * <br>[16] PI ::= '<?' PITarget (S (Char* - (Char* '?>' Char*)))? '?>'
 * @param {xrx.xml.Reader} reader The XML reader.
 * @param {boolean} opt_reverse Whether to test in forward direction
 *     (false|undefined) or in backward direction (true).
 * @return {boolean} Located or not.
 */
xrx.xml.Lexer.atPIStart = function(reader, opt_reverse) {
  return opt_reverse ? reader.peek(-1) === '<' : reader.peek(1) === '?';
};



/**
 * Whether the reader is located at the end of a processing instruction
 * token.
 * <br>[16] PI ::= '<?' PITarget (S (Char* - (Char* '?>' Char*)))? '?>'
 * @param {xrx.xml.Reader} reader The XML reader.
 * @param {boolean} opt_reverse Whether to test in forward direction
 *     (false|undefined) or in backward direction (true).
 * @return {boolean} Located or not.
 */
xrx.xml.Lexer.atPIEnd = function(reader, opt_reverse) {
  return opt_reverse ? reader.peek(-1) === '?' : reader.peek(1) === '>';
};



/**
 * Whether the reader is located at an XML declaration token.
 * @param {xrx.xml.Reader} reader The XML reader.
 * @return {boolean} Located or not.
 */
xrx.xml.Lexer.atXmlDecl = function(reader) {
  return reader.peek(1) === '?' && reader.peek(2) === 'x' &&
      reader.peek(3) === 'm' && reader.peek(4) === 'l' &&
      reader.peek(5) === ' ';
};
