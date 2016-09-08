export * from './intern';

export const environments = [
	{ browserName: 'chrome', platform: 'Windows 10' }
];

/* SauceLabs supports more max concurrency */
export const maxConcurrency = 4;

export const tunnel = 'SauceLabsTunnel';
