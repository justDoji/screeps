var builder = {
    run: function(from, to, room, building) {
        switch(building) {
            default:
            case "road":
                return this.defaultBuilder(from, to, room, 'road');
            case "wall":
                return this.defaultBuilder(from, to, room, 'wall');
        }

    },

    defaultBuilder: function(from, to, room, building) {
        if(from == null || to == null)
            return -1;

        var road = 0;
        var from_pos = new RoomPosition(from.x, from.y, room.name);
        var to_pos = new RoomPosition(to.x, to.y, room.name);
        var path = room.findPath(from_pos, to_pos, {ignoreCreeps: true});

        for(var i = 0; i < path.length; i++) {
            road += ((room.createConstructionSite(path[i].x, path[i].y, building) == OK) ? 1 : 0);
        }

        if (road > 0) {
            console.log(`<font color=\"#6065FF\">[Blueprint]</font> ${room.name} placed ${road} construction sites for a road `
                + `from (${from_pos.x}, ${from_pos.y}) to (${to_pos.x}, ${to_pos.y})`);
        }

        return road;
    }

}

module.exports = builder;