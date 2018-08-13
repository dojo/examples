import request from '@dojo/framework/core/request';
import has from '@dojo/framework/has/has';
import '@dojo/framework/shim/Promise';
import loadCldrData, { CldrData, isLoaded } from '@dojo/framework/i18n/cldr/load';

function mapHandPosition(angle: number, radius: number, innerRadius: number) {
	const { x, y } = getHandPosition(angle, radius, innerRadius);
	return { x2: String(x), y2: String(y) };
}

export function calculateAngle(angle: number) {
	return (angle - 90) * Math.PI / 180;
}

export function getHandPosition(angle: number, radius: number, innerRadius: number) {
	return {
		x: radius + innerRadius * Math.cos(angle),
		y: radius + innerRadius * Math.sin(angle)
	};
}

export function getHourPosition(date: Date, radius: number) {
	const angle = calculateAngle((date.getHours() + date.getMinutes() / 60) * 30);
	return mapHandPosition(angle, radius, radius * 0.5);
}

export function getMinutePosition(date: Date, radius: number) {
	const angle = calculateAngle((date.getMinutes() + date.getSeconds() / 60) * 6);
	return mapHandPosition(angle, radius, radius * 0.75);
}

export function getSecondPosition(date: Date, radius: number) {
	const angle = calculateAngle(date.getSeconds() * 6);
	return mapHandPosition(angle, radius, radius * 0.9);
}

export function getHours(radius: number): Array<{x: string; y: string}> {
	const hours: Array<{x: string; y: string}> = [];
	const padding = radius / 5 * 0.75;

	for (let i = 1; i <= 12; i++) {
		const angle = calculateAngle(i * 30);
		const { x, y } = getHandPosition(angle, radius, radius - padding);
		hours.push({
			x: String(x),
			y: String(y + padding / 2)
		});
	}

	return hours;
}

const getJson: (paths: string[]) => Promise<CldrData[]> = (function() {
	if (has('host-node')) {
		return function(paths: string[]): Promise<CldrData[]> {
			return Promise.resolve(paths.map((path) => require(path) as CldrData));
		};
	}

	return function(paths: string[]): Promise<CldrData[]> {
		return Promise.all(
			paths.map((path: string): Promise<CldrData> => {
				return request.get(path).then((response) => response.json() as CldrData);
			})
		);
	};
})();

/**
 * Load into Globalize.js all CLDR data for the specified locale.
 */
export async function fetchCldrData(locales: string[]): Promise<void> {
	await locales.map((locale) => {
		if (isLoaded('main', locale)) {
			return Promise.resolve();
		}

		const cldrPaths = [
			'cldr-data/main/{locale}/ca-gregorian',
			'cldr-data/main/{locale}/dateFields',
			'cldr-data/main/{locale}/numbers',
			'cldr-data/main/{locale}/timeZoneNames',
			'cldr-data/supplemental/likelySubtags',
			'cldr-data/supplemental/numberingSystems',
			'cldr-data/supplemental/ordinals',
			'cldr-data/supplemental/plurals',
			'cldr-data/supplemental/timeData',
			'cldr-data/supplemental/weekData'
		].map(path => path.replace('{locale}', locale));

		return getJson(cldrPaths).then((result: CldrData[]) => {
			return result.map((data) => loadCldrData(data));
		});
	});
}
