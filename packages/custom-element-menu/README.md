# Dojo Custom Element Menu Demo

Implementation of a basic menu widget that demonstrates using as custom elements against standard Dojo widgets.

-   [Pre-requisites](#pre-requisites)
-   [Usage](#usage)
-   [Features](#features)
-   [How do I contribute?](#how-do-i-contribute)
    -   [Installation](#installation)
    -   [Testing](#testing)
-   [Licensing information](#licensing-information)

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

```
npm run build
```

Open the `dist` directory using a local webserver.

## Features

This package demonstrates how to use Dojo widgets as a custom element.

Notice `src/widgets/createMenuElement.ts` and `src/widgets/createMenuItemElement.ts` describe the custom elements.
To build the custom elements, the `npm run build` command above first runs `dojo build` and then

```shell
dojo build --element=src/widgets/createMenuItemElement.ts
dojo build --element=src/widgets/createMenuElement.ts
```

Those CLI build commands use webpack to create bundles in the `dist` directory for each custom element.
To use those custom elements in your own HTML page, import the custom elements' HTML files:

```html
<link rel="import" href="./dist/menu/menu.html" /> <link rel="import" href="./dist/menu-item/menu-item.html" />
```

## How do I contribute?

We appreciate your interest! Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the
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

© 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
