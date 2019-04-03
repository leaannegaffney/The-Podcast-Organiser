'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const commentStore = require('../models/comment-store');
const uuid = require('uuid');

const about = {
index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('about rendering');
    if (loggedInUser) {
    const viewData = {
      title: 'About The Podcast Organiser',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      comments: commentStore.getAllComments(),
    };
    response.render('about', viewData);
   }
    else response.redirect('/');
  },
  
  addComment(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      id: uuid(),
      username: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      comment: request.body.feedback,
      date: date,
    };
    logger.debug('Creating a new comment', newComment);
    commentStore.addComment(newComment);
    response.redirect('/about');
  },



};

module.exports = about;
