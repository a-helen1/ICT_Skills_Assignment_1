'use strict';

const logger = require('../utils/logger');
const JsonStore = require('./json-store');

const assessmentStore = {
    store: new JsonStore('./models/assessment-store.json', {
        assessments: []
    }),
    collection: 'assessments',

    getUserAssessments(userid){
        return this.store.findBy(this.collection,{userid: userid});
    },

    getAllAssessments() {
        return this.store.findAll(this.collection);
    },

    getAssessment(id) {
        return this.store.findOneBy(this.collection, { id: id });
    },

    removeAssessment(id) {
        const assessment  = this.getAssessment(id);
        this.store.remove(this.collection, assessment);
        this.store.save();
    },

    removeAllUserAssessments(id) {
        const assessments = assessmentStore.getUserAssessments(id)
        for (let i=0; i< assessments.length; i++) {
            let assessmentId = assessments[i].id;
            logger.info(`${assessments.length}`);
            logger.info(`${assessmentId}`);
            this.removeAssessment(assessmentId);
            this.store.save();
        }
    },

    addAssessment(newAssessment) {
        this.store.add('assessments',newAssessment);
        this.store.save();
    },

    removeSong(id, songId) {
        const playlist = this.getPlaylist(id);
        const songs = playlist.songs;
        _.remove(songs, { id: songId});
        this.store.save();
    },
};

module.exports = assessmentStore;