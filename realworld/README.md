# <img src="logo.png" width="48"> RealWorld Example App

> ### Dojo 2 codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://dojo.github.io/examples/realworld/)


This codebase was created to demonstrate an application built with Dojo 2.

 * **Build Time Rendering**: Configured to build the home page at build time which injects the applications HTML into the index.html.
 * **Authentication**: Demonstrates handling authentication within a Dojo 2 application.
 * **State Management**: Uses `@dojo/stores` for state management and managing fetching, createing and inserting CRUD data.
 * **Routing**: Uses `@dojo/routing` to provide full application routing.
 * **Lazy Loading (Code Splitting)**: Automatically code splits for widgets/outlets or containers for components defined in an application registry using the dynamic `import` syntax.
 * **Pagination**: Includes pagination for displaying larger sets of data.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

Dojo 2 RealWorld using @dojo/widget-core, @dojo/routing and @dojo/stores.

For more information on Dojo 2 visit [dojo.io](https://dojo.io)

# Getting started

View the [Dojo 2 RealWorld live demo](https://dojo.github.io/examples/realworld/)

To get the frontend running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` to build the application with watch and start a local server ([http:localhost:9999](http:localhost:9999))

Local web server will use port 9999.

For a production build of the application:

- `npm run build` to build the output into the `output/dist` directory.

To run the tests run `npm test`

## Licensing Information

The Dojo-specific portions of this example are © 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
