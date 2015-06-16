///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
var _db = require('./mockdb');

var AppStore:GriddzStore = {
	_data: [],
	getData: function(url?:string): void {
		// TODO: get/return ajax from server...
		this.loadData(_db.assignments);
	},
	loadData: function(data: IServerData[]):void {
		for(var i = 0, l = data.length; i < l; i++) {
			var newObject:IProps = {
				id: m.prop(data[i].id),
				fmv: m.prop(data[i].fmv),
				company_name: m.prop(data[i].company_name),
				project_type: m.prop(data[i].project_type),
				agg_value: m.prop(data[i].agg_value),
				payment: m.prop(data[i].payment),
				method: m.prop(data[i].method)
			};
			this._data.push(newObject);
		}
	},
	updateCell: function(id:string|number, updates: IUpdateData):void {
		// TODO: updateCell with new information
	}
}

export = AppStore;