// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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
***REMOVED*** @fileoverview A custom button renderer that uses CSS voodoo to render a
***REMOVED*** button-like object with fake rounded corners.
***REMOVED***
***REMOVED*** @author attila@google.com (Attila Bodis)
***REMOVED***

goog.provide('goog.ui.CustomButtonRenderer');

goog.require('goog.a11y.aria.Role');
goog.require('goog.asserts');
goog.require('goog.dom.NodeType');
goog.require('goog.dom.classlist');
goog.require('goog.string');
goog.require('goog.ui.ButtonRenderer');
goog.require('goog.ui.INLINE_BLOCK_CLASSNAME');



***REMOVED***
***REMOVED*** Custom renderer for {@link goog.ui.Button}s.  Custom buttons can contain
***REMOVED*** almost arbitrary HTML content, will flow like inline elements, but can be
***REMOVED*** styled like block-level elements.
***REMOVED***
***REMOVED***
***REMOVED*** @extends {goog.ui.ButtonRenderer}
***REMOVED***
goog.ui.CustomButtonRenderer = function() {
  goog.ui.ButtonRenderer.call(this);
***REMOVED***
goog.inherits(goog.ui.CustomButtonRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(goog.ui.CustomButtonRenderer);


***REMOVED***
***REMOVED*** Default CSS class to be applied to the root element of components rendered
***REMOVED*** by this renderer.
***REMOVED*** @type {string}
***REMOVED***
goog.ui.CustomButtonRenderer.CSS_CLASS = goog.getCssName('goog-custom-button');


***REMOVED***
***REMOVED*** Returns the button's contents wrapped in the following DOM structure:
***REMOVED***    <div class="goog-inline-block goog-custom-button">
***REMOVED***      <div class="goog-inline-block goog-custom-button-outer-box">
***REMOVED***        <div class="goog-inline-block goog-custom-button-inner-box">
***REMOVED***          Contents...
***REMOVED***        </div>
***REMOVED***      </div>
***REMOVED***    </div>
***REMOVED*** Overrides {@link goog.ui.ButtonRenderer#createDom}.
***REMOVED*** @param {goog.ui.Control} control goog.ui.Button to render.
***REMOVED*** @return {Element} Root element for the button.
***REMOVED*** @override
***REMOVED***
goog.ui.CustomButtonRenderer.prototype.createDom = function(control) {
  var button =***REMOVED*****REMOVED*** @type {goog.ui.Button}***REMOVED*** (control);
  var classNames = this.getClassNames(button);
  var attributes = {
    'class': goog.ui.INLINE_BLOCK_CLASSNAME + ' ' + classNames.join(' ')
 ***REMOVED*****REMOVED***
  var buttonElement = button.getDomHelper().createDom('div', attributes,
      this.createButton(button.getContent(), button.getDomHelper()));
  this.setTooltip(
      buttonElement,***REMOVED*****REMOVED*** @type {!string}*/ (button.getTooltip()));
  this.setAriaStates(button, buttonElement);

  return buttonElement;
***REMOVED***


***REMOVED***
***REMOVED*** Returns the ARIA role to be applied to custom buttons.
***REMOVED*** @return {goog.a11y.aria.Role|undefined} ARIA role.
***REMOVED*** @override
***REMOVED***
goog.ui.CustomButtonRenderer.prototype.getAriaRole = function() {
  return goog.a11y.aria.Role.BUTTON;
***REMOVED***


***REMOVED***
***REMOVED*** Takes the button's root element and returns the parent element of the
***REMOVED*** button's contents.  Overrides the superclass implementation by taking
***REMOVED*** the nested DIV structure of custom buttons into account.
***REMOVED*** @param {Element} element Root element of the button whose content
***REMOVED***     element is to be returned.
***REMOVED*** @return {Element} The button's content element (if any).
***REMOVED*** @override
***REMOVED***
goog.ui.CustomButtonRenderer.prototype.getContentElement = function(element) {
  return element &&***REMOVED*****REMOVED*** @type {Element}***REMOVED*** (element.firstChild.firstChild);
***REMOVED***


***REMOVED***
***REMOVED*** Takes a text caption or existing DOM structure, and returns the content
***REMOVED*** wrapped in a pseudo-rounded-corner box.  Creates the following DOM structure:
***REMOVED***  <div class="goog-inline-block goog-custom-button-outer-box">
***REMOVED***    <div class="goog-inline-block goog-custom-button-inner-box">
***REMOVED***      Contents...
***REMOVED***    </div>
***REMOVED***  </div>
***REMOVED*** Used by both {@link #createDom} and {@link #decorate}.  To be overridden
***REMOVED*** by subclasses.
***REMOVED*** @param {goog.ui.ControlContent} content Text caption or DOM structure to wrap
***REMOVED***     in a box.
***REMOVED*** @param {goog.dom.DomHelper} dom DOM helper, used for document interaction.
***REMOVED*** @return {Element} Pseudo-rounded-corner box containing the content.
***REMOVED***
goog.ui.CustomButtonRenderer.prototype.createButton = function(content, dom) {
  return dom.createDom('div',
      goog.ui.INLINE_BLOCK_CLASSNAME + ' ' +
      goog.getCssName(this.getCssClass(), 'outer-box'),
      dom.createDom('div',
          goog.ui.INLINE_BLOCK_CLASSNAME + ' ' +
          goog.getCssName(this.getCssClass(), 'inner-box'), content));
***REMOVED***


***REMOVED***
***REMOVED*** Returns true if this renderer can decorate the element.  Overrides
***REMOVED*** {@link goog.ui.ButtonRenderer#canDecorate} by returning true if the
***REMOVED*** element is a DIV, false otherwise.
***REMOVED*** @param {Element} element Element to decorate.
***REMOVED*** @return {boolean} Whether the renderer can decorate the element.
***REMOVED*** @override
***REMOVED***
goog.ui.CustomButtonRenderer.prototype.canDecorate = function(element) {
  return element.tagName == 'DIV';
***REMOVED***


***REMOVED***
***REMOVED*** Check if the button's element has a box structure.
***REMOVED*** @param {goog.ui.Button} button Button instance whose structure is being
***REMOVED***     checked.
***REMOVED*** @param {Element} element Element of the button.
***REMOVED*** @return {boolean} Whether the element has a box structure.
***REMOVED*** @protected
***REMOVED***
goog.ui.CustomButtonRenderer.prototype.hasBoxStructure = function(
    button, element) {
  var outer = button.getDomHelper().getFirstElementChild(element);
  var outerClassName = goog.getCssName(this.getCssClass(), 'outer-box');
  if (outer && goog.dom.classlist.contains(outer, outerClassName)) {

    var inner = button.getDomHelper().getFirstElementChild(outer);
    var innerClassName = goog.getCssName(this.getCssClass(), 'inner-box');
    if (inner && goog.dom.classlist.contains(inner, innerClassName)) {
      // We have a proper box structure.
      return true;
    }
  }
  return false;
***REMOVED***


***REMOVED***
***REMOVED*** Takes an existing element and decorates it with the custom button control.
***REMOVED*** Initializes the control's ID, content, tooltip, value, and state based
***REMOVED*** on the ID of the element, its child nodes, and its CSS classes, respectively.
***REMOVED*** Returns the element.  Overrides {@link goog.ui.ButtonRenderer#decorate}.
***REMOVED*** @param {goog.ui.Control} control Button instance to decorate the element.
***REMOVED*** @param {Element} element Element to decorate.
***REMOVED*** @return {Element} Decorated element.
***REMOVED*** @override
***REMOVED***
goog.ui.CustomButtonRenderer.prototype.decorate = function(control, element) {
  goog.asserts.assert(element);

  var button =***REMOVED*****REMOVED*** @type {goog.ui.Button}***REMOVED*** (control);
  // Trim text nodes in the element's child node list; otherwise madness
  // ensues (i.e. on Gecko, buttons will flicker and shift when moused over).
  goog.ui.CustomButtonRenderer.trimTextNodes_(element, true);
  goog.ui.CustomButtonRenderer.trimTextNodes_(element, false);

  // Create the buttom dom if it has not been created.
  if (!this.hasBoxStructure(button, element)) {
    element.appendChild(
        this.createButton(element.childNodes, button.getDomHelper()));
  }

  goog.dom.classlist.addAll(element,
      [goog.ui.INLINE_BLOCK_CLASSNAME, this.getCssClass()]);
  return goog.ui.CustomButtonRenderer.superClass_.decorate.call(this, button,
      element);
***REMOVED***


***REMOVED***
***REMOVED*** Returns the CSS class to be applied to the root element of components
***REMOVED*** rendered using this renderer.
***REMOVED*** @return {string} Renderer-specific CSS class.
***REMOVED*** @override
***REMOVED***
goog.ui.CustomButtonRenderer.prototype.getCssClass = function() {
  return goog.ui.CustomButtonRenderer.CSS_CLASS;
***REMOVED***


***REMOVED***
***REMOVED*** Takes an element and removes leading or trailing whitespace from the start
***REMOVED*** or the end of its list of child nodes.  The Boolean argument determines
***REMOVED*** whether to trim from the start or the end of the node list.  Empty text
***REMOVED*** nodes are removed, and the first non-empty text node is trimmed from the
***REMOVED*** left or the right as appropriate.  For example,
***REMOVED***    <div class="goog-inline-block">
***REMOVED***      #text ""
***REMOVED***      #text "\n    Hello "
***REMOVED***      <span>...</span>
***REMOVED***      #text " World!    \n"
***REMOVED***      #text ""
***REMOVED***    </div>
***REMOVED*** becomes
***REMOVED***    <div class="goog-inline-block">
***REMOVED***      #text "Hello "
***REMOVED***      <span>...</span>
***REMOVED***      #text " World!"
***REMOVED***    </div>
***REMOVED*** This is essential for Gecko, where leading/trailing whitespace messes with
***REMOVED*** the layout of elements with -moz-inline-box (used in goog-inline-block), and
***REMOVED*** optional but harmless for non-Gecko.
***REMOVED***
***REMOVED*** @param {Element} element Element whose child node list is to be trimmed.
***REMOVED*** @param {boolean} fromStart Whether to trim from the start or from the end.
***REMOVED*** @private
***REMOVED***
goog.ui.CustomButtonRenderer.trimTextNodes_ = function(element, fromStart) {
  if (element) {
    var node = fromStart ? element.firstChild : element.lastChild, next;
    // Tag soup HTML may result in a DOM where siblings have different parents.
    while (node && node.parentNode == element) {
      // Get the next/previous sibling here, since the node may be removed.
      next = fromStart ? node.nextSibling : node.previousSibling;
      if (node.nodeType == goog.dom.NodeType.TEXT) {
        // Found a text node.
        var text = node.nodeValue;
        if (goog.string.trim(text) == '') {
          // Found an empty text node; remove it.
          element.removeChild(node);
        } else {
          // Found a non-empty text node; trim from the start/end, then exit.
          node.nodeValue = fromStart ?
              goog.string.trimLeft(text) : goog.string.trimRight(text);
          break;
        }
      } else {
        // Found a non-text node; done.
        break;
      }
      node = next;
    }
  }
***REMOVED***
