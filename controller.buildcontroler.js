var creepController = require('controller.creepcontroller');

var buildcontroller = {
    run: function() {
        var controllerLevel = 0;

        let buildLevelOne = require('blueprint.buildLevelOne');
        creepController.run(buildLevelOne.getDistribution());
        buildLevelOne.run();

    }
};

module.exports = buildcontroller;