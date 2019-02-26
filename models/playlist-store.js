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
  removeEpisode(id, episodeId) {
    const playlist = this.getPlaylist(id);
  },
};

module.exports = playlistStore;