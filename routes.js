'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const playlist = require('./controllers/playlist.js');
const accounts = require ('./controllers/accounts.js');

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/playlist/:id', playlist.index);
router.get('/playlist/:id/deleteEpisode/:episodeid', playlist.deleteEpisode);
router.post('/playlist/:id/addepisode', playlist.addEpisode);
router.post('/playlist/:id/updateepisode/:episodeid', playlist.updateEpisode);

router.get('/deletePlayList/:id', playlist.deletePlayList);
router.post('/playlist/addplaylist', playlist.addPlaylist);


router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

module.exports = router;
