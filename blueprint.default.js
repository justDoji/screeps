var spawning = require('structs.spawningpool');
var builder = require('util.roadbuilder');
var creepAmounts = [6,3,1];

var defaultBuild = {
    run: function() {
        spawning.run(creepAmounts);
        var creep;
        for(var creepname in Game.creeps) {
            creep = Game.creeps[creepname];
            break;
        }
        if(creep) {
            var controller = creep.room.controller;
            if(controller.level < 8) {
                creep.upgradeController(controller);
            }

            var room = creep.room
            var sources = room.find(FIND_SOURCES);
            var spawns = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN);
                    }
            });

            builder.run(spawns[0].pos, sources[0].pos, room, 'road');

        }

    }
};

module.exports = defaultBuild;