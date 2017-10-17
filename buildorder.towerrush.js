var spawning = require('structs.spawningpool');
var towerRange = 7;
var creepAmounts = [6,2,5];

var towerrush = {
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
            if(room.find(FIND_MY_CONSTRUCTION_SITES).length < 2) {
                    var enemySpawn = room.find(Game.FIND_HOSTILE_STRUCTURES);
                    if(enemySpawn.length > 0) {
                        console.log('TOWERRUSHING!');
                        var enemyPosition = enemySpawn[0].pos;
                        var inRange = room.lookForAtArea(LOOK_TERRAIN, enemyPosition.y + towerRange, enemyPosition.x - towerRange, enemyPosition.y - towerRange, enemyPosition.x + towerRange);
                        if(room.createConstructionSite(inRange[0].pos, STRUCTURE_TOWER) != OK) {
                                console.log('Error while rushing!');
                            } else {
                                creepAmounts = [10,2,5];
                            }
                        
                    } else {
                        
                        var spawningPools = Game.spawns;
                        for (var poolName in spawningPools) {
                            console.log('Defencing!');
                            var pool = spawningPools[poolName];
                            room.createConstructionSite(pool.pos.x - 2, pool.pos.y, STRUCTURE_TOWER);
                            room.createConstructionSite(pool.pos.x + 2, pool.pos.y, STRUCTURE_TOWER);
                        }
                        
                    }
                    
            }
        }
        
    }
};

module.exports = towerrush;