# World Clock (@dojo/i18n) Demo

A demo implementation of world clock, using features provided by [`@dojo/i18n`](https://github.com/dojo/i18n).

## Usage

To use `world-clock`, clone the `examples` repository and install the npm dependencies:

```
git clone https://github.com/dojo/examples
cd examples/world-clock
npm install
```

To run the example, simply run the dojo build.

```
dojo build
```

To watch and serve the application source, then run the build with the `-w` command.

```
dojo build -w -s
```

## What's Going On?

The world clock uses `@dojo/i18n` to translate messages, manage locale state, and format localized numbers. It also uses [`moment-timezone`](https://momentjs.com/timezone/) to ensure the clocks are displayed with the correct time (because why reinvent the [clock] wheel?).

## How do I contribute?

We appreciate your interest!  Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the Contributing Guidelines and Style Guide.

### Installation

To start working with this package, clone the repository and run `npm install`.

In order to build the project run `npm run build`.

## Licensing Information

© 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
