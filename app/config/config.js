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
      port: 80
    },
    db: {
      connection: ''
    }
  }
};

module.exports = function(mode) {
  return config[mode || process.argv[2] || 'dev'] || config.dev;
};
