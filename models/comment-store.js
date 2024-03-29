'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');

const commentStore = {

  store: new JsonStore('./models/comment-store.json', { comments: [] }),
  collection: 'comments',

  getAllComments() {
    return this.store.findAll(this.collection);
  },

  addComment(comment) {
    this.store.add(this.collection, comment);
  },
  
};

module.exports = commentStore;