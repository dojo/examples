# Resize Observer Demo

A demo implementation of responsive components that dynamically adjust
their presentation based on the space currently available to them.

## Usage

To see the demo, clone the `examples` repository and install the npm dependencies:

```
git clone https://github.com/dojo/examples
cd examples/resize-observer
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

The `App`, `Card`, `Calendar`, `Article`, and `Column` widgets
use the [Resize meta](https://github.com/dojo/widget-core#resize) to
check the amount of horizontal space they have to render in. Based on
this space they use a combination of programmatic logic and custom
styles to adjust their rendering to be optimal for the space available.

The components can be dynamically resized using the buttons in each
container, and the app itself will adjust the number and minimum size
of the components displayed as the overall space available decreases.

## How do I contribute?

We appreciate your interest! Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the Contributing Guidelines and Style Guide.

### Installation

To start working with this package, clone the repository and run `npm install`.

In order to build the project run `npm run build`.

## Licensing Information

© 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
