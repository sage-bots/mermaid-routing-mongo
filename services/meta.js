const service = require('feathers-mongoose');
var hooks = require("feathers-hooks");

require('../models/meta');

module.exports = function(app) {

    app.use('/v1/meta', service({
        name: 'meta',
        Model: this.mongoose.model('Meta'),
        paginate: {
            default: 100,
            max: 100
        },
        overwrite: false,
        id : "uri"
    }));

    // Get our initialize service to that we can bind hooks
    const metaService = app.service('/v1/meta');

    // Set up our before hooks
    metaService.after({
        all: [service.hooks.toObject()]
    });

};
