'use strict';

const logger = require('../utils/logger');
const podcastCollection = require('../models/playlist-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Playlist Dashboard',
      playlists: podcastCollection,
    };
    logger.info('about to render', podcastCollection);
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
