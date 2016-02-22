var m              = require('mithril');
var marked         = require('marked');

var Tutorial       = require('../models/tutorials');
var MarkedText     = module.exports;
//this takes a marked down string and calls the marked function.
//marked down function takes the string and turns it into html
//the m.trust function takes that html and turns it into mithril accepted format
MarkedText.view = function(ctrl, markDownString) {
  return m('.step-content', m.trust(marked(markDownString)));
}
