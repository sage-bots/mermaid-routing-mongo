const metaService = require('./meta');

module.exports = function(app) {

    metaService.call(this, app);

};
