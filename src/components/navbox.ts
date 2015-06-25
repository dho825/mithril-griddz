///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import Frame = require('./frame');

class Navbox implements MithrilComponent {
	view(ctrl:Object, props?:Object): MithrilVirtualElement {
		return m('div', {
			style: {
				position: 'absolute',
				top: props['state'].$offset().top.toString() + 'px',
				left: props['state'].$offset().left.toString() + 'px'	
			}
		}, Frame.map(function(border){
			return m.component(border, {
				dimensions: props['state'].$offset(), 
				action: props['state'].$action()
			})
		}))
	}
}

export = Navbox;