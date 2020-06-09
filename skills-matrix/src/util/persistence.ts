export const PERSISTENCE_KEY = 'dojo-skills-matrix';

export function persistHash(value: string): void {
	window.localStorage.setItem(PERSISTENCE_KEY, value);
}

export function resumeHash(): string | undefined {
	return window.localStorage.getItem(PERSISTENCE_KEY) || undefined;
}
