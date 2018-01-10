# @dojo/examples

[![Build Status](https://travis-ci.org/dojo/examples.svg?branch=master)](https://travis-ci.org/dojo/examples)

This repository contains example applications built using Dojo 2.

For current progress on Dojo 2, contribution guidelines and other information, please visit [`dojo/meta`](https://github.com/dojo/meta).

- [Deploying to gh-pages](#deploying-to-gh-pages)
- [Features](#features)
- [How do I contribute?](#how-do-i-contribute)
  - [Installation](#installation)
  - [Testing](#testing)
- [Licensing information](#licensing-information)

## Deploying to gh-pages

Assuming that you are working on a clone of the repository on the branch that you would like to deploy (typically `master`)

This assumes that npm & typings & dojo-cli have been installed for the example applications.

```shell
./scripts/gh-pages-publish.sh
```

The latest version(s) will now be available [on github pages](https://dojo.github.io/examples).

## Features

There are currently seven examples:

- [todo-mvc](./todo-mvc) - A reference implementation of [TodoMVC](http://todomvc.com/) built with current Dojo 2 packages.
- [todo-mvc-kitchensink](./todo-mvc-kitchensink) - A feature-rich version of TodoMVC, built Dojo 2 packages.
- [todo-mvc-tsx](./todo-mvc-tsx) - A reference implementation of [TodoMVC](http://todomvc.com/) built using `tsx`, [Redux](https://github.com/reactjs/redux)  and Dojo 2 packages.
- [widget-showcase](./widget-showcase/README.md) - Show case widgets from [@dojo/widgets](https://github.com/dojo/widgets).
- [custom-element-menu](./custom-element-menu/README.md) - Demonstrates custom element usage against standard Dojo 2 widget usage.
- [dojo-cli-example](./dojo-cli-example) - An example of working with `@dojo/cli`.
- [custom-element-showcase](./custom-element-showcase/README.md) - Demonstrates custom element usage of Dojo 2 widgets.

Application examples that are deployed to [gh-pages](https://dojo.github.io/examples):

 - [todoMVC](https://dojo.github.io/examples/todo-mvc)
 - [todoMVC Kitchen Sink](https://dojo.github.io/examples/todo-mvc-kitchensink)
 - [todoMVC - tsx](https://dojo.github.io/examples/todo-mvc-tsx)
 - [Widget Showcase](https://dojo.github.io/examples/widget-showcase)
 - [Custom Element Menu](https://dojo.github.io/examples/custom-element-menu)
 - [Custom Element Showcase](https://dojo.github.io/examples/custom-element-showcase)

## How Do I Contribute?

We appreciate your interest!  Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines and Style Guide.

### Installation & Testing

Refer to each `README.md` for details on installing and testing the examples.

* [todo-mvc](./todo-mvc/README.md)
* [todo-mvc-kitchensink](./todo-mvc-kitchensink/README.md)
* [todo-mvc-tsx](./todo-mvc-tsx/README.md)
* [custom-element-menu](./custom-element-menu/README.md)
* [widget-showcase](./widget-showcase/README.md)
* [dojo-cli-example](./dojo-cli-example/README.md)
* [custom-element-showcase](./custom-element-showcase/README.md)

## Licensing Information

© 2017 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
