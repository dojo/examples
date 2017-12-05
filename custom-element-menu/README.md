# Dojo2 Custom Element Menu Demo

Implementation of a basic menu widget that demonstrates using as custom elements against standard Dojo 2 widgets.

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

To use the `custom-element-menu`, clone the `examples` repository and install the npm dependencies:

```shell
git clone https://github.com/dojo/examples
cd examples/custom-element-menu
npm install
```

To run the application simply run the dojo build.

```shell
dojo build
```

Run the dojo build commands to generate the custom elements.

```shell
dojo build --element=src/widgets/createMenuItemElement.ts 
dojo build --element=src/widgets/createMenuElement.ts
```

Open the `dist` directory using a local webserver.

## Features

This package demonstrates how to use Dojo 2 widgets as a custom element.

## How do I contribute?

We appreciate your interest!  Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines and Style Guide.

### Installation

To start working with this package, clone the repository and run `npm install`.

In order to build the project run `dojo build`.

### Testing

Test cases MUST be written using [Intern](https://theintern.github.io) using the Object test interface and Assert assertion interface.

You can test custom element menu locally using the [`@dojo/cli-test-intern`](https://github.com/dojo/cli-test-intern) command:

```shell
dojo test -a
```

## Licensing Information

© 2017 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
