///<reference path="../typings/references.d.ts" />
import m = require('mithril');
import Row = require('./components/row');

//// Example Data:

var exampleData: Array<IServerData> = [
	{id: 0, value: 'one', config: {isStatic: true}},
	{id: 1, value: 'two', config: {isStatic: false}},
	{id: 2, value: 'three', config: {isStatic: false}},
]

var row = new Row();

var App = {
	view: function() {
		return m('table', [
			exampleData.map(function(data?:any, index?:number){
//				console.log(data);
				return m.component(row, {data: data})
			})
		])
	}
	
}

m.mount(document.getElementById('app'), App);