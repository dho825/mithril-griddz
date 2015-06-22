///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import Cell = require('./cell');

var appCell = new Cell();

class Row implements MithrilComponent {
	view(ctrl?: Object, props?: Object): MithrilVirtualElement {
		return m('tr', [
			props['row'].map(function(cell){
				return m.component(appCell, {
					value: cell.value(),
					coord: cell.coord(),
					highlight: props['highlight'],
					navigate: props['navigate']
				})
			})
		])
	}
}

export = Row;