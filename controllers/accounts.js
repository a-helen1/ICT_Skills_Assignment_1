'use strict';

const userstore = require('../models/user-store');
const trainerStore = require('../models/trainer-store')
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

    index(request, response) {
        const viewData = {
            title: 'Login or Signup',
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

        if (userstore.getUserByEmail(request.body.email)) {
            const user = userstore.getUserByEmail(request.body.email);
            const password = request.body.password;
            if ((user) && (password === user.password)) {
                response.cookie('playlist', user.email);
                logger.info(`logging in ${user.email}`);
                response.redirect('/dashboard');
            } else {
                response.redirect('/login');
            }

        } else if (trainerStore.getTrainerByEmail(request.body.email)){
            const trainer = trainerStore.getTrainerByEmail(request.body.email);
            const password = request.body.password;
            if ((trainer) && (password === trainer.password)) {
                response.cookie('playlist', trainer.email);
                logger.info(`logging in ${trainer.email}`);
                response.redirect('/trainerdashboard');
            }
            else {
                response.redirect('/login');
            }

        }
        else {
            response.redirect('/login');
        }
    },

    getCurrentUser(request) {
        const userEmail = request.cookies.playlist;
        return userstore.getUserByEmail(userEmail);
    },
};

module.exports = accounts;