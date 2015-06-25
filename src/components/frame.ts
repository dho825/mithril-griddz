///<reference path="../../typings/references.d.ts" />
import m = require('mithril');

var pxls:number = 4; // 2x border-thickness

var TopBorder:MithrilComponent = {
	view: function(ctrl:any, args?:any): MithrilVirtualElement {
		return m('div', {
			style: {
				display: args['action'] === 'editing' ? 'none' : 'block',
				position: 'absolute',
				height: '2px',
				backgroundColor: '#5292F7',
				width: args['dimensions'].width.toString() + 'px'
			}
		})
	}
}

var LeftBorder:MithrilComponent = {
	view: function(ctrl:any, args?:any): MithrilVirtualElement {
		return m('div', {
			style: {
				display: args['action'] === 'editing' ? 'none' : 'block',
				position: 'absolute',
				width: '2px',
				backgroundColor: '#5292F7',
				height: args['dimensions'].height.toString() + 'px'
			}
		})
	}
}

var BottomBorder:MithrilComponent = {
	view: function(ctrl:any, args?:any): MithrilVirtualElement {
		return m('div', {
			style: {
				display: args['action'] === 'editing' ? 'none' : 'block',
				position: 'absolute',
				height: '2px',
				backgroundColor: '#5292F7',
				width: (args['dimensions'].width - pxls).toString() + 'px',
				top: args['dimensions'].height.toString() + 'px'
			}
		})
	}
}

var RightBorder:MithrilComponent = {
	view: function(ctrl:any, args?:any): MithrilVirtualElement {
		return m('div', {
			style: {
				display: args['action'] === 'editing' ? 'none' : 'block',
				position: 'absolute',
				width: '2px',
				backgroundColor: '#5292F7',
				height: (args['dimensions'].height - pxls).toString() + 'px',
				left: args['dimensions'].width.toString() + 'px'
			}
		})
	}
}

var Corner:MithrilComponent = {
	view: function(ctrl:any, args?:any): MithrilVirtualElement {
		return m('div', {
			style: {
				display: args['action'] === 'editing' ? 'none' : 'block',
				position: 'absolute',
				width: '5px',
				height: '5px',
				backgroundColor: '#5292F7',
				top:  (args['dimensions'].height - pxls/2).toString() + 'px',
				left: (args['dimensions'].width - pxls/2).toString() + 'px',
				cursor: 'crosshair'
			}
		})
	}
}

var Frame = [TopBorder, RightBorder, BottomBorder, LeftBorder, Corner];
export = Frame;