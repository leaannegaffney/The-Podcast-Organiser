'use strict';
const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');
const path = require('path');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const playlistStore = {
  
  store: new JsonStore('./models/playlist-store.json', { podcastCollection: [] }),
  collection: 'podcastCollection',

  podcastCollection: require('./playlist-store.json').podcastCollection,
  
  getAllPlaylists() {
    return this.store.findAll(this.collection);
  },

  getPlaylist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addPlaylist(playlist, response) {
    playlist.picture.mv('tempimage', err => {
      if (!err) {
        cloudinary.uploader.upload('tempimage', result => {
          console.log(result);
          playlist.picture = result.url;
          response();
        });
      }
    });
  },


  removePlaylist(id) {
    const playlist = this.getPlaylist(id);
    this.store.remove(this.collection, playlist);
  },

  removeAllPlaylists() {
    this.store.removeAll(this.collection);
  },

  addEpisode(id, episode) {
    const playlist = this.getPlaylist(id);
    playlist.episodes.push(episode);
  },

  removeEpisode(id, episodeId) {
    const playlist = this.getPlaylist(id);
    const episodes = playlist.episodes;
    _.remove(playlist.episodes, { id: episodeId});
  },
  
    editEpisode(id, episodeId, episodeDetails) {
    const playlist = this.getPlaylist(id);
    const episodes = playlist.episodes;
    const thepos = episodes.findIndex(field=> field.id === episodeId);
    episodes[thepos].title=episodeDetails.title;
    episodes[thepos].duration=episodeDetails.duration;
  },
  
   getUserPlaylists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

};

module.exports = playlistStore;