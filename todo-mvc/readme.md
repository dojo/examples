# Dojo2 TodoMVC Example

> Dojo2 TodoMVC example.

> Current progress of Dojo2 is available from the _[Meta](https://github.com/dojo/meta)_ repository.

## Pre-requisites

You need to be running node `v6+` and npm `v3+`.

package `typings` and `dojo-cli` installed globally.

```shell
npm install typings -g
npm install dojo-cli -g
```

## Running

Install the required dependencies and typings

```
cd /path/to/todomvc
npm install
typings install
```

To run the application simply install the dependencies and run the dojo build.

```
dojo build
```

To watch and serve the application source, then run the build with the `-w` command.

```
dojo build -w
```

## Testing

You can test TodoMVC locally. First make sure you have a WebDriver client running, e.g. install [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/home). Start it like this:

```shell
grunt dev
```

```shell
chromedriver --port=4444 --url-base=wd/hub
```

Then run the tests:

```shell
grunt test:local
```
