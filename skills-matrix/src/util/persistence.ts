const PERSISTENCE_KEY = 'dojo-skills-matrix';
const PERSISTENCE_COMPARE_KEY = `${PERSISTENCE_KEY}-compare`;

export function persistComparison(value: string): void {
	window.localStorage.setItem(PERSISTENCE_COMPARE_KEY, value);

}
export function persistHash(value: string): void {
	window.localStorage.setItem(PERSISTENCE_KEY, value);
}

export function resumeComparison(): string | undefined {
	return window.localStorage.getItem(PERSISTENCE_COMPARE_KEY) || undefined;
}

export function resumeHash(): string | undefined {
	return window.localStorage.getItem(PERSISTENCE_KEY) || undefined;
}
