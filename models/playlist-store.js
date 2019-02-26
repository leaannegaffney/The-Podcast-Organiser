'use strict';

const playlistStore = {

  podcastCollection: require('./playlist-store.json').podcastCollection,

  getAllPlaylists() {
    return this.podcastCollection;
  },

  getPlaylist(id) {
    let foundPlaylist = null;
    for (let playlist of this.podcastCollection) {
      if (id == playlist.id) {
        foundPlaylist = playlist;
      }
    }

    return foundPlaylist;
  },
};

module.exports = playlistStore;