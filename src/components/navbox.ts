///<reference path="../../typings/references.d.ts" />
import m = require('mithril');
import Frame = require('./frame');

class Navbox implements MithrilComponent {
	view(ctrl:Object, props?:Object): MithrilVirtualElement {
		return m('div', {
			style: {
				position: 'absolute',
				width: props['state'].$offset().width.toString() + 'px',
				height: props['state'].$offset().height.toString() + 'px',
				top: props['state'].$offset().top.toString() + 'px',
				left: props['state'].$offset().left.toString() + 'px'}, 
			ondblclick: function(e) {
				props['state'].$action() === 'editing' ? props['state'].$action('') : props['state'].$action('editing');
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