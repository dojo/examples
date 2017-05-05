# dojo-examples

[![Build Status](https://travis-ci.org/dojo/examples.svg?branch=master)](https://travis-ci.org/dojo/examples)

This repository contains example applications built using Dojo 2.

For current progress on Dojo 2, contribution guidelines and other information, please visit [`dojo/meta`](https://github.com/dojo/meta).

- [Usage](#usage)
  - [Deploying to gh-pages](#deploying-to-gh-pages)
- [Features](#features)
- [How do I contribute?](#how-do-i-contribute)
  - [Installation](#installation)
  - [Testing](#testing)
- [Licensing information](#licensing-information)

## Usage

Currently, the examples assume you have a version of NodeJS 6 or later installed globally and available on the command line.  Also, if you wish to see some of the examples, you will need a local web server installed.

First, clone the repository locally:

```sh
> git clone https://github.com/dojo/examples.git
```

Then change directory to the example you wish to work with and use npm to install the dependencies:

```sh
> cd todo-mvc
> npm install
```

If you don't have Grunt installed globally, you will need to do so:

```sh
> npm install -g grunt
```

To build a version of a web application you can access, the *default* task for Grunt will do so:

```sh
> grunt
```

Assuming that the root of this repository is available on your local web server under `/examples` then the
application should be available on [`http://localhost/examples/todo-mvc/_build/src/`](http://localhost/examples/todo-mvc/_build/src/) or [`http://localhost/examples/todo-mvc-kitchensink/_build/src/`](http://localhost/examples/todo-mvc-kitchensink/_build/src/)


### Deploying to gh-pages

Assuming that you are working on a clone of the repository on the branch that you would like to deploy (typically `master`)

This assumes that npm & typings & dojo-cli have been installed for the example applications.

```shell
./scripts/gh-pages-publish.sh
```

The latest version(s) will now be available [on github pages](https://dojo.github.io/examples).

## Features

There are currently three examples:

- [todo-mvc](./todo-mvc) - A reference implementation of [TodoMVC](http://todomvc.com/) built with current beta1 versions of Dojo 2 packages.
- [todo-mvc-kitchensink](./todo-mvc-kitchensink) - A feature-rich version of TodoMVC, built with current beta1 versions of Dojo 2 packages.
- [todo-mvc-tsx](./todo-mvc-tsx) - A reference implementation of [TodoMVC](http://todomvc.com/) built using `tsx` with current beta1 versions of Dojo 2 packages.
- [dojo-cli-example](./dojo-cli-example) - An example of working with `@dojo/cli`. 

Application examples that are deployed to [gh-pages](https://dojo.github.io/examples):

 - [todoMVC](https://dojo.github.io/examples/todo-mvc)
 - [todoMVC Kitchen Sink](https://dojo.github.io/examples/todo-mvc-kitchensink)
 - [todoMVC - tsx](https://dojo.github.io/examples/todo-mvc-tsx)

## How Do I Contribute?

We appreciate your interest!  Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines and Style Guide.

### Installation

Refer to each `README.md` for details on installing the example.

* [todo-mvc](./todo-mvc/README.md)
* [todo-mvc-kitchensink](./todo-mvc-kitchensink/README.md)
* [dojo-cli-example](./dojo-cli-example/README.md)

### Testing

Refer to each `README.md` for details on testing the example.

* [todo-mvc](./todo-mvc/README.md)
* [todo-mvc-kitchensink](./todo-mvc-kitchensink/README.md)
* [dojo-cli-example](./dojo-cli-example/README.md)

## Licensing Information

© 2017 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
