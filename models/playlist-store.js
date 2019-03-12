'use strict';
const _ = require('lodash');
const JsonStore = require('./json-store');
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

  addPlaylist(playlist) {
    this.store.add(this.collection, playlist);
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

};

module.exports = playlistStore;