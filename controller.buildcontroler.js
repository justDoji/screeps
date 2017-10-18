var towerrush = require('blueprint.towerrush');
var spawning = require('structs.spawningpool');
var defaultMacro = require('blueprint.default');

var buildcontroller = {
    run: function(buildName) {
        if(buildName == 'towerrush' || buildName == 'TR') {
            if(towerrush.run() != 0) {
                defaultMacro.run();
            }
        }
    }
};

module.exports = buildcontroller;