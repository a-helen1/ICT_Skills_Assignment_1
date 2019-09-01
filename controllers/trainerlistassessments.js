"use strict";

const _ = require('lodash');
const logger = require("../utils/logger");
const assessments = require('../models/assessment-store');
const accounts = require('./accounts');
const userstore = require('../models/user-store');
const userStats =  require('../utils/analytics');

const listUserAssessments = {
    index(request, response) {
        const userID = request.params.id;
        const user= userstore.getUserById((request.params.id));
        const bmi = userStats.calculateBmi(user,assessments.getUserAssessments(user));
        const iconColour = userStats.iconColour(user, assessments.getUserAssessments(user));
        const viewData = {
            title: user.name,
            assessments: assessments.getUserAssessments(userID),
            bmi: bmi,
            bmiCategory: userStats.bmiCategory(bmi),
            iconColour: iconColour
        };
        response.render("trainerlistassessments", viewData);
    },
}

    module.exports = listUserAssessments;