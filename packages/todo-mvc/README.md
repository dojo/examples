# Dojo TodoMVC

A reference implementation of [TodoMVC](http://todomvc.com/) using the current beta1 versions of Dojo packages.

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

To use `todo-mvc`, clone the `examples` repository and install the npm dependencies:

```shell
git clone https://github.com/dojo/examples
cd examples/todo-mvc
npm install
```

To run the application simply run the dojo build.

```
dojo build app
```

To watch and serve the application source, then run the build with the `-w` command.

```
dojo build app -w -s
```

## Features

This package demonstrates how to build a simple application using Dojo widgets.

It is an example of:

-   Custom widgets using `@dojo/widget-core`
-   Applying CSS to widgets
-   Using `@dojo/router`

## How do I contribute?

We appreciate your interest! Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines and Style Guide.

### Installation

To start working with this package, clone the repository and run `npm install`.

In order to build the project run `dojo build`.

### Testing

Test cases MUST be written using [Intern](https://theintern.github.io) using the Object test interface and Assert assertion interface.

You can test TodoMVC locally using the [`@dojo/cli-test-intern`](https://github.com/dojo/cli-test-intern) command:

```shell
dojo test -a
```

## Licensing Information

© 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
