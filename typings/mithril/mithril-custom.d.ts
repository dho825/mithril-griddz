/**
 * changelog:
 * v0.2.0:
 *	exposes the main MithrilStatic interface that gets exported as "m" -> global d.ts defines the rest
 *  
 * 	module(rootElement: Node, module: MithrilModule): void; has been changed to mount(...)
 * 	routes(rootElement...) has been adjusted to reflect the renaming of MithrilModule
 *  added component function to MithrilStatic
 */

// Type definitions for Mithril
// Project: http://lhorie.github.io/mithril/
// Definitions by: Leo Horie <https://github.com/lhorie>, Chris Bowdon <https://github.com/cbowdon>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

//Mithril type definitions for Typescript
declare module 'mithril' {
	interface MithrilStatic {
		(selector: string, attributes: Object, children?: any): MithrilVirtualElement;
		(selector: string, children?: any): MithrilVirtualElement;
	    prop<T>(value?: T): (value?: T) => T;
	    prop<T>(promise: MithrilPromise<T>): MithrilPromiseProperty<T>;
		withAttr(property: string, callback: (value: any) => void): (e: Event) => any;
		mount(rootElement: Node, module: MithrilComponent): void;
		trust(html: string): String;
		render(rootElement: Element, children?: any): void;
		render(rootElement: HTMLDocument, children?: any): void;
		redraw: MithrilRedraw;
		route(rootElement: Element, defaultRoute: string, routes: { [key: string]: MithrilComponent }): void;
		route(rootElement: HTMLDocument, defaultRoute: string, routes: { [key: string]: MithrilComponent }): void;
		route(path: string, params?: any, shouldReplaceHistory?: boolean): void;
		route(): string;
		route(element: Element, isInitialized: boolean): void;
		request(options: MithrilXHROptions): MithrilPromise<any>;
		deferred<T>(): MithrilDeferred<T>;
		sync<T>(promises: MithrilPromise<T>[]): MithrilPromise<T>;
		startComputation(): void;
		endComputation(): void;
		component(component: Object, args?: Object, extras?: any): (component: Object, args?: Object, extras?: any) => MithrilComponent;
	}
	
	var m: MithrilStatic;
	export = m;
}
