var presteps = require('utils.preSteps');

var MIN_NUMBER_OF_HARVESTERS = 4;
var MIN_NUMBER_OF_UPGRADERS = 4;
var MIN_NUMBER_OF_BUILDERS = 2;
var WORKER_PROPERTIES = [WORK, CARRY, MOVE, MOVE, MOVE];

var spawning = {
    run: function(buildProperties) {
        presteps.run();
        if(buildProperties && buildProperties.length == 3) {
            MIN_NUMBER_OF_HARVESTERS = buildProperties[0];
            MIN_NUMBER_OF_UPGRADERS = buildProperties[1];
            MIN_NUMBER_OF_BUILDERS = buildProperties[2]
        }


        var spawningPools = Game.spawns;
        for (var poolName in spawningPools) {
            var pool = spawningPools[poolName];
            if (pool.isActive && !pool.spawning) {
                spawnDudes(pool);
            }
        }
    }
};

var spawnDudes = function (pool) {
    var harvesterMap = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraderMap = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builderMap = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if (harvesterMap.length < MIN_NUMBER_OF_HARVESTERS) {
        spawnDrone(pool, 'harvester');
    } else if (upgraderMap.length < MIN_NUMBER_OF_UPGRADERS) {
        spawnDrone(pool, 'upgrader');
    } else if (builderMap.length < MIN_NUMBER_OF_BUILDERS) {
        spawnDrone(pool, 'builder');
    }
};

var spawnDrone = function(pool, role) {
    var time = Game.time;
    var newName = role + '-Drone' + time;

    if(pool.spawnCreep(WORKER_PROPERTIES, newName,
        {memory: {role: role, rand: time, type:'worker'}}) == 0) {
        console.log('Spawning new drone: ' + newName + ' [' + role + ']');
    }
};

module.exports = spawning;