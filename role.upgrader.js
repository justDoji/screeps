var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var name = creep.name;
            let enemyNearbyChecker = require('utils.enemyNearbyChecker');
            var sources = creep.room.find(FIND_SOURCES, { filter: (source) => { return !enemyNearbyChecker.run(source.pos)}});
            var lastNumber = name.charAt(name.length -1);
            if(creep.harvest(sources[lastNumber % sources.length]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[lastNumber % sources.length], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;