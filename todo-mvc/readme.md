# Dojo2 TodoMVC Example

> Dojo2 TodoMVC example.

> Current progress of Dojo2 is available from the _[Meta](https://github.com/dojo/meta)_ repository.

## Pre-requisites

You need to be running node `v6+` and npm `v3+`.

## Running

To run the app, run the following commands and spin up an HTTP server (e.g. python -m SimpleHTTPServer) and visit http://localhost/.../build/src/.

```
cd /path/to/todomvc
npm install
grunt dev
```

## Testing

You can test TodoMVC locally. First make sure you have a WebDriver client running, e.g. install [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/home). Start it like this:

```shell
chromedriver --port=4444 --url-base=wd/hub
```

Then run the tests:

```shell
grunt test:local
```
