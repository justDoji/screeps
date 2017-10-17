/**
 * Created by Doji on 17/10/2017.
 */
var visuals = {

    run: function() {

        //Fancy spawning visuals
        for(var spawningPool in Game.spawns) {
            var pool = Game.spawns[spawningPool];
            if(pool.spawning) {
                var spawningCreep = Game.creeps[pool.spawning.name];
                pool.room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    pool.pos.x + 1,
                    pool.pos.y,
                    {align: 'left', opacity: 0.8});
            }
        }

    }


};

module.exports = visuals;