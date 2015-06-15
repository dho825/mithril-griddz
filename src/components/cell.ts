///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import viewModelMap = require('../utils/viewModelMap');

class Cell implements MithrilComponent {
	view(ctrl?: Function, args?: Object): MithrilVirtualElement {
		if(args['isStatic']) {
			return m('th', args['value'])
		} else {
			return m('td', args['value'])
		}
	}
}

export = Cell;