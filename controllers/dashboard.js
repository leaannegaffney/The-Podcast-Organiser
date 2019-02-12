'use strict';

const logger = require('../utils/logger');

const sonatas = {
  title: 'Sonatas',
  songs: [
    {
      title: 'Piano Sonata No. 3',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Sonata No. 7',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Sonata No. 10',
      artist: 'Beethoven',
    },
  ],
};

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Playlist Dashboard',
      playlist: sonatas,
    };
    logger.info('about to render', sonatas);
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
