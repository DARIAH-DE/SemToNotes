/**
 * @fileoverview Components implementing HTML DOM manipulation.
 */

goog.provide('xrx.mvc.Dom');
goog.provide('xrx.mvc.ClassesAdd');
goog.provide('xrx.mvc.ClassesRemove');



goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.dom.DomHelper');
goog.require('xrx.mvc.AbstractAction');



/**
 * @constructor
 */
xrx.mvc.Dom = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.Dom, xrx.mvc.AbstractAction);



xrx.mvc.Dom.prototype.getElementsSelected = function() {
  var elements;
  var scope;
  var datasetScope = this.getDataset('xrxScope');
  console.log(datasetScope);
  var datasetSelector = this.getDataset('xrxSelect');
  if (!datasetScope) {
  } else if (datasetScope && datasetScope.substr(0, 1) === '#') {
    scope = goog.dom.getElement(datasetScope.substr(1));
  } else {
    throw Error('Invalid scope: "' + datasetScope + '". "#" expected.');
  };
  if (datasetSelector.substr(0, 1) === '.') {
    elements = goog.dom.getElementsByClass(datasetSelector.substr(1), scope);
  } else if (datasetSelector.substr(0, 1) === '#') {
    elements = [goog.dom.getElement(datasetSelector.substr(1))];
  } else {
    throw Error('Invalid selector: "' + datasetSelector + '". "#" or "." expected.');
  };
  return goog.array.toArray(elements);
};



xrx.mvc.Dom.prototype.getClasses = function() {
  return this.getDataset('xrxClasses').split(' ');
};



/**
 * @constructor
 */
xrx.mvc.ClassesAdd = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.ClassesAdd, xrx.mvc.Dom);



xrx.mvc.ClassesAdd.prototype.execute_ = function() {
  goog.array.forEach(this.getElementsSelected(), function(element) {
    goog.array.forEach(this.getClasses(), function(clss) {
      goog.dom.classes.add(element, clss);
    });
  }, this);
};



/**
 * @constructor
 */
xrx.mvc.ClassesRemove = function(element) {

  goog.base(this, element);
};
goog.inherits(xrx.mvc.ClassesRemove, xrx.mvc.Dom);



xrx.mvc.ClassesRemove.prototype.execute_ = function() {
  goog.array.forEach(this.getElementsSelected(), function(element) {
    goog.array.forEach(this.getClasses(), function(clss) {
      goog.dom.classes.remove(element, clss);
    });
  }, this);
};
