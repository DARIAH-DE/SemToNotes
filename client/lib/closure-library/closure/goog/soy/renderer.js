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
***REMOVED*** @fileoverview Provides a soy renderer that allows registration of
***REMOVED*** injected data ("globals") that will be passed into the rendered
***REMOVED*** templates.
***REMOVED***
***REMOVED*** There is also an interface {@link goog.soy.InjectedDataSupplier} that
***REMOVED*** user should implement to provide the injected data for a specific
***REMOVED*** application. The injected data format is a JavaScript object:
***REMOVED*** <pre>
***REMOVED*** {'dataKey': 'value', 'otherDataKey': 'otherValue'}
***REMOVED*** </pre>
***REMOVED***
***REMOVED*** To use injected data, you need to enable the soy-to-js compiler
***REMOVED*** option {@code --isUsingIjData}. The injected data can then be
***REMOVED*** referred to in any soy templates as part of a magic "ij"
***REMOVED*** parameter. For example, {@code $ij.dataKey} will evaluate to
***REMOVED*** 'value' with the above injected data.
***REMOVED***
***REMOVED*** @author henrywong@google.com (Henry Wong)
***REMOVED*** @author chrishenry@google.com (Chris Henry)
***REMOVED***

goog.provide('goog.soy.InjectedDataSupplier');
goog.provide('goog.soy.Renderer');

goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.soy');
goog.require('goog.soy.data.SanitizedContent');
goog.require('goog.soy.data.SanitizedContentKind');



***REMOVED***
***REMOVED*** Creates a new soy renderer. Note that the renderer will only be
***REMOVED*** guaranteed to work correctly within the document scope provided in
***REMOVED*** the DOM helper.
***REMOVED***
***REMOVED*** @param {goog.soy.InjectedDataSupplier=} opt_injectedDataSupplier A supplier
***REMOVED***     that provides an injected data.
***REMOVED*** @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper;
***REMOVED***     defaults to that provided by {@code goog.dom.getDomHelper()}.
***REMOVED***
***REMOVED***
goog.soy.Renderer = function(opt_injectedDataSupplier, opt_domHelper) {
 ***REMOVED*****REMOVED***
  ***REMOVED*** @type {goog.dom.DomHelper}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.dom_ = opt_domHelper || goog.dom.getDomHelper();

 ***REMOVED*****REMOVED***
  ***REMOVED*** @type {goog.soy.InjectedDataSupplier}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.supplier_ = opt_injectedDataSupplier || null;

 ***REMOVED*****REMOVED***
  ***REMOVED*** Map from template name to the data used to render that template.
  ***REMOVED*** @type {!goog.soy.Renderer.SavedTemplateRender}
  ***REMOVED*** @private
 ***REMOVED*****REMOVED***
  this.savedTemplateRenders_ = [];
***REMOVED***


***REMOVED***
***REMOVED*** @typedef {Array.<{template: string, data: Object, ijData: Object}>}
***REMOVED***
goog.soy.Renderer.SavedTemplateRender;


***REMOVED***
***REMOVED*** Renders a Soy template into a single node or a document fragment.
***REMOVED*** Delegates to {@code goog.soy.renderAsFragment}.
***REMOVED***
***REMOVED*** @param {null|function(ARG_TYPES, null=, Object.<string,***REMOVED***>=):*} template
***REMOVED***     The Soy template defining the element's content.
***REMOVED*** @param {ARG_TYPES=} opt_templateData The data for the template.
***REMOVED*** @return {!Node} The resulting node or document fragment.
***REMOVED*** @template ARG_TYPES
***REMOVED***
goog.soy.Renderer.prototype.renderAsFragment = function(template,
                                                        opt_templateData) {
  this.saveTemplateRender_(template, opt_templateData);
  var node = goog.soy.renderAsFragment(template, opt_templateData,
                                       this.getInjectedData_(), this.dom_);
  this.handleRender(node);
  return node;
***REMOVED***


***REMOVED***
***REMOVED*** Renders a Soy template into a single node. If the rendered HTML
***REMOVED*** string represents a single node, then that node is returned.
***REMOVED*** Otherwise, a DIV element is returned containing the rendered nodes.
***REMOVED*** Delegates to {@code goog.soy.renderAsElement}.
***REMOVED***
***REMOVED*** @param {null|function(ARG_TYPES, null=, Object.<string,***REMOVED***>=):*} template
***REMOVED***     The Soy template defining the element's content.
***REMOVED*** @param {ARG_TYPES=} opt_templateData The data for the template.
***REMOVED*** @return {!Element} Rendered template contents, wrapped in a parent DIV
***REMOVED***     element if necessary.
***REMOVED*** @template ARG_TYPES
***REMOVED***
goog.soy.Renderer.prototype.renderAsElement = function(template,
                                                       opt_templateData) {
  this.saveTemplateRender_(template, opt_templateData);
  var element = goog.soy.renderAsElement(template, opt_templateData,
                                         this.getInjectedData_(), this.dom_);
  this.handleRender(element);
  return element;
***REMOVED***


***REMOVED***
***REMOVED*** Renders a Soy template and then set the output string as the
***REMOVED*** innerHTML of the given element. Delegates to {@code goog.soy.renderElement}.
***REMOVED***
***REMOVED*** @param {Element} element The element whose content we are rendering.
***REMOVED*** @param {null|function(ARG_TYPES, null=, Object.<string,***REMOVED***>=):*} template
***REMOVED***     The Soy template defining the element's content.
***REMOVED*** @param {ARG_TYPES=} opt_templateData The data for the template.
***REMOVED*** @template ARG_TYPES
***REMOVED***
goog.soy.Renderer.prototype.renderElement = function(element, template,
                                                     opt_templateData) {
  this.saveTemplateRender_(template, opt_templateData);
  goog.soy.renderElement(
      element, template, opt_templateData, this.getInjectedData_());
  this.handleRender(element);
***REMOVED***


***REMOVED***
***REMOVED*** Renders a Soy template and returns the output string.
***REMOVED*** If the template is strict, it must be of kind HTML. To render strict
***REMOVED*** templates of other kinds, use {@code renderText} (for {@code kind="text"}) or
***REMOVED*** {@code renderStrict}.
***REMOVED***
***REMOVED*** @param {null|function(ARG_TYPES, null=, Object.<string,***REMOVED***>=):*} template
***REMOVED***     The Soy template to render.
***REMOVED*** @param {ARG_TYPES=} opt_templateData The data for the template.
***REMOVED*** @return {string} The return value of rendering the template directly.
***REMOVED*** @template ARG_TYPES
***REMOVED***
goog.soy.Renderer.prototype.render = function(template, opt_templateData) {
  var result = template(
      opt_templateData || {}, undefined, this.getInjectedData_());
  goog.asserts.assert(!(result instanceof goog.soy.data.SanitizedContent) ||
      result.contentKind === goog.soy.data.SanitizedContentKind.HTML,
      'render was called with a strict template of kind other than "html"' +
          ' (consider using renderText or renderStrict)');
  this.saveTemplateRender_(template, opt_templateData);
  this.handleRender();
  return String(result);
***REMOVED***


***REMOVED***
***REMOVED*** Renders a strict Soy template of kind="text" and returns the output string.
***REMOVED*** It is an error to use renderText on non-strict templates, or strict templates
***REMOVED*** of kinds other than "text".
***REMOVED***
***REMOVED*** @param {null|function(ARG_TYPES, null=, Object.<string,***REMOVED***>=):
***REMOVED***     goog.soy.data.SanitizedContent} template The Soy template to render.
***REMOVED*** @param {ARG_TYPES=} opt_templateData The data for the template.
***REMOVED*** @return {string} The return value of rendering the template directly.
***REMOVED*** @template ARG_TYPES
***REMOVED***
goog.soy.Renderer.prototype.renderText = function(template, opt_templateData) {
  var result = template(
      opt_templateData || {}, undefined, this.getInjectedData_());
  goog.asserts.assertInstanceof(result, goog.soy.data.SanitizedContent,
      'renderText cannot be called on a non-strict soy template');
  goog.asserts.assert(
      result.contentKind === goog.soy.data.SanitizedContentKind.TEXT,
      'renderText was called with a template of kind other than "text"');
  this.saveTemplateRender_(template, opt_templateData);
  this.handleRender();
  return String(result);
***REMOVED***


***REMOVED***
***REMOVED*** Renders a strict Soy template and returns the output SanitizedContent object.
***REMOVED***
***REMOVED*** @param {null|function(ARG_TYPES, null=, Object.<string,***REMOVED***>=):RETURN_TYPE}
***REMOVED***     template The Soy template to render.
***REMOVED*** @param {ARG_TYPES=} opt_templateData The data for the template.
***REMOVED*** @param {goog.soy.data.SanitizedContentKind=} opt_kind The output kind to
***REMOVED***     assert. If null, the template must be of kind="html" (i.e., opt_kind
***REMOVED***     defaults to goog.soy.data.SanitizedContentKind.HTML).
***REMOVED*** @return {RETURN_TYPE} The SanitizedContent object. This return type is
***REMOVED***     generic based on the return type of the template, such as
***REMOVED***     soy.SanitizedHtml.
***REMOVED*** @template ARG_TYPES, RETURN_TYPE
***REMOVED***
goog.soy.Renderer.prototype.renderStrict = function(
    template, opt_templateData, opt_kind) {
  var result = template(
      opt_templateData || {}, undefined, this.getInjectedData_());
  goog.asserts.assertInstanceof(result, goog.soy.data.SanitizedContent,
      'renderStrict cannot be called on a non-strict soy template');
  goog.asserts.assert(
      result.contentKind ===
          (opt_kind || goog.soy.data.SanitizedContentKind.HTML),
      'renderStrict was called with the wrong kind of template');
  this.saveTemplateRender_(template, opt_templateData);
  this.handleRender();
  return result;
***REMOVED***


***REMOVED***
***REMOVED*** Renders a strict Soy template of kind="html" and returns the result as
***REMOVED*** a goog.html.SafeHtml object.
***REMOVED***
***REMOVED*** Rendering a template that is not a strict template of kind="html" results in
***REMOVED*** a runtime error.
***REMOVED***
***REMOVED*** @param {null|function(ARG_TYPES, null=, Object.<string,***REMOVED***>=):
***REMOVED***     goog.soy.data.SanitizedContent} template The Soy template to render.
***REMOVED*** @param {ARG_TYPES=} opt_templateData The data for the template.
***REMOVED*** @return {!goog.html.SafeHtml}
***REMOVED*** @template ARG_TYPES
***REMOVED***
goog.soy.Renderer.prototype.renderSafeHtml = function(
    template, opt_templateData) {
  var result = this.renderStrict(template, opt_templateData);
  return result.toSafeHtml();
***REMOVED***


***REMOVED***
***REMOVED*** @return {!goog.soy.Renderer.SavedTemplateRender} Saved template data for
***REMOVED***     the renders that have happened so far.
***REMOVED***
goog.soy.Renderer.prototype.getSavedTemplateRenders = function() {
  return this.savedTemplateRenders_;
***REMOVED***


***REMOVED***
***REMOVED*** Observes rendering of templates by this renderer.
***REMOVED*** @param {Node=} opt_node Relevant node, if available. The node may or may
***REMOVED***     not be in the document, depending on whether Soy is creating an element
***REMOVED***     or writing into an existing one.
***REMOVED*** @protected
***REMOVED***
goog.soy.Renderer.prototype.handleRender = goog.nullFunction;


***REMOVED***
***REMOVED*** Saves information about the current template render for debug purposes.
***REMOVED*** @param {Function} template The Soy template defining the element's content.
***REMOVED*** @param {Object=} opt_templateData The data for the template.
***REMOVED*** @private
***REMOVED*** @suppress {missingProperties} SoyJs compiler adds soyTemplateName to the
***REMOVED***     template.
***REMOVED***
goog.soy.Renderer.prototype.saveTemplateRender_ = function(
    template, opt_templateData) {
  if (goog.DEBUG) {
    this.savedTemplateRenders_.push({
      template: template.soyTemplateName,
      data: opt_templateData,
      ijData: this.getInjectedData_()
    });
  }
***REMOVED***


***REMOVED***
***REMOVED*** Creates the injectedParams map if necessary and calls the configuration
***REMOVED*** service to prepopulate it.
***REMOVED*** @return {Object} The injected params.
***REMOVED*** @private
***REMOVED***
goog.soy.Renderer.prototype.getInjectedData_ = function() {
  return this.supplier_ ? this.supplier_.getData() : {***REMOVED***
***REMOVED***



***REMOVED***
***REMOVED*** An interface for a supplier that provides Soy injected data.
***REMOVED*** @interface
***REMOVED***
goog.soy.InjectedDataSupplier = function() {***REMOVED***


***REMOVED***
***REMOVED*** Gets the injected data. Implementation may assume that
***REMOVED*** {@code goog.soy.Renderer} will treat the returned data as
***REMOVED*** immutable.  The renderer will call this every time one of its
***REMOVED*** {@code render*} methods is called.
***REMOVED*** @return {Object} A key-value pair representing the injected data.
***REMOVED***
goog.soy.InjectedDataSupplier.prototype.getData = function() {***REMOVED***
