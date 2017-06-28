export default function registerServiceWorker() {
	if (process.env.DOJO_SERVICE_WORKERS && 'serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			// TODO This assumes we're serving from the root. We could provide the public URL as an environment variable
			const serviceWorkerUrl = `/service-worker.js`;
			navigator.serviceWorker
				.register(serviceWorkerUrl)
				.then((registration: ServiceWorkerRegistration) => {
					registration.onupdatefound = () => {
						const installingWorker = registration.installing;
						if (installingWorker) {
							installingWorker.onstatechange = () => {
								if (installingWorker.state === 'installed') {
									if (navigator.serviceWorker.controller) {
										// At this point, the old content will have been purged and
										// the fresh content will have been added to the cache.
										// It's the perfect time to display a "New content is
										// available; please refresh." message in your web app.
										console.log('New content is available; please refresh.');
									}
									else {
										// At this point, everything has been precached.
										// It's the perfect time to display a
										// "Content is cached for offline use." message.
										console.log('Content is cached for offline use.');
									}
								}
							};
						}
					};
				})
				.catch((error) => {
					console.error('Error during service worker registration:', error);
				});
		});
	}
}

export function unregister() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then((registration: ServiceWorkerRegistration) => {
			registration.unregister();
		});
	}
}

