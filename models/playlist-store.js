'use strict';
const _ = require('lodash');
const playlistStore = {

  podcastCollection: require('./playlist-store.json').podcastCollection,

  getAllPlaylists() {
    return this.podcastCollection;
  },

  getPlaylist(id) {
    return _.find(this.podcastCollection, { id: id });
  },
  
   removeEpisode(id, episodeId) {
    const playlist = this.getPlaylist(id);
    _.remove(playlist.episodes, { id: episodeId });
  },
    removePlaylist(id) {
  _.remove(this.podcastCollection, { id: id });
},
    addEpisode(id, episode) {
    const playlist = this.getPlaylist(id);
    playlist.episodes.push(episode);
  },
  addPlaylist(playlist) {
  this.playlistCollection.push(playlist);
},
};

module.exports = playlistStore;