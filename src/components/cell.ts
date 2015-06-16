///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import viewModelMap = require('../utils/viewModelMap');

//function move(e) {
//	var td = e.target.parentNode, tr = td.parentNode, table = tr.parentNode
//    if (e.keyCode == 37) return tr.childNodes[Math.max(1, td.cellIndex - 1)].firstChild
//    else if (e.keyCode == 38) return table.childNodes[Math.max(1, tr.rowIndex - 1)].childNodes[td.cellIndex].firstChild
//    else if (e.keyCode == 39) return tr.childNodes[Math.min(tr.childNodes.length - 1, td.cellIndex + 1)].firstChild
//    else if (e.keyCode == 40) return table.childNodes[Math.min(table.childNodes.length - 1, tr.rowIndex + 1)].childNodes[td.cellIndex].firstChild
//    else m.redraw.strategy("none")	
//}

//var arrow = {
//	'LEFT': 37,
//	'UP': 38,
//	'RIGHT': 39,
//	'DOWN': 40
//}

class Cell implements MithrilComponent {
//	controller:any = function():any {
//		this.move = function(e) {
//			var td = e.target, tr = td.parentNode, table = tr.parentNode;
//			if (e.keyCode == arrow['LEFT']) {console.log(tr.childNodes[Math.max(1, tr.rowIndex-1)])}
//		    else if (e.keyCode == arrow['UP']){console.log(table.childNodes[Math.max(1, tr.rowIndex - 1)].childNodes[td.cellIndex])}
//		    else if (e.keyCode == arrow['RIGHT']) {console.log(tr.childNodes[Math.min(tr.childNodes.length - 1, td.cellIndex + 1)])}
//		    else if (e.keyCode == arrow['DOWN']) {console.log(table.childNodes[Math.min(table.childNodes.length - 1, tr.rowIndex + 1)].childNodes[td.cellIndex])}
//		    else {m.redraw.strategy("none")}
//		}
//	}
	
	view(ctrl?: any, args?: Object): MithrilVirtualElement {
		return m('td', {
			'data-row': args['row'], 
			'data-col': args['col'],
			className: args['active']() === ctrl ? 'selected' : '',
			tabindex: -1,
			onclick: function(e) {
				e.preventDefault();
				e.target.focus()
				args['active'](ctrl)
			},
			onkeydown: function(e) {
				ctrl.move(e);
			}
		}, args['value'])
	}
}

export = Cell;