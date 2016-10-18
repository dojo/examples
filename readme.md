# dojo-examples

[![Build Status](https://travis-ci.org/dojo/examples.svg?branch=master)](https://travis-ci.org/dojo/examples)

This repository contains example applications built using Dojo 2.

For current progress on Dojo 2, contribution guidelines and other information, please visit [`dojo/meta`](https://github.com/dojo/meta).

There are currently three examples:

- [todo-mvc](./examples/tree/master/todo-mvc) - A reference implementation of [Todo MVC](http://todomvc.com/) built in current pre-release versions of Dojo 2 packages.
- [Monster Cards](./examples/tree/master/monster-cards) - A work in progress example application showing a feature rich single page app that leverages most of the Dojo 2 functionality.
- [dojo-cli-example](./examples/tree/master/dojo-cli-example) - An example of working with Dojo cli

Application examples that are deployed to gh-pages:

 - [todoMVC](https://dojo.github.io/examples/todo-mvc)
 - [Monster Cards](https://dojo.github.io/examples/monster-cards)

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

### Manually Deploying to gh-pages

Assuming that you are working on a clone of the repository on the branch that you would like to deploy (typically `master`)

This assumes that npm & typings have been installed for todo-mvc.

```shell
git checkout -B gh-pages
cd todo-mvc && dojo build webpack && cd ..
git add -f todo-mvc/dist
git commit -am "Rebuild website"
git filter-branch -f --tree-filter "mkdir samples && test -d todo-mvc/dist && mv todo-mvc/dist samples/todo-mvc || echo 'nothing to do'" HEAD
git filter-branch -f --prune-empty --subdirectory-filter samples
git push -f origin gh-pages
git checkout -
```

The latest version(s) will now be available [here](https://dojo.github.io/examples).