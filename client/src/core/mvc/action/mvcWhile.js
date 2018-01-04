/**
 * @fileoverview
 */

goog.provide('xrx.mvc.While');



goog.require('goog.array');
goog.require('goog.dom.DomHelper');
goog.require('xrx.mvc.AbstractAction');
goog.require('xrx.mvc');



xrx.mvc.While = function(element) {

  goog.base(this, element); 
};
goog.inherits(xrx.mvc.While, xrx.mvc.AbstractAction);



xrx.mvc.While.prototype.execute_ = function(opt_params) {
  var datasetTest = this.getDataset('xrxTest');
  if (!datasetTest) throw Error('Missing "data-ref" attribute.');
  var component = xrx.mvc.getComponent(datasetTest);
  if (!(component instanceof xrx.mvc.Calculate))
      throw Error('Component is not of type xrx.mvc.Calculate.');
  var children = goog.dom.getChildren(this.element_);
  while(component.getResultAsBoolean()) {
    goog.array.forEach(children, function(e) {
      xrx.mvc.getComponent(e.id).execute(opt_params);
    });
  }
};
