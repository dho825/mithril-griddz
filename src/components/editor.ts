///<reference path="../../typings/references.d.ts" />
import m = require('mithril');

class Editor implements MithrilComponent {
//	controller:any = function(props) {
//		this.isEditing = function() {
//			var _state = props['state'], 
//				_cell = props['getCell'](_state.$cell().slice());
//			if (_cell) {
//				console.log(_cell);
//				return _cell.editing();	
//			} else { return false }
//			
//		}
//	}
	
	view(ctrl:Object, props?:Object): MithrilVirtualElement {
	
		return m('div',
			{
				style: {
					position: 'absolute',
					display: props['state'].$action() === 'editing' ? 'block' : 'none',
//					display: ctrl['isEditing']() ? 'block' : 'none',
					top: props['state'].$offset().top.toString() + 'px',
					left: props['state'].$offset().left.toString() + 'px',
				}
			}, m('textarea', {
				style: {
					height: 	(props['state'].$offset().height - 6).toString() + 'px',
					width: 		(props['state'].$offset().width - 6).toString() + 'px',
					minWidth: 	(props['state'].$offset().width - 6).toString() + 'px',
					maxWidth: 	(props['state'].$offset().width + 50).toString() + 'px',
					border: 	'2px solid #5292F7',
					overflowY: 	'hidden'
				}
			}))
	}
}

export = Editor;