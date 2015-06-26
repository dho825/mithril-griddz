///<reference path="../../typings/references.d.ts" />
import m = require('mithril');

class Cell implements MithrilComponent {
	view(ctrl?: any, props?: Object): MithrilVirtualElement {
		var clicks = 0, DELAY = 120, timer = null;
		return m('td', {
			className: props['handleClick']().toString() === props['coord'].toString() ? 'current' : '',
			tabindex: -1,
			onclick: function(e) {
				//e.preventDefault();
				//e.target.focus();
				props['handleClick'](props['coord'].slice()); // pass in a new array, not the reference!
			},
			onkeydown: function(e) {
				props['navigate'](e);
			},
		}, props['value'])
	}
}

export = Cell;