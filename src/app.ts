///<reference path="../typings/references.d.ts" />
import m = require('mithril');
import Table = require('./components/table');
import Navbox = require('./components/navbox');
import Editor = require('./components/editor');
import Store = require('./stores/baseStore');
// Example Data:
import _db = require('./stores/mockdb');

var Grid = new Table();
var Selector = new Navbox();
var Input = new Editor();
var appDB = new Store(_db.assignments);

window.addEventListener('keydown', function(e){
	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});

interface IApplicationState {
	$cell: () => Array<number>;
	$range: () => Array<[number]>;
	$max: () => Object;
	$offset: () => Object;
	$action: () => string;
}

var GriddzApp = {		
	state: <IApplicationState> {
		$cell:   m.prop([]),
		$range:  m.prop([]),
		$max:    m.prop({}),
		$offset: m.prop({top:-1, left: -1, width: -1, height: -1}),
		$action: m.prop(''), //editing, dragging, selecting, ''
	},
	
	controller: function() {
		this._data = appDB.getData();
		this._dataMap = appDB.getDataMap();
		
		this.setInitialState = function(that) {
			var _data = this._data;
			while (!_data['coord']) {
				_data = _data[_data.length-1]
			}
			var coord = _data['coord']().slice();
			that.state.$max({col:coord[0], row:coord[1]});
		};
		
//		this.getCell = (coord:Array<number>) => {			
//			if (coord.toString()) {
//				var _col = coord[0], _row = coord[1];
//				return this._data[_col][_row];
//			} else { return false }
//		}
		// this._changelog = [];
		// handleUndo(); handleRedo();
	},
	
	view: function(ctrl: any) {
		ctrl.setInitialState(this);
		return [
			m.component(Grid, {data: ctrl._data, state: this.state}),
			m.component(Selector, {state: this.state}),
//			m.component(Input, {state: this.state, dataMap: ctrl._dataMap, getCell: ctrl.getCell})
			m.component(Input, {state: this.state, dataMap: ctrl._dataMap})
		]
	}
}

m.mount(document.getElementById('app'), GriddzApp);