const staticVendorCache = 'static-vendor-v1';

/**
 * Contains the urls that will be cached by service worker
 * @type{Array<string>}
 */
const staticVendorFiles = [
	'https://unpkg.com/quasar-extras@1.0.3/material-icons/material-icons.css',
	'https://unpkg.com/quasar-framework@%5E0.15.1/dist/umd/quasar.mat.min.css',
	'https://unpkg.com/vue@2.5.16/dist/vue.js',
	'https://unpkg.com/http-vue-loader@1.3.4/src/httpVueLoader.js',
	'https://unpkg.com/quasar-framework@%5E0.15.1/dist/umd/quasar.mat.umd.min.js',
	'https://www.gstatic.com/firebasejs/4.8.1/firebase.js',
	'https://www.gstatic.com/firebasejs/4.6.2/firebase-firestore.js',
	'https://unpkg.com/vue-firestore@0.2.7/dist/vue-firestore.js'
];

self.addEventListener('install', (/**@type{Event} */ event) => {
	console.log('[SW] Installing service worker.');
	console.log('Caching static vendor files that are unlikely to change...');

	caches.open(staticVendorCache, (/**@type{Cache} */ cache) => {
		return cache
			.addAll(staticVendorFiles)
			.then(console.log('Done caching static vendor files.'));
	});
});

self.addEventListener('activate', event => {
	console.log('[SW] Activating service worker.');
});

self.addEventListener('fetch', (/**@type{FetchEvent} */ event) => {
	// console.log(`Fetching: ${event.request.url}`);
});
