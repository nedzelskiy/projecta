'use strict';
var config = {
  dev: {
    mode: 'development',
    server: {
      domain: 'localhost',
      port: 4124,
      defaultLanguage: 'ru',
      wayToViews: './app/assets/views',
      viewsFormat: 'ejs'
    },
    db: {
      connection: ''
    }
  },
  prod: {
    mode: 'production',
    server: {
      domain: 'localhost',
      port: process.env.PORT,
      defaultLanguage: 'ru',
      wayToViews: './app/assets/views',
      viewsFormat: 'ejs'
    },
    db: {
      connection: ''
    }
  }
};

module.exports = function(mode) {
  if (
    process.env.NODE_ENV &&
    ('production' === process.env.NODE_ENV || 'prod' === process.env.NODE_ENV)
  ) {
    return config.prod;
  }
  return config[mode || process.argv[2] || 'dev'] || config.dev;
};
