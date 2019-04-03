'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const playlistStore = require('../models/playlist-store');
const commentStore = require('../models/comment-store');

const start = {
index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('start rendering');
  
  //total number of bookmark collections and bookmarks
    const playlists = playlistStore.getUserPlaylists(loggedInUser.id);
    let totalepisodes = 0;
    for (let i in playlists) {
     totalepisodes = totalepisodes + playlists[i].episodes.length;
    }
    
    //average bookmarks per collection
    let avg = totalepisodes/playlists.length;
    if(avg % 1 != 0){
      avg = parseFloat(avg).toFixed(2);
    }
    
    //largest collection
    let max = 0;
    let largest = "";
    for (let i in playlists) {
      if(playlists[i].episodes.length > max){
        largest = playlists[i].title;
        max = playlists[i].episodes.length;
      }
    }
    logger.debug('largest: ', largest, ', max: ', max);
    
    //smallest collection
    let currentcollectionlength = 0;
    let smallestcollection = playlists[0].episodes.length;
    let smallest = playlists[0].title;
    for (let i in playlists) {
      currentcollectionlength = playlists[i].episodes.length;
      if(currentcollectionlength <= smallestcollection){
        smallest = playlists[i].title;
        smallestcollection = playlists[i].episodes.length;
      }
    }
    logger.debug('smallest title: ', smallest, ', smallest size: ', smallestcollection);
    
  
    if (loggedInUser) {
    const viewData = {
        title: 'Welcome to The Podcast Organiser',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        playlists: playlists.length,
        totalepisodes: totalepisodes,
        avgepisodes: avg,
        biggestpodcast: largest,
        smallestpodcast: smallest,
    };
    response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

module.exports = start;
