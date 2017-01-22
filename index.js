var mongoose = require("mongoose");
var services = require("./services");
var Q = require("q");
var logger = require("./logger");

var mongoGetDataByURI = function(app) {

    var mermaidGetter = app.mermaid.getDataByURI;

    return function(uri) {

        var deferred = Q.defer();

        app.service("/v1/meta").find({
            query: {
                uri: uri
            }
        }).then((meta) => {

            if (meta.total > 0) {
                deferred.resolve(meta.data[0]);
            } else {
                if (mermaidGetter(uri)) {
                    var data = mermaidGetter(uri);
                    deferred.resolve(data);
                } else {
                    deferred.reject("No data with that uri");
                }
            }

        }).catch((err) => {
            deferred.reject(err);

        });


        return deferred.promise;


    };

}

var routingMongo = function(config) {

    return {
        setup: function(app) {

            this.mongoose = mongoose.createConnection(config.db);

            mongoose.Promise = global.Promise;

            app.mermaid.getDataByURI = mongoGetDataByURI(app);

            services.call(this, app);

        }
    }
};





module.exports = routingMongo;
