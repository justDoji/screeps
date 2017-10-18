/*
Blueprint/Buildorder step for initial level
Will contain the planning logic for the initial constructions as well as the role assignment distribution of the creeps.
 */
var distribution = [4,4,2];

var buildLevelOne = {
    run: function() {
        var creep;
        for(var creepname in Game.creeps) {
            creep = Game.creeps[creepname];
            break;
        }

        if(creep) {
            var room = creep.room
            var sources = room.find(FIND_SOURCES);
            var spawns = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN);
                }
            });

            let builder = require('util.roadbuilder');

            //build a road to a energy patch
            builder.run(spawns[0].pos, sources[0].pos, room, 'road');
        }
    },

    getDistribution: function() {
        return distribution;
    }
};

module.exports = buildLevelOne;