/*
Blueprint/Buildorder step for initial level
Will contain the planning logic for the initial constructions as well as the role assignment distribution of the creeps.
 */
var distribution = [4,4,2];

var buildLevelOne = {
    run: function() {

    },

    getDistribution: function() {
        return distribution;
    }
};

module.exports = buildLevelOne;