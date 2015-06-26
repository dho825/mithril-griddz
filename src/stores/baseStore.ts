///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import n2a = require('../utils/n2alpha');

interface ICellState {
	raw: () => string;
	value: () => string;
	coord: () => Array<number>;
	editor: () => string;
	editing: () => boolean;
}

class GriddzStore {
	private _data: [Array<ICellState>];
	private _dataMap: {}; //immutable.js? weakmap?
	
	private loadData(data:IServerData[]):Object {
		var temp_data = [], temp_dataMap = {};
		data.map((model:IServerData, rowIndex:number) => {		
			var _row = [];
			var colIndex = 0;
			Object.keys(model).forEach((k:string) => {
				_row.push({
					raw:      m.prop(''),
					value:    m.prop(model[k]),
					coord:    m.prop([colIndex, rowIndex]),
					editor:   m.prop('general'),
				})
				
				var alphaKey = n2a(colIndex) + (rowIndex + 1).toString();// [0,0] = "A1" not "A0"
				temp_dataMap[alphaKey] = [colIndex, rowIndex];
				
				colIndex++;
			})
			temp_data.push(_row);
		})
		return {data: temp_data, dataMap: temp_dataMap}
	}
	
	getData():[Array<ICellState>] {
		return this._data;
	}
	
	getDataMap():Object {
		return this._dataMap;
	}
	
	updateCell(id:string|number, updates: IUpdateData):void {
		// TODO: updateCell with new information
	}
	
	constructor(config?:IServerData[]) {
		//TODO: set config param to local vars;
		//TODO: create logic to use url for ajax from server;
		//this.loadData(config) // placeholder
		var loading = this.loadData(config);
		this._data = loading['data'];
		this._dataMap = loading['dataMap'];
	}
}

export = GriddzStore;


//var AppStore:GriddzStore = {
//	_data: [], _map: {},
//	
//	getData: function(url?:string): any {
//		if (url) {
//			// TODO: get/return ajax from server...	
//		} else {
//			this.loadData(_db.assignments);
//			return this._data
//			// TODO: set generic config/load config for blank spreadsheet...	
//		}
//	},
//	
//	loadData: function(data: IServerData[]):void {	
//		data.map((model:IServerData, rowIndex:number) => {
//			var _row = [];
//			var colIndex = 0;
//			Object.keys(model).forEach((k:string) => {				
//				_row.push({
//					raw: m.prop(''),
//					value: m.prop(model[k]),
//					coord: m.prop([colIndex, rowIndex]), // TODO: set as string? ie => "A1, B14, AH105"
//					editor: m.prop('general'),
//				})
//				var alphaKey = n2a(colIndex) + rowIndex.toString();
//				this._map[alphaKey] = [colIndex, rowIndex];
//				colIndex++;
//			})
//			this._data.push(_row);
//		});
//	},
//	updateCell: function(id:string|number, updates: IUpdateData):void {
//		// TODO: updateCell with new information
//	}
//}
//
//export = AppStore;