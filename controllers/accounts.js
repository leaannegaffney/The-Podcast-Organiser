'use strict';
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const playlistStore = require('../models/playlist-store');
const commentStore = require('../models/comment-store');

const accounts = {

  index(request, response) {
    
    //total number of podcasts
    const playlists = playlistStore.getAllPlaylists();
    let totalepisodes = 0;
    let avg = 0;
    let max = 0;
    let currentcollectionlength = 0;
    let smallestpodcast = 0;
    let smallest = "";
    let largest = "";
    const users = "";
    const comments = "";
  
  if(playlists.length > 0){
    
    
    //total number of episodes
    for (let i in playlists) {
    totalepisodes = totalepisodes + playlists[i].episodes.length;
    }

    //total number of users
    users = userstore.getAllUsers();
    
    //total number of comment
    comments = commentStore.getAllComments();
    
    //average episodes per podcast per user
    avg = totalepisodes/playlists.length;
    if(avg % 1 != 0){
      avg = parseFloat(avg).toFixed(2);
    }
    
    //largest podcast
    max = 0;
    largest = "";
    for (let i in playlists) {
      if(playlists[i].episodes.length > max){
      largest = playlists[i].title;
      max = playlists[i].episodes.length;
      }
    }
    logger.debug('largest: ', largest, ', max: ', max);
  
    //smallest podcast
    currentcollectionlength = 0;
    smallestpodcast = playlists[0].episodes.length;
    smallest = playlists[0].title;
    for (let i in playlists) {
      currentcollectionlength = playlists[i].episodes.length;
      if(currentcollectionlength <= smallestpodcast){
        smallest = playlists[i].title;
        smallestpodcast = playlists[i].episodes.length;
      }
    
    }
  logger.debug('smallest title: ', smallest, ', smallest size: ', smallestpodcast);
  }
    
    const viewData = {
      title: 'Login or Signup',
      totalpodcasts: playlists.length,
      totalepisodes: totalepisodes,
      totalusers: users.length,
      totalcomments: comments.length,
      avgepisodes: avg,
      biggestpodcast: largest,
      smallestpodcast: smallest,
    };
    response.render('index', viewData);
},

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('playlist', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
  const user = userstore.getUserByEmail(request.body.email);
    if ((user)&& user.password === request.body.password){
      response.cookie('playlist', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser (request) {
    const userEmail = request.cookies.playlist;
    return userstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;