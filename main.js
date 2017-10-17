var visuals = require('utils.visuals');
var presteps = require('utils.preSteps');
var spawning = require('structs.spawningpool');
var creeps = require('utils.creepControler');
var controller = require('controller.buildcontroler');

module.exports.loop = function () {

    presteps.run();
    visuals.run();
    controller.run('TR');
    creeps.run();
}