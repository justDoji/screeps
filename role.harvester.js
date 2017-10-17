var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var name = creep.name
        if(creep.carry.energy < 50) {
            var lastNumber = name.charAt(name.length -1);

            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[lastNumber % sources.length]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[lastNumber % sources.length], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
        });

            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;