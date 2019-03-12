'use strict';

const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store');
const uuid = require('uuid');

const playlist = {
  index(request, response) {
    const playlistId = request.params.id;
    logger.debug('Playlist id = ', playlistId);
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getPlaylist(playlistId),
    };
    response.render('playlist', viewData);
  },
    deleteEpisode(request, response) {
    const playlistId = request.params.id;
    const episodeId = request.params.episodeid;
    logger.debug(`Deleting Episode ${episodeId} from Playlist ${playlistId}`);
    playlistStore.removeEpisode(playlistId, episodeId);
    response.redirect('/playlist/' + playlistId);
  },
  deletePlayList(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },
    addEpisode(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newEpisode = {
      id: uuid(),
      title: request.body.title,
      duration: request.body.duration,
    };
    playlistStore.addEpisode(playlistId, newEpisode);
    response.redirect('/playlist/' + playlistId);
  },
    addPlaylist(request, response) {
    const newPlayList = {
      id: uuid(),
      title: request.body.title,
      duration: request.body.duration,
      host:request.body
      genre:
      episodes: [],
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/dashboard');
  },
};

module.exports = playlist;