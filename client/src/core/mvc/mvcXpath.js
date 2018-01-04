/**
 * @fileoverview A class representing an intelligent MVC XPath
 * expression providing additional information about the internal
 * structure and the referenced XML tokens of the expression.
 */

goog.provide('xrx.mvc.Xpath');



goog.require('goog.array');
goog.require('xrx.mvc');
goog.require('xrx.xpath');
goog.require('xrx.xpath.BinaryExpr');
goog.require('xrx.xpath.FilterExpr');
goog.require('xrx.xpath.FunctionCall');
goog.require('xrx.xpath.KindTest');
goog.require('xrx.xpath.Literal');
goog.require('xrx.xpath.NameTest');
goog.require('xrx.xpath.Number');
goog.require('xrx.xpath.PathExpr');
goog.require('xrx.xpath.Predicates');
goog.require('xrx.xpath.Step');
goog.require('xrx.xpath.UnionExpr');



/**
 * Constructs a new MVC XPath expression.
 * @param {!string} An XPath expression in string-form.
 * @constructor
 */
xrx.mvc.Xpath = function(expression, opt_debug) {

  this.debug_ = opt_debug;

  this.expression_ = xrx.xpath.compile(expression);

  this.instances_ = [];

  this.binds_ = [];

  this.hasNotTag_ = false;

  this.hasAttrValue_ = false;

  this.analyse_(this.expression_.gexpr);
};



/**
 * Returns the compiled XPath expression.
 * @return {xrx.xpath.XPathExpression} The expression.
 */
xrx.mvc.Xpath.prototype.getExpression = function() {
  return this.expression_;
};



/**
 * Evaluates the compiled XPath expression.
 * @param {?xrx.xml.Node} opt_context The context node.
 * @param {?xrx.xpath.XPathResultType} opt_type The expected XPath result type.
 * @return {xrx.xpath.XPathResult} The XPath result.
 */
xrx.mvc.Xpath.prototype.evaluate = function(opt_context, opt_type) {
  var type = opt_type || xrx.xpath.XPathResultType.ANY_TYPE;
  return xrx.xpath.evaluateCompiled(this.expression_, opt_context, type);
};



/**
 * Whether this XPath expression references a specific instance.
 * @return {boolean}
 */
xrx.mvc.Xpath.prototype.hasInstance = function(id) {
  return goog.array.contains(this.instances_, id);
};



/**
 * Whether this XPath expression references a not-tag token.
 * @return {boolean}
 */
xrx.mvc.Xpath.prototype.hasNotTag = function() {
  return this.hasNotTag_;
};



/**
 * Whether this XPath expression references an attribute-value token.
 * @return {boolean}
 */
xrx.mvc.Xpath.prototype.hasAttrValue = function() {
  return this.hasAttrValue_;
};



/**
 * Analyses an XPath binary expression.
 * @param {!xrx.xpath.BinaryExpr} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.binaryExpr_ = function(expr) {
  if (expr.getRight() instanceof xrx.xpath.Literal &&
      expr.getLeft() instanceof xrx.xpath.PathExpr) {
    this.hasNotTag_ = true;
  } else if (expr.getLeft() instanceof xrx.xpath.Literal &&
      expr.getRight() instanceof xrx.xpath.PathExpr) {
    this.hasNotTag_ = true;
  } else {}
  this.analyse_(expr.getLeft());
  this.analyse_(expr.getRight());
};



/**
 * Analyses an XPath filter expression.
 * @param {!xrx.xpath.FilterExpr} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.filterExpr_ = function(expr) {
  var primary = expr.getPrimary();
  var predicates = expr.getPredicates();
  if (primary) this.analyse_(primary);
  for(var i = 0, len = predicates.length; i < len; i++) {
    this.analyse_(predicates[i]);
  }
};



/**
 * Analyses an XPath function call expression.
 * @param {!xrx.xpath.FunctionCall} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.functionCall_ = function(expr) {
  switch(expr.getFunction().name) {
  case 'xrx:instance':
    this.instances_.push(expr.getArg(0).getString());
    break;
  case 'xrx:bind':
    var bindId = expr.getArg(0).getString();
    var bind;
    if (!goog.array.contains(this.binds_, bindId)) {
      bind = xrx.mvc.getComponent(bindId);
      this.binds_.push(bindId);
      this.analyse_(bind.getXpath().getExpression().gexpr);
    }
    break;
  default:
    var a = expr.getArgs();
    for (var i = 0, len = a.length; i < len; i++) {
      this.analyse_(a[i]);
    };
    break;
  }
};



/**
 * Analyses an XPath path expression.
 * @param {!xrx.xpath.PathExpr} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.pathExpr_ = function(expr) {
  var steps = expr.getSteps();
  this.analyse_(expr.getFilter());
  for (var i = 0, len = steps.length; i < len; i++) {
    this.analyse_(steps[i]);
  }
};



/**
 * Analyses an XPath step expression.
 * @param {!xrx.xpath.Step} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.step_ = function(expr) {
  if (expr.getAxis().getName() === 'attribute') this.hasAttrValue_ = true;
  this.analyse_(expr.getTest());
  this.analyse_(expr.getPredicates());
};



/**
 * Analyses an XPath name-test expression.
 * @param {!xrx.xpath.NameTest} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.nameTest_ = function(expr) {
};



/**
 * Analyses an XPath predicates expression.
 * @param {!xrx.xpath.Predicates} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.predicates_ = function(expr) {
  goog.array.forEach(expr.getPredicates(), function(e) {
    this.analyse_(e);
  }, this);
};



/**
 * Analyses an XPath kind-test expression.
 * @param {!xrx.xpath.KindTest} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.kindTest_ = function(expr) {
  if (expr.getTypeName() === 'text') this.hasNotTag_ = true;
};



/**
 * Analyses an XPath number expression.
 * @param {!xrx.xpath.Number} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.number_ = function(expr) {
};



/**
 * Analyses an XPath literal expression.
 * @param {!xrx.xpath.Literal} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.literal_ = function(expr) {
};



/**
 * Analyses an XPath union expression.
 * @param {!xrx.xpath.Union} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.unionExpr_ = function(expr) {
  var paths = expr.getPaths();
  for (var i = 0, len = paths.length; i < len; i++) {
    this.analyse_(paths[i]);
  }
};



/**
 * Analyses an XPath expression.
 * @param {!xrx.xpath.Expr} The expression.
 * @private
 */
xrx.mvc.Xpath.prototype.analyse_ = function(expr) {
  if (expr instanceof xrx.xpath.PathExpr) {
    this.pathExpr_(expr);
  } else if (expr instanceof xrx.xpath.FunctionCall) {
    this.functionCall_(expr);
  } else if (expr instanceof xrx.xpath.FilterExpr) {
    this.filterExpr_(expr);
  } else if (expr instanceof xrx.xpath.BinaryExpr) {
    this.binaryExpr_(expr);
  } else if (expr instanceof xrx.xpath.Step) {
    this.step_(expr);
  } else if (expr instanceof xrx.xpath.NameTest) {
    this.nameTest_(expr);
  } else if (expr instanceof xrx.xpath.Predicates) {
    this.predicates_(expr);
  } else if (expr instanceof xrx.xpath.KindTest) {
    this.kindTest_(expr);
  } else if (expr instanceof xrx.xpath.Number) {
    this.number_(expr);
  } else if (expr instanceof xrx.xpath.Literal) {
    this.literal_(expr);
  } else if (expr instanceof xrx.xpath.UnionExpr) {
    this.unionExpr_(expr);
  } else if (expr instanceof xrx.xpath.PathExpr.ContextHelperExpr) {
    // do nothing
  } else {
    console.log(expr);
    throw Error('Unknown expression type.');
  }
};
