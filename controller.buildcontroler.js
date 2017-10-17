var towerrush = require('buildorder.towerrush');
var spawning = require('structs.spawningpool');

var buildcontroller = {
    run: function(buildName) {
        if(buildName == 'towerrush' || buildName == 'TR') {
            towerrush.run();
        }
    }
};

module.exports = buildcontroller;