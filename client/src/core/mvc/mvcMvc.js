***REMOVED***
***REMOVED*** @fileoverview The MVC main class.
***REMOVED***

goog.provide('xrx.mvc.Mvc');



goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.dom');
goog.require('goog.dom.dataset');
goog.require('goog.json');
goog.require('goog.labs.net.xhr');
goog.require('goog.ui.IdGenerator');
goog.require('goog.Promise');
goog.require('xrx.func');
goog.require('xrx.mvc');
***REMOVED***
goog.require('xrx.mvc.Components');
goog.require('xrx.widget.Widgets');
goog.require('xrx.xpath');



***REMOVED***
***REMOVED***
***REMOVED***
xrx.mvc.Mvc = function() {***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.mvc.Mvc.idGenerator = goog.ui.IdGenerator.getInstance();



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.mvc.Mvc.installComponents = function(opt_context) {
  var elements;
  var element;
  goog.object.forEach(xrx.mvc.Components, function(component, key, o) {
    elements = goog.dom.getElementsByClass(key, opt_context);
    for (var i = 0; i < elements.length; i++) {
      goog.dom.isNodeList(elements) ? element = elements.item(i) : element = elements[i];
      if (!element.id || element.id === '') element.id =
          xrx.mvc.Mvc.idGenerator.getNextUniqueId();
      if (!xrx.mvc.hasComponent(element.id)) new xrx.mvc.Components[key](element);
    }
  });
***REMOVED***



***REMOVED***
***REMOVED*** @private
***REMOVED***
xrx.mvc.Mvc.installInstances_ = function(opt_context) {
***REMOVED***
  var elements = goog.dom.getElementsByClass('xrx-mvc-instance', opt_context);
  var requests = [];
  var instances = [];

  goog.array.forEach(elements, function(e, num) {
    var instance = new xrx.mvc.Instance(e);
    var srcUri = instance.getSrcUri();
    if (srcUri) {
      requests.push(goog.labs.net.xhr.get(srcUri));
      instances.push(instance);
    } else {
      instance.mvcRecalculate();
    }
  });

  var instancesReady = goog.Promise.all(requests);

  instancesReady.then(function() {
    goog.array.forEach(requests, function(result, num) {
      instances[num].setData(new String(result.result_));
    });
    if (requests.length !== 0) {
      xrx.mvc.Mvc.installComponents(opt_context);
    }
  });

  if (requests.length === 0) {
    xrx.mvc.Mvc.installComponents(opt_context);
 ***REMOVED*****REMOVED***
***REMOVED***



***REMOVED***
***REMOVED*** 
***REMOVED***
xrx.mvc.Mvc.install = function(opt_context) {
  xrx.mvc.Mvc.installInstances_(opt_context);
***REMOVED***
