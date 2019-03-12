'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const playlist = require('./controllers/playlist.js');

router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/playlist/:id', playlist.index);
router.get('/playlist/:id/deleteEpisode/:episodeid', playlist.deleteEpisode);
router.get('/deletePlayList/:id', playlist.deletePlayList);
router.post('/playlist/:id/addepisode', playlist.addEpisode);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);

module.exports = router;
