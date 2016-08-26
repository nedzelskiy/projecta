module.exports = {
    dev: {
        server: {
            domain: "localhost",
            port: process.env.PORT || 9999,
            defaultLanguage: "ru",
            wayToViews: "./app/assets/views",
            viewsFormat: "ejs"
        },
        db: {
            connection: ""
        }
    },
    prod: {
    }
};
