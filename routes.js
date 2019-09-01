"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const accounts = require('./controllers/accounts.js');
const trainerDashboard = require('./controllers/trainerDashboard');
const trainerlistassessments= require('./controllers/trainerlistassessments');

router.get("/about", about.index);
router.get('/dashboard', dashboard.index);
router.get('/trainerdashboard', trainerDashboard.index);
router.get('/trainerlistassessments/:id', trainerlistassessments.index);
router.get('/trainerdashboard/deleteuser/:id', trainerDashboard.deleteUser);

router.post("/addassessment", dashboard.addAssessment);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

module.exports = router;
