/**
 * @fileoverview A class offering a tool-bar for a canvas.
 */

goog.provide('xrx.canvas.Toolbar');
goog.provide('xrx.canvas.ToolbarButton');
goog.provide('xrx.canvas.ToolbarOption');


goog.require('goog.dom.DomHelper');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('xrx.canvas');
goog.require('xrx.canvas.Handler');



/**
 * A class offering a tool-bar for a canvas.
 * @param {DOMElement} element The element used to install the tool-bar.
 * @param {xrx.canvas.Canvas} canvas The canvas.
 * @constructor
 */
xrx.canvas.Toolbar = function(element, canvas) {

  this.element_ = element;

  this.canvas_ = canvas;

  this.create_();
};



xrx.canvas.Toolbar.prototype.setSelectedDefault = function() {
  var span = goog.dom.getFirstElementChild(this.element_);
  var img = goog.dom.getFirstElementChild(span);
  xrx.canvas.ToolbarToggle.setSelected(img);
};



xrx.canvas.Toolbar.prototype.handleClick = function(e) {
  var img;
  var span;
  var isSelected;
  var numSelected = 0;
  var childs = goog.dom.getChildren(this.element_);

  if (goog.dom.classes.has(e.target.parentNode, xrx.canvas.ToolbarToggle.className)) {
    for (var i = 0, len = childs.length; i < len; i++) {
      img = goog.dom.getFirstElementChild(childs[i]);
      if (img !== e.target) xrx.canvas.ToolbarToggle.setSelected(img, false);
    }

    isSelected = goog.dom.classes.has(e.target, 'xrx-ui-state-selected');
    if (!isSelected) {
      xrx.canvas.ToolbarToggle.setSelected(e.target);
      numSelected += 1;
    } else {
      xrx.canvas.ToolbarToggle.setSelected(e.target, false);
    }

    if (numSelected === 0) this.setSelectedDefault();
  }
};



/**
 * @private
 */
xrx.canvas.Toolbar.prototype.create_ = function() {
  var self = this;

  var registerButtonClick = function(button, handler) {
    goog.events.listen(button, goog.events.EventType.CLICK, function(e) {
      handler(self.canvas_);
    });
  };

  var registerToggleClick = function(button, handler, arg) {
    goog.events.listen(button, goog.events.EventType.CLICK, function(e) {
      var isSelected = goog.dom.classes.has(e.target, 'xrx-ui-state-selected');
      !isSelected ? handler(false, self.canvas_, arg) : handler(true, self.canvas_, arg);
    });
  };

  // register events
  goog.events.listen(this.element_, goog.events.EventType.CLICK, function(e) {
      self.handleClick(e);
  }, true);

  // viewer buttons
  var buttonPanImage = xrx.canvas.ToolbarToggle.create('./res/openhand.png',
      'Zoom, Pan or Rotate the Canvas.');
  registerButtonClick(buttonPanImage, xrx.canvas.Handler.setModeBackground);
  var buttonZoomIn = xrx.canvas.ToolbarButton.create('./res/zoomIn.png',
      'Zoom In.');
  registerButtonClick(buttonZoomIn, xrx.canvas.Handler.zoomIn);
  var buttonZoomOut = xrx.canvas.ToolbarButton.create('./res/zoomOut.png',
      'Zoom Out.');
  registerButtonClick(buttonZoomOut, xrx.canvas.Handler.zoomOut);
  var buttonRotateLeft = xrx.canvas.ToolbarButton.create('./res/rotateLeft.png',
      'Rotate Left.');
  registerButtonClick(buttonRotateLeft, xrx.canvas.Handler.rotateLeft);
  var buttonRotateRight = xrx.canvas.ToolbarButton.create('./res/rotateRight.png',
      'Rotate Right.');
  registerButtonClick(buttonRotateRight, xrx.canvas.Handler.rotateRight);

  // shape create buttons
  var buttonShapeRect = xrx.canvas.ToolbarToggle.create('./res/shapeRect.png',
      'Draw a Rect.');
  registerToggleClick(buttonShapeRect, xrx.canvas.Handler.setModeCreate, 'RectCreate');
  var buttonShapePolygon = xrx.canvas.ToolbarToggle.create('./res/shapePolygon.png',
      'Draw a Polygon.');
  registerToggleClick(buttonShapePolygon, xrx.canvas.Handler.setModeCreate, 'PolygonCreate');

  // shape modify buttons
  var buttonShapeModify = xrx.canvas.ToolbarToggle.create('./res/move.png',
      'Move or Modify a Shape.');
  registerToggleClick(buttonShapeModify, xrx.canvas.Handler.setModeModify);
  var buttonShapeDelete = xrx.canvas.ToolbarToggle.create('./res/delete.png',
      'Delete a Shape.');
  registerToggleClick(buttonShapeDelete, xrx.canvas.Handler.setModeDelete);

  goog.dom.append(this.element_, buttonPanImage);
  goog.dom.append(this.element_, buttonZoomIn);
  goog.dom.append(this.element_, buttonZoomOut);
  goog.dom.append(this.element_, buttonRotateLeft);
  goog.dom.append(this.element_, buttonRotateRight);
  goog.dom.append(this.element_, buttonShapeRect);
  goog.dom.append(this.element_, buttonShapePolygon);
  goog.dom.append(this.element_, buttonShapeModify);
  goog.dom.append(this.element_, buttonShapeDelete);

  // set the first button as default selection
  this.setSelectedDefault();

  return this.element_;
};



xrx.canvas.ToolbarButton = function() {};



xrx.canvas.ToolbarButton.className = 'xrx-canvas-toolbar-button';



xrx.canvas.ToolbarButton.handleMouseOver = function(e) {
  goog.dom.classes.addRemove(e.target, 'xrx-ui-state-mouseout',
      'xrx-ui-state-mouseover');
};



xrx.canvas.ToolbarButton.handleMouseOut = function(e) {
  goog.dom.classes.addRemove(e.target, 'xrx-ui-state-mouseover',
      'xrx-ui-state-mouseout');
};



xrx.canvas.ToolbarButton.create = function(imageUrl, tooltip) {
  var wrapper = goog.dom.createElement('span');
  goog.dom.classes.set(wrapper, xrx.canvas.ToolbarButton.className);

  var img = goog.dom.createElement('img');
  img.setAttribute('src', imageUrl);
  img.setAttribute('title', tooltip);
  goog.dom.classes.set(img, 'xrx-ui-state-mouseout');

  goog.dom.append(wrapper, img);

  goog.events.listen(wrapper, goog.events.EventType.MOUSEOVER,
      function(e) {
        xrx.canvas.ToolbarButton.handleMouseOver(e);
  });
  goog.events.listen(wrapper, goog.events.EventType.MOUSEOUT,
      function(e) {
        xrx.canvas.ToolbarButton.handleMouseOut(e);
  });

  return wrapper;
};



xrx.canvas.ToolbarToggle = function() {};



xrx.canvas.ToolbarToggle.className = 'xrx-canvas-toolbar-toggle';



xrx.canvas.ToolbarToggle.setSelected = function(element, opt_flag) {
  if (opt_flag === false) {
    goog.dom.classes.remove(element, 'xrx-ui-state-selected');
  } else {
    goog.dom.classes.add(element, 'xrx-ui-state-selected');
  }
};



xrx.canvas.ToolbarToggle.handleMouseOver = xrx.canvas.ToolbarButton.handleMouseOver;



xrx.canvas.ToolbarToggle.handleMouseOut = xrx.canvas.ToolbarButton.handleMouseOut;



xrx.canvas.ToolbarToggle.create = function(imageUrl, tooltip) {
  var wrapper = goog.dom.createElement('span');
  goog.dom.classes.set(wrapper, xrx.canvas.ToolbarToggle.className);

  var img = goog.dom.createElement('img');
  img.setAttribute('src', imageUrl);
  img.setAttribute('title', tooltip);
  goog.dom.classes.set(img, 'xrx-ui-state-mouseout');

  goog.dom.append(wrapper, img);

  goog.events.listen(wrapper, goog.events.EventType.MOUSEOVER,
      function(e) {
        xrx.canvas.ToolbarToggle.handleMouseOver(e);
  });
  goog.events.listen(wrapper, goog.events.EventType.MOUSEOUT,
      function(e) {
        xrx.canvas.ToolbarToggle.handleMouseOut(e);
  });

  return wrapper;
};
