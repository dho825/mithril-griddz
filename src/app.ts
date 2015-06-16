///<reference path="../typings/references.d.ts" />
import m = require('mithril');
import Table = require('./components/table');
// Example Data:
import appDB = require('./stores/serverModel');

appDB.getData(); // can be put into controller

var griddzTable = new Table();

//function move(e) {
//	var td = e.target.parentNode, tr = td.parentNode, table = tr.parentNode
//    if (e.keyCode == 37) return tr.childNodes[Math.max(1, td.cellIndex - 1)].firstChild
//    else if (e.keyCode == 38) return table.childNodes[Math.max(1, tr.rowIndex - 1)].childNodes[td.cellIndex].firstChild
//    else if (e.keyCode == 39) return tr.childNodes[Math.min(tr.childNodes.length - 1, td.cellIndex + 1)].firstChild
//    else if (e.keyCode == 40) return table.childNodes[Math.min(table.childNodes.length - 1, tr.rowIndex + 1)].childNodes[td.cellIndex].firstChild
//    else m.redraw.strategy("none")	
//}

window.addEventListener('keydown', function(e){
//	console.log(e.keyCode);
//	console.log(e.target);
	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});

var App = {
	controller: function() {
		this.active = m.prop(false);
	},
	
	view: function(ctrl: any) {
		return m.component(griddzTable, {
			data: appDB['_data'],
			active: ctrl.active
		})
	}
}

m.mount(document.getElementById('app'), App);

//m.mount(document.getElementById('app'), {view: function() {
//	return m('input', {
//		onkeypress: function(e) {
//			console.log(e);
//		},
//		value: 'eh'
//	})
//}})