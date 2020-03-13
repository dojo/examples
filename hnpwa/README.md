> ### Hacker News Progressive Web Application written to the specifications from [hnpwa.com](https://hnpwa.com/)

### [Demo](https://dojo-2-hnpwa-d668d.firebaseapp.com/)

This codebase was created to demonstrate an application built with Dojo.

-   **Build Time Rendering**: Uses the `.dojorc` to configure static html and critical CSS injection at build time.
-   **Progress Web Application**: Uses the `.dojorc` to configure PWA capabilities such as manifests and service workers.
-   **Evergreen builds**: Generates application bundles using esmodules targeted for evergreen browser to produce main application bundle less than 20kb gzipped.
-   **Lazy Loading (Code Splitting)**: Automatically code splits for widgets/outlets or containers that are defined in an application registry using the dynamic `import` syntax.

# Getting started

View the [Dojo HNPWA](https://dojo-2-hnpwa-d668d.firebaseapp.com/)

To get the frontend running locally:

-   Clone this repo
-   `npm install` to install all required dependencies
-   `npm run dev` to build the application with watch and start a local server ([http:localhost:9999](http:localhost:9999))

Local web server will use port 9999.

For a production build of the application:

-   `npm run build` to build the output into the `output/dist` directory.

## Licensing Information

The Dojo-specific portions of this example are © 2018 [JS Foundation](https://js.foundation/). [New BSD](http://opensource.org/licenses/BSD-3-Clause) license.
