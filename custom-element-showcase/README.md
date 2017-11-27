# Dojo2 Custom Element Showcase

Demo page showing the usage of Dojo 2 widgets exported as custom elements

- [Pre-requisites](#pre-requisites)
- [Usage](#usage)
- [Features](#features)
- [How do I contribute?](#how-do-i-contribute)
  - [Installation](#installation)
  - [Testing](#testing)
- [Licensing information](#licensing-information)

## Pre-requisites

`@dojo/cli` must be installed globally:

```shell
npm install @dojo/cli -g
```

## Usage

To view the `custom-element-showcase`, clone the `examples` repository and install the npm dependencies:

```shell
git clone https://github.com/dojo/examples
cd examples/custom-element-showcase
npm install
```

To run the application simply run the build command. This delegates to `dojo build` to build each of the custom elements and the application itself.

```
npm run build
```

Open the `dist` directory using a local webserver.

## Features

This package demonstrates how to use Dojo 2 widgets as custom elements.

## How do I contribute?

We appreciate your interest!  Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines and Style Guide.

### Installation

To start working with this package, clone the repository and run `npm install`.

In order to build the project run `npm run build`.

### Testing

Test cases MUST be written using [Intern](https://theintern.github.io) using the BDD test interface and Assert assertion interface.

You can test the custom element showcase locally using the [`@dojo/cli-test-intern`](https://github.com/dojo/cli-test-intern) command:

```shell
dojo test -a
```

## Licensing Information

© 2017 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
