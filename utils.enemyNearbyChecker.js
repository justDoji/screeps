var enemyNearby = {

    run: function(position) {
        return position.findInRange(Game.FIND_HOSTILE_CREEPS, 10).length > 0 ;
    }
};

module.exports = enemyNearby;