# dojo-examples

[![Build Status](https://travis-ci.org/dojo/examples.svg?branch=master)](https://travis-ci.org/dojo/examples)

This repository contains example applications built using Dojo 2.

For current progress on Dojo 2, contribution guidelines and other information, please visit [`dojo/meta`](https://github.com/dojo/meta).

There are currently three examples:

- [todo-mvc](./examples/tree/master/todo-mvc) - A reference implementation of [Todo MVC](http://todomvc.com/) built in current pre-release versions of Dojo 2 packages.
- [Monster Cards](./examples/tree/master/monster-cards) - A work in progress example application showing a feature rich single page app that leverages most of the Dojo 2 functionality.
- [dojo-cli-example](./examples/tree/master/dojo-cli-example) - An example of working with Dojo cli

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
application should be available on [`http://localhost/examples/todo-mvc/_build/src/`](http://localhost/examples/todo-mvc/_build/src/) or [`http://localhost/examples/monster-cards/_build/src/`](http://localhost/examples/monster-cards/_build/src/).
