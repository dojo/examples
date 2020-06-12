# Infinite Scrolling Demo

A demo implementation of an infinite scrolling list, using the `Intersection` meta.

## Usage

To use `intersection-observer`, clone the `examples` repository and install the npm dependencies:

```
git clone https://github.com/dojo/examples
cd examples/intersection-observer
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

The `InfiniteList` widget uses the [Intersection meta](https://github.com/dojo/widget-core#intersection) to determine when its bottom element is in the viewport. If it is, then the bottom of the list is visible and more content needs to be loaded.

## How do I contribute?

We appreciate your interest! Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the Contributing Guidelines and Style Guide.

### Installation

To start working with this package, clone the repository and run `npm install`.

In order to build the project run `npm run build`.

## Licensing Information

© 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
