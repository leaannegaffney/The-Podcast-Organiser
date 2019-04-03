'use strict';
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const playlistStore = require('../models/playlist-store');
const commentStore = require('../models/comment-store');

const accounts = {

  index(request, response) {
    
      //total number of bookmark collections and bookmarks
    const playlists = playlistStore.getAllPlaylists();
    let totalepisodes = 0;
    for (let i in playlists) {
     totalepisodes = totalepisodes + playlists[i].episodes.length;
    }

    //total number of users
    const users = userstore.getAllUsers();
    
    //total number of comment
    const comments = commentStore.getAllComments();
    
    const viewData = {
      title: 'Login or Signup',
      totalpodcasts: playlists.length,
      totalepisodes: totalepisodes,
      totalusers: users.length,
      totalcomments: comments.length,
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