var m              = require('mithril');
var marked         = require('marked');

var Tutorial       = require('../models/tutorials');
var MarkedText     = module.exports;

MarkedText.view = function(ctrl, markDownString) {
  return m.trust(marked(markDownString))
}
