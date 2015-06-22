///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import viewModelMap = require('../utils/viewModelMap');

class Cell implements MithrilComponent {
	view(ctrl?: any, props?: Object): MithrilVirtualElement {
		return m('td', {
			id: props['coord'],
			className: props['highlight']().toString() === props['coord'].toString() ? 'selected' : '',
			tabindex: -1,
			onclick: function(e) {
				//e.preventDefault();
				//e.target.focus();
				props['highlight'](props['coord'].slice()) // pass in a new array, not the reference!
			},
			onkeydown: function(e) {
				props['navigate'](e);
			}
		}, props['value'])
	}
}

export = Cell;