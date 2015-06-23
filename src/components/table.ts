///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import Row = require('./row');
//import mousetrap = require('mousetrap');
//import onKey = require('../utils/onKey');
import keymap = require('../utils/keymap');

var appRow = new Row();

class Table implements MithrilComponent {
	
	state:any = {
		maxCols: m.prop(''),
		maxRows: m.prop(''),
		selected: m.prop(''), // [col, row]
		range: m.prop(''), // [[startCol, startRow], [endCol, endRow]]
		editing: m.prop(false),
		// TODO: multi: m.prop([[],[],[],[],...])
		// TODO: undoState: m.prop(_data(t-1))
		// TODO: redoState: m.prop(_data(t+1))		
	}
	
	controller:any = function(props) {
		var _data = props['data'];
		var _state; var _ctrl = this;
		// TODO: var _config = props['config'];
		
		this.setInitialState = function(that) {
			_state = that.state;
			this.setMaxes();
			// TODO: this._logversion(push: _data);
		}
		
		this.setMaxes = function() {
			while (!_data['coord']) {
				_data = _data[_data.length-1]
			}
			var coord = _data['coord']().slice();
			_state['maxCols'](coord[0]);
			_state['maxRows'](coord[1]);
		}
		
		this.handleClick = function(coords?) {
			if(coords) {
				_state.selected(coords);
				_state.range([coords, coords]);
			} else {
				return _state.selected();
			}
		}
		
		this.navigate = function(e) {
			var before = _state.selected().slice(), after = before;
			var _maxCols = _state.maxCols(), _maxRows = _state.maxRows();
			_ctrl.handleArrows(e, before, after, _maxCols, _maxRows);
		}
		
		this.handleArrows = function(e, before, after, _maxCols, _maxRows) {
			// SINGLE CELL MOV'T
			if (e.keyCode == keymap['left']) {
				before[0] > 0 ? after[0]-=1 : after[0] = 0 }
			else if (e.keyCode == keymap['right']) {
				before[0] < 7 ? after[0]+=1 : after[0] = _maxCols }
			else if (e.keyCode == keymap['up']) {
				before[1] > 0 ? after[1]-=1 : after[1] = 0 }
			else if (e.keyCode == keymap['down']) {
				before[1] < 38 ? after[1]+=1 : after[1] = _maxRows }
			else {
				after = before;
				m.redraw.strategy("none");
			}
			_state.selected(after);
			_state.range([after, after]);
		}
	}
	
	view(ctrl:Object, props?:Object): MithrilVirtualElement {
		ctrl['setInitialState'](this);
		return m('table', m('tbody', [
			props['data'].map((row) => {
				return m.component(appRow, {
					row: row,
					highlight: ctrl['handleClick'],
					navigate: ctrl['navigate']
				})
				})
			])
		)
	}
}

export = Table;