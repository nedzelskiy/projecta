var port = process.env.PORT || 9999;

module.exports = {
    dev:{
        server:{
            domain:"localhost",
            port:port,
            defaultLanguage:"ru",
            wayToViews:"./app/assets/views",
            viewsFormat:"ejs"
        },
        db:{
            connection:""
        }
    },
    prod: {
        
    }
};
