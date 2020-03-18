/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

importScripts(
  "precache-manifest.cf027e0399d55b43cebd49d128adb1ae.js"
);

workbox.core.setCacheNameDetails({prefix: "realworld-app"});

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/https:\/\/fonts.googleapis.com\/css/, workbox.strategies.networkFirst(), 'GET');
workbox.routing.registerRoute(/https:\/\/code.ionicframework.com\/ionicons\/2.0.1\/css\/ionicons.min.css/, workbox.strategies.networkFirst(), 'GET');
workbox.routing.registerRoute(/https:\/\/demo.productionready.io/, workbox.strategies.networkFirst(), 'GET');
workbox.routing.registerRoute(/https:\/\/conduit.productionready.io\/api/, workbox.strategies.networkFirst(), 'GET');
