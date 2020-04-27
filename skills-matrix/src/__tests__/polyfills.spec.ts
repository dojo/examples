if (require && global) {
	type ModifiableWindow = { -readonly [K in keyof Window]: Window[K] } & typeof globalThis;
	const g: ModifiableWindow = global as any;
	const w: ModifiableWindow = window;

	if (!g.btoa) {
		g.btoa = w.btoa = require('btoa');
	}
	if (!g.atob) {
		g.atob = w.atob = require('atob');
	}
	if (!g.TextEncoder) {
		g.TextEncoder = w.TextEncoder = require('util').TextEncoder;
	}
	if (!g.crypto) {
		g.crypto = w.crypto = new (require('node-webcrypto-ossl').Crypto)();
	}
}
