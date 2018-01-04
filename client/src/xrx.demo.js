
goog.provide('xrx.demo');
goog.provide('xrx.demo.Demo');



goog.require('goog.Disposable');
goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.dom.dataset');
goog.require('goog.dom.DomHelper');
goog.require('goog.events');
goog.require('goog.events.EventHandler');
goog.require('goog.events.EventType');
goog.require('goog.History');
goog.require('goog.net.XhrIo');
goog.require('goog.string');
goog.require('goog.style');
goog.require('xrx.api.drawing');



xrx.demo = function() {};



xrx.demo.Demo = function() {

  this.activeNavbarLink_;

  this.handler_ =  new goog.events.EventHandler(this);

  this.history_ = new goog.History();

  this.example_;

  this.status_ = true;

  this.init_();
};



xrx.demo.Demo.prototype.getExampleId = function() {
  return goog.dom.getWindow().location.hash.split('!')[1];
};



xrx.demo.Demo.prototype.reset_ = function() {
  this.handler_.removeAll();
};



xrx.demo.Demo.prototype.loadPage_ = function(title, url, navbarLink,
      opt_callback) {
  this.reset_();
  var self = this;
  var contentElement = goog.dom.getElement('content');
  var titleElement = goog.dom.getElementsByTagNameAndClass('title')[0];
  var fallback = goog.dom.htmlToDocumentFragment(
      '<div id="content" class="container alert alert-danger"></div>');
  goog.dom.setTextContent(titleElement, title);
  goog.net.XhrIo.send(url, function(e) {
    var text = e.target.getResponseText();
    var html = goog.dom.htmlToDocumentFragment(text);
    if (e.target.getStatus() === 200) {
      goog.dom.replaceNode(html, contentElement);
      self.status_ = true;
    } else {
      goog.dom.setTextContent(fallback, e.target.getStatusText());
      goog.dom.replaceNode(fallback, contentElement);
      self.status_ = false;
    }
    if (self.activeNavbarLink_) goog.dom.classes.remove(self.activeNavbarLink_,
        'active');
    if (navbarLink) goog.dom.classes.add(navbarLink, 'active');
    if (navbarLink) self.activeNavbarLink_ = navbarLink;
    if (opt_callback !== undefined) opt_callback(self);
    $('#app').app();
  }, 'GET', undefined, { 'cache-control': 'no-cache' });
};



xrx.demo.Demo.prototype.loadPage_home_ = function() {
  this.loadPage_('SemToNotes', 'client/demo/home.html',
      goog.dom.getElement('homeLink'));
};



xrx.demo.Demo.prototype.loadPage_documentation_ = function() {
  var init = function(demo) {
    var href;
    var contentElement = goog.dom.getElement('content');
    var links = goog.dom.getElementsByTagNameAndClass('a');
    for(var i = 0, len = links.length; i < len; i++) {
      href = links[i].href;
    }
  }
  this.loadPage_('Examples | SemToNotes', 'client/demo/examples.html',
      goog.dom.getElement('apiLink'), init);
};



xrx.demo.Demo.prototype.installExampleBacklink_ = function(exampleId) {
  var self = this;
  var content = goog.dom.getElement('content');
  var backlink = goog.dom.htmlToDocumentFragment(
      '<a class="glyphicon glyphicon-arrow-left" href="#documentation!' +
      exampleId + '"><strong> back</strong></a>');
  goog.dom.insertChildAt(content, backlink, 0);
};



xrx.demo.Demo.prototype.installExampleSource_ = function(src, exampleId, type) {
  var content = goog.dom.getElement('content');
  var wrapper = goog.dom.createElement('div');
  var heading = type === 'js' ? goog.dom.htmlToDocumentFragment('<h3>Source</h3>') :
      goog.dom.htmlToDocumentFragment('<h3>Example</h3>');
  var pre = goog.dom.createElement('pre');
  var href = type === 'js' ? 'client/demo/example/' + exampleId + '.js' :
      'client/demo/example/' + exampleId + '.htm.html';
  var label = type === 'js' ? 'View Source &raquo;' : 'Try it yourself &raquo;'
  var viewSource = goog.dom.htmlToDocumentFragment(
      '<a href="' + href + '">' + label + '</a>');
  goog.dom.append(wrapper, [heading, viewSource, pre]);
  goog.dom.append(content, wrapper);
  goog.dom.setTextContent(pre, src);
  goog.dom.classes.add(pre, 'lang-' + type);
  goog.dom.classes.add(pre, 'prettyprint');
  PR.prettyPrint();
};



xrx.demo.Demo.prototype.installExample_ = function(src, exampleId, type) {
  this.installExampleBacklink_(exampleId);
  if (type) this.installExampleSource_(src, exampleId, type);
  if (type === 'js') {
    this.example_ = eval(src);
  }
};



xrx.demo.Demo.prototype.loadPage_example_ = function() {
  var page = goog.dom.getWindow().location.hash.split('#')[1] ||
      'home';
  var exampleId = page.split('!')[1];
  var loadScript = function(demo) {
    var content = goog.dom.getElement('content');
    var type = goog.dom.dataset.get(content, 'type');
    var url;
    if (type === 'js') {
      url = 'client/demo/example/' + exampleId + '.js';
    } else if (type === 'html') {
      url = 'client/demo/example/' + exampleId + '.htm.html';
    } else {
      PR.prettyPrint();
    }
    goog.net.XhrIo.send(url, function(e) {
      var src = e.target.getResponseText();
      if (demo.status_ === true) demo.installExample_(src, exampleId, type);
      PR.prettyPrint();
    }, 'GET', undefined, { 'cache-control': 'no-cache' });
  };
  this.loadPage_('Example | SemToNotes', 'client/demo/example/' + 
      exampleId + '.html', undefined, loadScript);
};



xrx.demo.Demo.prototype.loadPage_retrieval_ = function() {
  this.loadPage_('Topological Retrieval | SemToNotes', 'client/demo/retrieval.html',
      goog.dom.getElement('retrievalLink'));
};



xrx.demo.Demo.prototype.loadPage_about_ = function() {
  this.loadPage_('About | SemToNotes', 'client/demo/about.html',
      goog.dom.getElement('apiLink'));
};



xrx.demo.Demo.prototype.navigate_ = function() {
  // dispose the last example
  if (this.example_) {
    if (!goog.isArray(this.example_)) this.example_ = [this.example_];
    for (var i = 0, len = this.example_.length; i < len; i++) {
      this.example_[i].dispose();
      this.example_[i] = null;
    }
    this.example_ = null;
  }
  // resolve URL and navigate
  var page = goog.dom.getWindow().location.hash.split('#')[1] ||
      'home';
  if (goog.string.contains(page, '!')) page = page.split('!')[0];
  if (this['loadPage_' + page + '_']) {
    this['loadPage_' + page + '_']();
  } else {
    this.loadPage_();
  }
};



xrx.demo.Demo.prototype.init_ = function() {
  var self = this;
  goog.events.listen(this.history_, goog.history.EventType.NAVIGATE,
    self.navigate_, false, self
  );
  this.history_.setEnabled(true);
};



xrx.demo.install = function() {
  return new xrx.demo.Demo();
};