# dgrid-wrapper-app

This project leverages the [Dgrid wrapper](https://github.com/dojo/interop/tree/master/src/dgrid) provided by
`@dojo/interop`, along with the externals configuration support provided by [`@dojo/cli-build-app`]() and
`@dojo/cli-test-intern` (Which uses the same structure as cli-buildapp) to demonstrate dgrid running
in a modern Dojo application.

## Build

Run `dojo build --mode dist` (the `mode` option defaults to `dist`) to create a production build for the project. The built artifacts will be stored in the `output/dist` directory.

## Development Build

Run `dojo build --mode dev` to create a development build for the project. The built artifacts will be stored in the `output/dev` directory.

## Development server

Run `dojo build --mode dev --watch memory --serve` to create an in memory development build and start a development server with hot reload. By default the server runs on port `9999`, navigate to `http://localhost:9999/`.

To change the port of the development use the `--port` option.

## Running unit tests

Because of the use of externals, these tests cannot be run using JIT compilation.

To run the unit tests against built bundles, first the run a test build with dojo build --mode unit. The build test artifacts are written to the output/tests/unit directory.

Then dojo test -c local to run the projects unit tests. These tests are located in the tests/unit directory. The --watch options can be used with the test build which means that dojo test can be re-run without needing to re-build the full application each time.

## Running functional tests

To run the functional tests, first the run a test build with `dojo build --mode functional` and then `dojo test -f` to run the projects functional tests. These tests are located in the `tests/functional` directory.

## Further help

To get help for these commands and more, run `dojo` on the command line.
