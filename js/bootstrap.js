// Configure RequireJs
requirejs.config({
    baseUrl: "js/app",
    paths: {
        // Library paths
        domReady: "../lib/require/require-domready",
        require: "../lib/require/require",
        text: "../lib/require/require-text",
    }
});

// Require main app and run it
require(["domReady", "app"], function(domReady, app) {
    domReady(app.run);
});
