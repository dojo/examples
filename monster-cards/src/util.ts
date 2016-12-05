export function formatClasses(classNames: string): {[key: string]: boolean} {
	const classes = classNames.split(' ').reduce((obj: {[key: string]: boolean}, className: string) => {
		obj[className] = true;
		return obj;
	}, {});
	return classes;
};
