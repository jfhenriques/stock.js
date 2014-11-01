(function() {
    "use strict";

    var uuid = require('node-uuid');

    var Entity = function (id, name) {
        if (!(this instanceof Entity))
            return new Entity();

        this.UUID = id || uuid.v4();
        this.name = name;
    };

    module.exports = Entity;

})();