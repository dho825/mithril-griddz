import m = require('mithril');

// https://gist.github.com/barneycarroll/31c1e305a37999a3473f

/** 
	below is a slightly modified function to be more modular with varying keymappings
	usage: onKey(keymap)('<key>', callback)

	var onKey = function(keymap?:keyMap){
		return function bind( key, callback ){
			if( key in keymap ){
				key = keymap[ key ];
			}
		
			return function handler(e:KeyboardEvent){
				if( e && key === e.keyCode || key === String.fromCharCode( e.keyCode ) ){
					callback.call( this, e );
				}
				else {
					m.redraw.strategy( 'none' );
				}
			};
		};
	}
**/

interface keyMap {
	key?: number
}

import keymap = require('./keymap');

var onKey = (function(keymap?:keyMap){
	return function bind( key, callback ){
		if( key in keymap ){
			key = keymap[ key ];
		}
	
		return function handler(e:KeyboardEvent){
			if( e && key === e.keyCode || key === String.fromCharCode( e.keyCode ) ){
				callback.call( this, e );
			}
			else {
				m.redraw.strategy( 'none' );
			}
		};
	};
})(keymap);

export = onKey;