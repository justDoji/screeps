/* Module for controlling creeps ad-hoc.
Creeps that are of type 'worker' are subject to retasking per tick.
The controler will check that a certain amount of worker roles is present, and reasign creeps as needed
 */
var SWAP_THRESHOLD = 500;

var creepController = {
    reassignForRoleIfNeeded: function (role, minAmount, amountOfWorkers, workerPool) {
        let amountNeeded = Math.round((amountOfWorkers / 10) * minAmount);
        //Fix rounding issues
        if(role == 'harvester' && amountNeeded == 0) {
            amountNeeded = 1;
        }
        
        let _harvesterDelta = amountNeeded - _.filter(Game.creeps, (creep) => creep.memory.role == role).length;
        if (_harvesterDelta > 0) {
            // Repurpose other role-creeps
            let nonHarvesters = _.filter(workerPool, (creep) => creep.memory.role != role);
            var i = 0;
            for (var nonHarvesterName in nonHarvesters) {
                if(i > _harvesterDelta) {
                    break;
                }
                var creep = nonHarvesters[nonHarvesterName];
                if(creep.memory.swapTime >= SWAP_THRESHOLD) {
                    creep.memory.role = role;
                    creep.memory.swapTime = 0;
                    i++;
                }
            }
        } else if(_harvesterDelta < 0) {
                // Get rid of abundance of role-creeps
                let harvesters = _.filter(workerPool, (creep) => creep.memory.role == role);
                var i = _harvesterDelta;
                for (var harvesterName in harvesters) {
                    if(i == 0) {
                        break;
                    }
                    var creep = harvesters[harvesterName];
                    creep.memory.role = 'undefined';
                    i--;
                }
        }

        return _.filter(workerPool, (creep) => creep.memory.role != role);
    },

    run: function(distribution) {
        var workerCreeps = _.filter(Game.creeps, (creep) => creep.memory.unitType == 'worker');
        var amountOfWorkers = workerCreeps.length;
        
        if(amountOfWorkers && amountOfWorkers > 0 && distribution && distribution.length == 3) {
            let MIN_NUMBER_OF_HARVESTERS = distribution[0];
            let MIN_NUMBER_OF_UPGRADERS = distribution[1];
            let MIN_NUMBER_OF_BUILDERS = distribution[2]

            var workerPool = Game.creeps;
            workerPool = this.reassignForRoleIfNeeded('harvester', MIN_NUMBER_OF_HARVESTERS, amountOfWorkers, workerPool);
            workerPool = this.reassignForRoleIfNeeded('builder', MIN_NUMBER_OF_BUILDERS, amountOfWorkers, workerPool);
            workerPool = this.reassignForRoleIfNeeded('upgrader', MIN_NUMBER_OF_UPGRADERS, amountOfWorkers, workerPool);
            

            var _unnasignedCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'undefined');
            for(var creepName in _unnasignedCreeps) {
                var creep = _unnasignedCreeps[creepName];
                creep.memory.role = 'harvester';
            }
        }
    }
};

module.exports = creepController;