var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
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

module.exports = roleBuilder;