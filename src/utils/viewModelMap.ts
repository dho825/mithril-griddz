import m = require('mithril');

var viewModelMap = function(signature) {
    var map = {}
    return function(key) {
        if (!map[key]) {
            map[key] = {}
            for (var prop in signature) map[key][prop] = m.prop(signature[prop]())
        }
        return map[key]
    }
}

export = viewModelMap;