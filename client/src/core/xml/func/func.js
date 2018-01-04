/**
 * @fileoverview A collection of custom XRX++ XPath functions.
 */

goog.provide('xrx.func');


goog.require('xrx.mvc');
goog.require('xrx.Util');
goog.require('xrx.xpath');
goog.require('xrx.xpath.DataType');
goog.require('xrx.xpath.FunctionCall');
goog.require('xrx.xpath.NodeSet');



xrx.xpath.declareNamespace('request', 'http://www.monasterium.net/NS/request');
xrx.xpath.declareNamespace('util', 'http://www.monasterium.net/NS/util');
xrx.xpath.declareNamespace('xrx', 'http://www.monasterium.net/NS/xrx');



xrx.func = {
  // xrx functions
  XRX_BIND: xrx.xpath.FunctionCall.createFunc('xrx:bind',
      xrx.xpath.DataType.NODESET, true, true, true,
      function(ctx, expr) {
        var bindId = expr.evaluate(ctx);
        return xrx.mvc.getModelComponent(bindId).getResult().castAsSelf();
      }, 1, 1),
  XRX_INDEX: xrx.xpath.FunctionCall.createFunc('xrx:index',
      xrx.xpath.DataType.NUMBER, true, true, true,
      function(ctx, expr) {
        if (expr) {
          var repeatId = expr.evaluate(ctx);
          var repeat = xrx.mvc.getViewComponent(repeatId);
          return repeat.getIndex();
        } else {
          var comp = xrx.mvc.actualComponent;
          return comp.getRepeatIndex(comp.getElement()) + 1;
        }
      }, 0, 1),
  XRX_INSTANCE: xrx.xpath.FunctionCall.createFunc('xrx:instance',
      xrx.xpath.DataType.NODESET, true, true, true,
      function(ctx, expr) {
        var nodeset = new xrx.xpath.NodeSet();
        var instance = expr.evaluate(ctx);
        nodeset.add(xrx.mvc.getModelComponent(instance).getDocument());
        return nodeset;
      }, 1, 1),
  // util functions
  UTIL_UUID: xrx.xpath.FunctionCall.createFunc('util:uuid',
      xrx.xpath.DataType.STRING, true, true, true,
      function(ctx, expr) {
        return xrx.Util.createUUID();
      }, 0, 0),
  // request functions
  REQ_URI: xrx.xpath.FunctionCall.createFunc('request:uri',
      xrx.xpath.DataType.STRING, true, true, true,
      function(ctx, expr) {
        return location.href;
      }, 0, 0)  
};
