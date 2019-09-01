"use strict";

const logger = require("../utils/logger");
const assessments = require('../models/assessment-store');
const uuid = require('uuid');
const accounts = require('./accounts');
const userStats =  require('../utils/analytics');
const math = require('math');


const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser= accounts.getCurrentUser(request);
    const assmentArr = assessments.getUserAssessments(loggedInUser.id);
    const bmi = userStats.calculateBmi(loggedInUser,assmentArr);
    const iconColour = userStats.iconColour(loggedInUser,assmentArr);
    const viewData = {
      title: loggedInUser.name,
      assessments: assessments.getUserAssessments(loggedInUser.id),
      bmi: bmi,
      bmiCategory: userStats.bmiCategory(bmi),
      iconColour: iconColour
    };
    response.render("dashboard", viewData);
  },

  addAssessment(request,response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const time = math.round(+new Date()/1000);
    const newAssessment ={
      id: uuid(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      time: time
    };
    assessments.addAssessment(newAssessment);
    response.redirect("/dashboard");

  }
};

module.exports = dashboard;
