'use strict';

const logger = require('../utils/logger');
const playlistStore = require('../models/playlist-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const playlist = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const playlistId = request.params.id;
    logger.debug('Playlist id = ', playlistId);
    if (loggedInUser) {
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getPlaylist(playlistId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('playlist', viewData);
    }
    else response.redirect('/');
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
    const loggedInUser = accounts.getCurrentUser(request);
    const playlistId = request.params.id;
    const newPlayList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      host: request.body.host,
      genre: request.body.genre,
      picture: request.files.picture,
      episodes: [],
    };
    logger.debug('Creating a new Playlist', newPlayList);
    playlistStore.addPlaylist(newPlayList, function (){
    response.redirect('/dashboard');
      });
  },
  
    updateEpisode(request, response) {
    const playlistId = request.params.id;
    const episodeId = request.params.episodeid;
    logger.debug("updating episode " + episodeId);
    const alterEpisode = {
      title: request.body.title,
      duration: request.body.duration,
    };
    playlistStore.editEpisode(playlistId, episodeId, alterEpisode);
    response.redirect('/playlist/' + playlistId);
  },
};

module.exports = playlist;