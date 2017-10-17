var spawning = require('structs.spawningpool');
var towerRange = 7;
var creepAmounts = [4,10,4];

var towerrush = {
    run: function() {
        spawning.run(creepAmounts);
        var creep;
        for(var creepname in Game.creeps) {
            creep = Game.creeps[creepname];
            break;
        }
        if(creep) {
            var room = creep.room
            if(room.find(FIND_MY_CONSTRUCTION_SITES).length < 2) {
                    console.log('TOWERRUSHING!');
                    var enemySpawn = room.find(Game.FIND_HOSTILE_SPAWNS);
                    if(enemySpawn.length > 0) {
                        var enemyPosition = enemySpawn[0].pos;
                        var inRange = room.lookForAtArea(LOOK_TERRAIN, enemyPosition.y + towerRange, enemyPosition.x - towerRange, enemyPosition.y - towerRange, enemyPosition.x + towerRange);
                        if(room.createConstructionSite(inRange[0].pos, STRUCTURE_TOWER) != OK) {
                                console.log('Error while rushing!');
                            } else {
                                creepAmounts = [6,2,10];
                            }
                        
                    } else {
                        console.log('Defencing!');
                        var spawningPools = Game.spawns;
                        for (var poolName in spawningPools) {
                            var pool = spawningPools[poolName];
                            if(room.createConstructionSite(pool.pos.x - 2, pool.pos.y, STRUCTURE_TOWER) != OK) {
                                console.log('Error while defencing!');
                            } else {
                                creepAmounts = [6,2,10];
                            }
                        }
                    }
                    
            }
        }
        
    }
};

module.exports = towerrush;