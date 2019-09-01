"use strict";

const logger = require("../utils/logger");
const assessments = require('../models/assessment-store');
const uuid = require('uuid');
const accounts = require('./accounts');
const userStats =  require('../utils/analytics');
const math = require('math');
const users = require('../models/user-store')


const trainerDashboard = {
    index(request, response) {
        logger.info("dashboard rendering");
        const viewData = {
            users: users.getAllUsers()
        };
        response.render("trainerDashboard", viewData);
    },

    deleteUser(request,response,){
        const userId = request.params.id;
        users.removerUser(userId);
        response.redirect("/trainerDashboard")
    }
};

module.exports = trainerDashboard;