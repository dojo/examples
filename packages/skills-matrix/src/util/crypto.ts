import { Level } from '../interfaces';

export async function sha1(message: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(message);
	const hash = await crypto.subtle.digest('SHA-1', data);
	return base64EncodeBuffer(hash);
}

function* levelEncoder(levels: Iterable<Level>) {
	let bits = 0;
	let count = 0;
	for (let level of levels) {
		bits = (bits << 2) + level;
		count++;
		if (count == 4) {
			yield bits;
			count = bits = 0;
		}
	}
	if (count) {
		for (; count < 4; count++) {
			bits = bits << 2;
		}
		yield bits;
	}
}

function* levelDecoder(buffer: Uint8Array) {
	for (let value of buffer) {
		for (let i = 0; i < 4; i++) {
			const shift = (3 - i) * 2;
			yield (value >> shift) & 0b11;
		}
	}
}

export function encodeLevels(levels: Iterable<Level>): ArrayBuffer {
	return new Uint8Array(levelEncoder(levels));
}

export function decodeLevels(buffer: ArrayBuffer) {
	return levelDecoder(new Uint8Array(buffer));
}

export function base64EncodeBuffer(buffer: ArrayBuffer): string {
	return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export function base64DecodeBuffer(encoded: string): ArrayBuffer {
	return new Uint8Array([...atob(encoded)].map((char) => char.charCodeAt(0)));
}
