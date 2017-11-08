# dojo-cli-example

An example of working with `@dojo/cli`.

- [Usage](#usage)
- [Features](#features)
- [How do I contribute?](#how-do-i-contribute)
  - [Installation](#installation)
  - [Testing](#testing)
- [Licensing information](#licensing-information)

## Usage

To use `dojo-cli-example`, clone the `examples` repository and install the npm dependencies:

```shell
git clone https://github.com/dojo/examples
cd examples/dojo-cli-example
npm install
```

To build the command, use:

```shell
grunt dev
```

To package the command for testing locally, use:

```shell
grunt dist
grunt link
```

To run the command, go to a test project directory and use:
```shell
npm link dojo-cli-example-command
dojo example
dojo example -s
```

## Features

This project serves as an example on creating a custom command to use with `@dojo/cli`. The example shows:

* Registering your command with `@dojo/cli`
* Accepting arguments
* Performing a simple task when the command is run

## How do I contribute?

We appreciate your interest!  Please see the [Dojo Meta Repository](https://github.com/dojo/meta#readme) for the
Contributing Guidelines and Style Guide.

### Installation

To start working with this package, clone the repository and run `npm install`.

In order to build the project run `grunt dev` or `grunt dist`.

### Testing

Test cases MUST be written using [Intern](https://theintern.github.io) using the Object test interface and Assert assertion interface.

90% branch coverage MUST be provided for all code submitted to this repository, as reported by istanbul’s combined coverage results for all supported platforms.

To test locally in node run:

`grunt test`

To test against browsers with a local selenium server run:

`grunt test:local`

To test against BrowserStack or Sauce Labs run:

`grunt test:browserstack`

or

`grunt test:saucelabs`

## Licensing Information
© 2017 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
