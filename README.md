# @dojo/examples

[![Build Status](https://travis-ci.org/dojo/examples.svg?branch=master)](https://travis-ci.org/dojo/examples)

This repository contains example applications built using Dojo.

For current progress on Dojo, contribution guidelines and other information, please visit [`dojo/meta`](https://github.com/dojo/meta).

-   [Examples](#examples)
-   [How do I contribute?](#how-do-i-contribute)
    -   [Adding an Example](#adding-an-example)
    -   [Installation & Testing](#installation--testing)
    -   [Building all Examples](#building-all-examples)
-   [Licensing information](#licensing-information)

## Examples

Here is a table of the current examples available in this repository complete with code and a hosted demonstration:

| Example                 | Code                                       | Demo                                                     | Sandbox                                                                                          | Overview                                                                                                                                                                                    |
| ----------------------- | ------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TodoMVC                 | [Link](./packages/todo-mvc)                | [Link](https://examples.dojo.io/todo-mvc)                | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/todo-mvc)              | Reference implementation of [TodoMVC](http://todomvc.com/) built using Dojo packages.                                                                                                       |
| TodoMVC (kitchen sink)  | [Link](./packages/todo-mvc-kitchensink)    | [Link](https://examples.dojo.io/todo-mvc-kitchensink)    | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/todo-mvc-kitchensink)  | Feature-enhanced version of TodoMVC built using Dojo packages.                                                                                                                              |
| iCache Basic            | [Link](./packages/icache-basic)            | [Link](https://examples.dojo.io/icache-basic)            | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/icache-basic)          | Basic example of icache middleware usage                                                                                                                                                    |
| iCache Advanced         | [Link](./packages/icache-advanced)         | [Link](https://examples.dojo.io/icache-advanced)         | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/icache-advanced)       | Example of getOrSet icache API and typed icache                                                                                                                                             |
| Resize Middleware       | [Link](./packages/resize-middleware)       | [Link](https://examples.dojo.io/resize-middleware)       | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/resize-middleware)     | Demonstrates working with an element that changes dimensions                                                                                                                                |
| HNPWA                   | [Link](./packages/hnpwa)                   | [Link](https://examples.dojo.io/hnpwa)                   | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/hnpwa)                 | Reference implementation of [HNPWA](https://hnpwa.com/) built using Dojo packages.                                                                                                          |
| Widget Showcase         | [Link](./packages/widget-showcase)         | [Link](https://examples.dojo.io/widget-showcase)         | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/widget-showcase)       | Showcase of widgets from [@dojo/widgets](https://github.com/dojo/widgets).                                                                                                                  |
| Custom Element Showcase | [Link](./packages/custom-element-showcase) | [Link](https://examples.dojo.io/custom-element-showcase) |                                                                                                  | Showcase of widgets from [@dojo/widgets](https://github.com/dojo/widgets) compiled as [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements). |
| Custom Element Menu     | [Link](./packages/custom-element-menu)     | [Link](https://examples.dojo.io/custom-element-menu)     |                                                                                                  | Demonstration of a menu widget compiled as a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).                                           |
| Real-world Application  | [Link](./packages/realworld)               | [Link](https://examples.dojo.io/realworld)               | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/realworld)             | A real-world implementation of an existing site using Dojo packages: conduit.                                                                                                               |
| Intersection Observer   | [Link](./packages/intersection-observer)   | [Link](https://examples.dojo.io/intersection-observer/)  | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/intersection-observer) | Demonstration of the [`Intersection`](https://github.com/dojo/widget-core#intersection) meta and how it can be used to create an infinite scrolling list.                                   |
| Resize Observer         | [Link](./packages/resize-observer)         | [Link](https://examples.dojo.io/resize-observer/)        |                                                                                                  | Demonstration of the [`Resize`](https://github.com/dojo/widget-core#resize) meta and how it can be used to create responsive components.                                                    |
| Dgrid Wrapper           | [Link](./packages/dgrid-wrapper)           | [Link](https://examples.dojo.io/dgrid-wrapper)           |                                                                                                  | Demonstration of the [`Dgrid Wrapper`](https://github.com/dojo/interop/tree/master/packages/src/dgrid) for running [dgrid](http://dgrid.io) in a reactive way in a modern Dojo application. |
| World Clock             | [Link](./packages/world-clock)             | [Link](https://examples.dojo.io/world-clock)             |                                                                                                  | Demonstration of i18n in an application built using Dojo packages.                                                                                                                          |
| Static Blog             | [Link](./packages/static-blog)             | [Link](https://examples.dojo.io/static-blog)             | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/static-blog)           | Template for creating a blog using dojo with build time rendering and blocks                                                                                                                |
| Store Arrays            | [Link](./packages/store-arrays)            | [Link](https://examples.dojo.io/store-arrays)            | [Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/store-arrays)          | Demonstrates working with arrays in @dojo/stores                                                                                                                                            |

## How Do I Contribute?

We appreciate your interest!

### Adding an Example

To add an example to the project, create the example in the `packages` directory. In order to build and deploy the application there are a few required.

#### Npm Scripts

There are two required npm scripts:

##### build:deploy

The `build:deploy` script needs to install node modules at the beginning and remove them at the end after successfully building the example. E.g.

```
"build:deploy": "npm install && dojo build --dojorc .dojorc-deploy && shx rm -rf node_modules",
```

#### package

The `package` script needs move the built output into the correct directory in the main output/dist directory. E.g.

```
"package": "shx cp -r output/dist/ ../../output/dist/hnpwa/",
```

#### `.dojorc-deploy` file

A `.dojorc-deploy` file that extends the base `.dojorc` but specifies a base of the examples directory name. E.g.

```json
{
	"extends": ".dojorc",
	"build-app": {
		"base": "/hnpwa/"
	}
}
```

### Installation & Testing

Refer to each `README.md` for details on installing and testing the examples:

-   [todo-mvc](./pacakges/todo-mvc/README.md)
-   [todo-mvc-kitchensink](./pacakges/todo-mvc-kitchensink/README.md)
-   [hnpwa](./pacakges/hnpwa/README.md)
-   [custom-element-menu](./pacakges/custom-element-menu/README.md)
-   [widget-showcase](./pacakges/widget-showcase/README.md)
-   [custom-element-showcase](./pacakges/custom-element-showcase/README.md)
-   [dojo-cli-example](./pacakges/dojo-cli-example/README.md)
-   [Conduit RealWorld Application](./pacakges/realworld/README.md)
-   [intersection-observer](./pacakges/intersection-observer/README.md)
-   [resize-observer](./pacakges/resize-observer/README.md)
-   [dgrid-wrapper](./pacakges/dgrid-wrapper/README.md)
-   [world-clock](./pacakges/world-clock/README.md)

### Building all Examples

From the root directory, run `npm install` and then `npm run build`. The built examples are output into the `output/dist` directory at the of the product.

## Licensing Information

© 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.

[Link](https://codesandbox.io/s/github/dojo/examples/tree/master/packages/todo-mvc) |
