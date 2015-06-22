///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import Row = require('./row');

var appRow = new Row();

class Table implements MithrilComponent {
	view(ctrl?:Object, props?:Object): MithrilVirtualElement {
		return m('table', m('tbody', [
			props['data'].map(function(row){
				return m.component(appRow, {
					row: row,
					highlight: props['highlight'],
					navigate: props['navigate']
				})
				})
			])
		)
	}
}

export = Table;