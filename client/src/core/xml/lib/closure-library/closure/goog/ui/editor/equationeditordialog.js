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

goog.provide('goog.ui.editor.EquationEditorDialog');

goog.require('goog.editor.Command');
goog.require('goog.ui.editor.AbstractDialog');
goog.require('goog.ui.editor.EquationEditorOkEvent');
goog.require('goog.ui.equation.ChangeEvent');
goog.require('goog.ui.equation.TexEditor');



***REMOVED***
***REMOVED*** Equation editor dialog (based on goog.ui.editor.AbstractDialog).
***REMOVED*** @param {Object} context The context that this dialog runs in.
***REMOVED*** @param {goog.dom.DomHelper} domHelper DomHelper to be used to create the
***REMOVED***     dialog's dom structure.
***REMOVED*** @param {string} equation Initial equation.
***REMOVED*** @param {string} helpUrl URL pointing to help documentation.
***REMOVED***
***REMOVED*** @extends {goog.ui.editor.AbstractDialog}
***REMOVED***
goog.ui.editor.EquationEditorDialog = function(context, domHelper,
    equation, helpUrl) {
  goog.ui.editor.AbstractDialog.call(this, domHelper);
  this.equationEditor_ =
      new goog.ui.equation.TexEditor(context, helpUrl);
  this.equationEditor_.render();
  this.equationEditor_.setEquation(equation);
  this.equationEditor_.addEventListener(goog.editor.Command.EQUATION,
      this.onChange_, false, this);
***REMOVED***
goog.inherits(goog.ui.editor.EquationEditorDialog,
    goog.ui.editor.AbstractDialog);


***REMOVED***
***REMOVED*** The equation editor actual UI.
***REMOVED*** @type {goog.ui.equation.TexEditor}
***REMOVED*** @private
***REMOVED***
goog.ui.editor.EquationEditorDialog.prototype.equationEditor_;


***REMOVED***
***REMOVED*** The dialog's OK button element.
***REMOVED*** @type {Element?}
***REMOVED*** @private
***REMOVED***
goog.ui.editor.EquationEditorDialog.prototype.okButton_;


***REMOVED*** @override***REMOVED***
goog.ui.editor.EquationEditorDialog.prototype.createDialogControl =
    function() {
  var builder = new goog.ui.editor.AbstractDialog.Builder(this);

 ***REMOVED*****REMOVED***
  ***REMOVED*** @desc The title of the equation editor dialog.
 ***REMOVED*****REMOVED***
  var MSG_EE_DIALOG_TITLE = goog.getMsg('Equation Editor');

 ***REMOVED*****REMOVED***
  ***REMOVED*** @desc Button label for the equation editor dialog for adding
  ***REMOVED*** a new equation.
 ***REMOVED*****REMOVED***
  var MSG_EE_BUTTON_SAVE_NEW = goog.getMsg('Insert equation');

 ***REMOVED*****REMOVED***
  ***REMOVED*** @desc Button label for the equation editor dialog for saving
  ***REMOVED*** a modified equation.
 ***REMOVED*****REMOVED***
  var MSG_EE_BUTTON_SAVE_MODIFY = goog.getMsg('Save changes');

  var okButtonText = this.equationEditor_.getEquation() ?
      MSG_EE_BUTTON_SAVE_MODIFY : MSG_EE_BUTTON_SAVE_NEW;

  builder.setTitle(MSG_EE_DIALOG_TITLE)
    .setContent(this.equationEditor_.getElement())
    .addOkButton(okButtonText)
    .addCancelButton();

  return builder.build();
***REMOVED***


***REMOVED***
***REMOVED*** @override
***REMOVED***
goog.ui.editor.EquationEditorDialog.prototype.createOkEvent = function(e) {
  if (this.equationEditor_.isValid()) {
    // Equation is not valid, don't close the dialog.
    return null;
  }
  var equationHtml = this.equationEditor_.getHtml();
  return new goog.ui.editor.EquationEditorOkEvent(equationHtml);
***REMOVED***


***REMOVED***
***REMOVED*** Handles CHANGE event fired when user changes equation.
***REMOVED*** @param {goog.ui.equation.ChangeEvent} e The event object.
***REMOVED*** @private
***REMOVED***
goog.ui.editor.EquationEditorDialog.prototype.onChange_ = function(e) {
  if (!this.okButton_) {
    this.okButton_ = this.getButtonElement(
        goog.ui.Dialog.DefaultButtonKeys.OK);
  }
  this.okButton_.disabled = !e.isValid;
***REMOVED***
