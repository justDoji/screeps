/* Module for controlling creeps ad-hoc.
Creeps that are of type 'worker' are subject to retasking per tick.
The controler will check that a certain amount of worker roles is present, and reasign creeps as needed
 */

var creepController = {
    run: function(distribution) {
        var creepHash = Game.creeps;
        var workerCreeps = [];
        for(var creepName in creepHash) {
            var creep = Game.creeps[creepName];
            if(creep.memory.type == 'worker') {
                workerCreeps.add(creep.name, creep);
            }
        }

        var _amountOfBuilders = 0;
        var _amountOfHarvesters = 0;
        var _amountOfUpgraders = 0;
        //Count and reassign based on location;
    }
};

module.exports = creepController;