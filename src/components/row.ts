///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import Cell = require('./cell');

var appCell = new Cell();

class Row implements MithrilComponent {
	
	controller:any = function(): any {
		this.buildFields = function(data:Object): any {
			return m.component(appCell, {
				value: data['value'], 
				row: data['rowIndex'], 
				col: data['colIndex'],
				active: data['active']
			})
		}
	}
	
	view(ctrl?: Object, args?: Object): MithrilVirtualElement {
		var cells = [];
		var i = 0;
		Object.keys(args['data']).forEach(function(prop:string){
			i++;
			cells.push(ctrl['buildFields']({
				value: args['data'][prop](), 
				rowIndex: args['rowIndex'], 
				colIndex: i,
				active: args['active']
			}))
		});
		return m('tr', {
			'data-m.id': args['uid']
			}, cells);
	}
}

export = Row;