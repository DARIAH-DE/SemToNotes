/**
 * @fileoverview The MVC main class, installs all MVC components.
 */

goog.provide('xrx.mvc.Mvc');



goog.require('goog.array');
goog.require('goog.crypt.base64');
goog.require('goog.object');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.dataset');
goog.require('goog.json');
goog.require('goog.labs.net.xhr');
goog.require('goog.string');
goog.require('goog.style');
goog.require('goog.ui.IdGenerator');
goog.require('goog.Promise');
goog.require('xrx.mvc');
goog.require('xrx.mvc.Components');
goog.require('xrx.component._All_');



/**
 * @constructor
 */
xrx.mvc.Mvc = function() {};



/**
 * @private
 */
xrx.mvc.Mvc.idGenerator = goog.ui.IdGenerator.getInstance();



/**
 * @private
 */
xrx.mvc.Mvc.installComponents = function(opt_context) {
  var elements;
  var element;
  goog.object.forEach(xrx.mvc.Components, function(component, key, o) {
    elements = goog.dom.getElementsByClass(key, opt_context);
    for (var i = 0; i < elements.length; i++) {
      goog.dom.isNodeList(elements) ? element = elements.item(i) : element = elements[i];
      if (!element.id || (element.id && element.id == '')) {
        element.id = xrx.mvc.Mvc.idGenerator.getNextUniqueId();
      };
      if (!xrx.mvc.hasComponent(element.id)) new xrx.mvc.Components[key](element);
    }
  });
};



/**
 * @private
 */
xrx.mvc.Mvc.installInstances_ = function(opt_context, opt_callback) {
  var self = this;
  var elements1 = goog.dom.getElementsByClass('xrx-instance', opt_context);
  var elements2 = goog.dom.getElementsByClass('xrx-github', opt_context);
  var elements = goog.array.concat(goog.array.toArray(elements1),
      goog.array.toArray(elements2));
  var requests = [];
  var instances = [];

  goog.array.forEach(elements, function(e, num) {
    var instance;
    if (goog.dom.classes.has(e, 'xrx-github')) {
      instance = new xrx.mvc.InstanceGithub(e);
    } else {
      instance = new xrx.mvc.InstanceRest(e);
    }
    var srcUri = instance.getResourceUri();
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
      if (goog.dom.classes.has(instances[num].getElement(), 'xrx-github')) {
        var json = goog.json.parse(result.result_);
        var str = decodeURIComponent(escape(goog.crypt.base64.decodeString(json.content)));
        instances[num].setData(new String(str));
        instances[num].setSha(json.sha);
      } else {
        instances[num].setData(new String(result.result_));
      }
    });
    if (requests.length !== 0) {
      xrx.mvc.Mvc.installComponents(opt_context);
      if (opt_callback) opt_callback();
    }
  });

  if (requests.length === 0) {
    xrx.mvc.Mvc.installComponents(opt_context);
    if (opt_callback) opt_callback();
  };
};



/**
 * 
 */
xrx.mvc.Mvc.install = function(opt_context, opt_callback) {
  xrx.mvc.Mvc.installInstances_(opt_context, opt_callback);
};
