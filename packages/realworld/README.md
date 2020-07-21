# <img src="logo.png" width="48"> RealWorld Example App

> ### Dojo codebase containing real-world examples (CRUD, auth, advanced patterns, etc.) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.

### [Demo](https://dojo.github.io/examples/realworld/)

This codebase was created to demonstrate an application built with Dojo.

-   **Automatic Code Splitting**: The application is split into bundles by top level routes configured in the `src/routes.ts`.
-   **Build Time Rendering**: Configured to build the home page at build time which injects the applications HTML into the index.html.
-   **Progress Web Application**: Build configuration for PWA.
-   **State Management**: Uses `@dojo/framework/stores` for state management and managing fetching, creating, and inserting CRUD data.
-   **Routing**: Uses `@dojo/framework/routing` to provide full application routing.
-   **Lazy Loading (Code Splitting)**: Automatically code splits for widgets/outlets or containers that are defined in an application registry using the dynamic `import` syntax.
-   **Authentication**: Demonstrates handling authentication within a Dojo application.
-   **Pagination**: Includes pagination for displaying larger sets of data.

For more information on how this works with other front-ends & back-ends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repository.

# How it works

Dojo RealWorld using @dojo/widget-core, @dojo/routing and @dojo/stores.

For more information on Dojo visit [dojo.io](https://dojo.io)

# Getting started

View the [Dojo RealWorld live demo](https://dojo.github.io/examples/realworld/)

To get the frontend running locally:

-   Clone this repository
-   `npm install` to install all required dependencies
-   `npm run dev` to build the application with watch and start a local server ([http:localhost:9999](http:localhost:9999))

Local web server will use port 9999.

For a production build of the application:

-   `npm run build` to build the output into the `output/dist` directory.

To run the tests run `npm test`

## Licensing Information

The Dojo-specific portions of this example are © 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
