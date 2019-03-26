'use strict';

const logger = require('../utils/logger');
const playlistStore= require('../models/playlist-store');
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Playlist Dashboard',
      playlists: playlistStore.getUserPlaylists(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    logger.info('about to render', viewData.playlists);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
};

module.exports = dashboard;
