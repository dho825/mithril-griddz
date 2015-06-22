///<reference path="../typings/references.d.ts" />
import m = require('mithril');
import Table = require('./components/table');
// Example Data:
import appDB = require('./stores/baseStore');
//appDB.getData(); // can be put into controller
//import onKey = require('./utils/onKey');
import keymap = require('./utils/keymap');

var griddzTable = new Table();

window.addEventListener('keydown', function(e){
	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});

var App = {	
	controller: function() {
		this._data = appDB.getData();
	},
	_navigate: function(e) {
		var before = this.vm.highlight().slice(); // a new array, not the reference!
		var after = before;
		if (e.keyCode == keymap['left']) {
			before[0] > 0 ? after[0]-=1 : after[0] = 0 }
		else if (e.keyCode == keymap['right']) {
			// TODO: add max col, max row params
			before[0] < 7 ? after[0]+=1 : after[0] = 7 }
		else if (e.keyCode == keymap['up']) {
			before[1] > 0 ? after[1]-=1 : after[1] = 0 }
		else if (e.keyCode == keymap['down']) {
			before[1] < 38 ? after[1]+=1 : after[1] = 38 }
		else {
			after = before;
			m.redraw.strategy("none");
		}
		this.vm.highlight(after);
	},
	vm: {
		/* coordinates: [column, row] */
		highlight: m.prop(''),
		range: m.prop(''),
		navigate: function(e) {return App._navigate(e)}
	},
	view: function(ctrl: any) {
		var vm = App.vm;
		return m.component(griddzTable, {
			data: ctrl._data,
			highlight: vm.highlight,
			navigate: vm.navigate
		})
	}
}

m.mount(document.getElementById('app'), App);