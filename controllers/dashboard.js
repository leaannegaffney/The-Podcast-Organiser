'use strict';

const logger = require('../utils/logger');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Playlist Dashboard',
    };
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
