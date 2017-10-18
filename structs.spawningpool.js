var WORKER_PROPERTIES = [WORK, CARRY, MOVE, MOVE, MOVE];

var spawning = {
    run: function() {
        var spawningPools = Game.spawns;
        for (var poolName in spawningPools) {
            var pool = spawningPools[poolName];
            if (pool.isActive && !pool.spawning) {
                spawnWorkers(pool);
            }
        }
    }
};

var spawnWorkers = function (pool) {
    //TODO: Check population limit here
    spawnWorkerDrone(pool);
};

var spawnWorkerDrone = function(pool) {
    var time = Game.time;
    var newName = 'WorkerDrone' + time;

    if(pool.spawnCreep(WORKER_PROPERTIES, newName,
        {memory: {rand: time, unitType:'worker', role: 'undefined'}}) == 0) {
        console.log('Spawning new drone: ' + newName);
    }
};

module.exports = spawning;