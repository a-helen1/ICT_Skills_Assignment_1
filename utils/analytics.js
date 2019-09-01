'use strict';

const _ = require('lodash');
const logger = require("./logger");
const assessment = require('../models/assessment-store');

const math = require('math');

 const userStats = {
     calculateBmi (user, assessments) {
         if (assessments.length !== 0) {
             const bmi = assessments[assessments.length - 1].weight / (math.pow(user.height, 2));
             logger.info(`${user.height}`);
             return bmi.toFixed(2);
         }
         else
             return 0;
     },

     bmiCategory (bmiValue) {
         let BMICategory='';
         if (bmiValue<16){
             BMICategory="SEVERELY UNDERWEIGHT";
         }
         else if ((bmiValue>=16) && (bmiValue<18.5)) {
             BMICategory = "UNDERWEIGHT";
         }
         else if ((bmiValue>=18.5) && (bmiValue<25)) {
             BMICategory = "Normal";
         }
         else if ((bmiValue>=25) && (bmiValue<30)) {
             BMICategory = "OVERWEIGHT";
         }
         else if ((bmiValue>=30) && (bmiValue<35)) {
             BMICategory = "MODERATELY OBESE";
         }
         else if (bmiValue>=35) {
             BMICategory = "SEVERELY OBESE";
         }
         return BMICategory;
     },

     isIdealBodyWeight(user, assessments){
    /* Ideal body weight is calculated as 50KG(male) or 45KG(female) + 2.3kg for every inch over 5ft.
    Inch in metric taken as 0.025m
    5ft in metric taken as 1.52m
    */

    let heightFactor;
    let additionalWeight;
    let idealWeight;
    let isIdealBodyWeight;
    let baseWeight;

    if(user.gender===1){
        baseWeight=50.0;
    }else if(user.gender===0){
        baseWeight=45.0;
    }

    if(user.height>=1.52){
        heightFactor=(user.height-1.52); //height over 5ft
    }

    additionalWeight= (heightFactor/0.025)*2.3;//multiply number of inches by 2.3
    idealWeight=baseWeight+additionalWeight;// calculate ideal weight

    if (idealWeight>assessments[assessments.length - 1].weight){
        isIdealBodyWeight=true;
        logger.info(`${assessments[assessments.length - 1].weight}`);
    }
    return isIdealBodyWeight;
    },

    iconColour(user, assessment){
    let iconColour="";

    if(assessment.length !==0) {
        const isIdealBodyWeight = userStats.isIdealBodyWeight(user,assessment);
        if (isIdealBodyWeight) {
            iconColour = "green";
        } else {
            iconColour = "red";
        }
    }
    else{
        iconColour="grey";
    }
    return iconColour;
}
};

 module.exports =  userStats;