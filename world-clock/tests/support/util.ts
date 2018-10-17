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
