///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import Row = require('./row');
//import mousetrap = require('mousetrap');
//import onKey = require('../utils/onKey');
import keymap = require('../utils/keymap');

var appRow = new Row();

class Table implements MithrilComponent {
	controller:any = function(props) {
		// Set local vars from Top Level props:
		var _data = props['data'],
			_state = props['state'],
			_ctrl = this;
		// TODO: var _config = props['config'];
		
		this.handleOffset = function() {
			var elem = <HTMLElement>document.getElementsByClassName('current').item(0); // TODO: create check in case returns > 0;
			if (elem) {
				var dimensions = {
					left: 	(elem.offsetLeft), 
					top: 	(elem.offsetTop),
					height: (elem.clientHeight),
					width: 	(elem.clientWidth)
				}
				_state.$offset(dimensions);
			}
		}
		
		// Begin EventHandlers:
		this.handleClick = function(coords?:Array<number>) {
			_ctrl.handleOffset();						
			if(coords) {
				if ( _state.$cell().toString() !== coords.toString() ) _state.$action('');
				_state.$cell(coords);
				_state.$range([coords, coords]);
			} else {
				return _state.$cell();
			}	
		}
		
		this.navigate = function(e) {
			_ctrl.handleOffset();
			var before = _state.$cell().slice(), after = before;
			var _maxCols = _state.$max().col, _maxRows = _state.$max().row;
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
			_state.$cell(after);
			_state.$range([after, after]);
			_state.$action(''); // TODO: set to a "clear action" method 
		}
		//TODO: this.handleShiftArrows
		//TODO: this.handleCtrlClick
	}
	
	view(ctrl:Object, props?:Object): MithrilVirtualElement {
		return m('table', m('tbody', [
			props['data'].map((row) => {
				return m.component(appRow, {
					row: row,
					handleClick: ctrl['handleClick'],
					navigate: ctrl['navigate'],
				})
			})
		]))
	}
}

export = Table;