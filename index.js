/*
 * POSTCSS-NESTED-SMACSS
 *
 * Adds @module, @submodule, @element and @state atrules to your syntax.
 * This script will automatically rename and prefix those atrules based
 * on SMACSS syntax structure.
 *
 * Requires the postcss-nested plugin to be run AFTER this one to
 * properly compile.
 *
 * https://smacss.com/
*/


var postcss = require('postcss');

module.exports = postcss.plugin('postcss-nested-smacss', function (opts) {
  opts = opts || {};


  processAtRule = function (atRule, moduleSelector, root) {
    // Break up the params by commas so we can iterate
    var params = atRule.params.split(/[ ,]+/);
    var selector = '';
    var name = atRule.name;

    // Construct a prefix for each param seperated by commas
    for (i = 0; i < params.length; i++) {
      if (name == "element") {
        selector += moduleSelector + "_" + params[i]
      } else if (name == "submodule") {
        selector += '&' + moduleSelector + '-' + params[i]
      } else if (name == "state") {
        selector += '&.is-' + params[i]
      }
      if (i != params.length - 1) {
        selector += ','
      }
    }

    // Make a new rule with the created selector.
    var rule = postcss.rule({ selector: selector });

    // Copy the declarations over to match our new rule.
    atRule.each(function (decl) {
      rule.append(decl)
    })

    // Replace the @atrule with our new .selector
    atRule.replaceWith(rule);

    // Elements one level under the module should be pulled out and moved to root.
    if (name == "element" && rule.parent.selector == moduleSelector) {
      rule.moveAfter(root);
    }

    // Now, recusively run through all the @atrule's below this recompiled one.
    processTree(rule, moduleSelector);
  }

  processTree = function (root, moduleSelector) {

    // We treat the module special, because it needs to pass it's name as a prefix to children.
    root.eachAtRule('module', function (atRule) {
      var params = atRule.params.split(/[ ,]+/)
      var name = '.' + atRule.params;
      var selector = postcss.rule({ selector: name });

      if (params.length > 1) {
        result.warn('A @module can only take one and only one paramater', { node: module })
      } else {
        atRule.nodes.forEach(function (child) {
          child.moveTo(selector);
        });
        atRule.replaceWith(selector);
        processTree(selector, name);
      }

    });

    root.eachAtRule('element', function (atRule) {
      processAtRule(atRule, moduleSelector, root)
    });

    root.eachAtRule('submodule', function (atRule) {
      processAtRule(atRule, moduleSelector, root)
    });

    root.eachAtRule('state', function (atRule) {
      processAtRule(atRule, moduleSelector, root)
    });

  };

  return function (css, result) {

    processTree(css);

  };
});
