/* Module for controlling creeps ad-hoc.
Creeps that are of type 'worker' are subject to retasking per tick.
The controler will check that a certain amount of worker roles is present, and reasign creeps as needed
 */
var amountOfWorkers = 0;

var creepController = {
    reassignForRoleIfNeeded: function (role, minAmount) {
        let amountNeeded = Math.round((amountOfWorkers / 10) * minAmount);
        //Fix rounding issues
        if(role == 'harvester' && amountNeeded == 0) {
            amountNeeded = 1;
        }

        let _harvesterDelta = _.filter(Game.creeps, (creep) => creep.memory.role == role).length - amountNeeded;
        if (_harvesterDelta > 0) {
            let nonHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role != role);
            for (var i = 0; i < _harvesterDelta; i++) {
                nonHarvesters.get(i).memory.role = role;
            }
        }
    },

    run: function(distribution) {
        if(buildProperties && buildProperties.length == 3) {
            MIN_NUMBER_OF_HARVESTERS = distribution[0];
            MIN_NUMBER_OF_UPGRADERS = distribution[1];
            MIN_NUMBER_OF_BUILDERS = distribution[2]

            var workerCreeps = _.filter(Game.creeps, (creep) => creep.memory.unitType == 'worker');
            amountOfWorkers = workerCreeps.length;

            this.reassignForRoleIfNeeded('harvester', MIN_NUMBER_OF_HARVESTERS);
            this.reassignForRoleIfNeeded('upgrader', MIN_NUMBER_OF_UPGRADERS);
            this.reassignForRoleIfNeeded('builder', MIN_NUMBER_OF_BUILDERS);

            let _unnasignedCreeps = _.filter(Game.creeps, (creep) => !creep.memory.role);
            for(var creep in _unnasignedCreeps) {
                creep.memory.role = 'harvester';
            }
        }
    }
};

module.exports = creepController;