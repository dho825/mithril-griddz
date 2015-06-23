///<reference path="../typings/references.d.ts" />
import m = require('mithril');
import Table = require('./components/table');
// Example Data:
import appDB = require('./stores/baseStore');

var griddzTable = new Table();

window.addEventListener('keydown', function(e){
	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});

var App = {	
//	tableState: {
//		maxCols: m.prop(''),
//		maxRows: m.prop(''),
//		/* coordinates: [column, row] */
//		selected: m.prop(''), // [col, row]
//		range: m.prop(''), // [[startCol, startRow], [endCol, endRow]]
//		editing: m.prop(false),
//		// TODO: multi: m.prop([[],[],[],[],...])
//		// TODO: undoState: m.prop(_data(t-1))
//		// TODO: redoState: m.prop(_data(t+1))
//	},
	
	controller: function() {
		this._data = appDB.getData();
	},
	view: function(ctrl: any) {
		return m.component(griddzTable, { data: ctrl._data,
			//state: App.tableState
		})
	}
}

m.mount(document.getElementById('app'), App);