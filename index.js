var mongoose = require("mongoose");
var services = require("./services");
var Q = require("q");
var logger = require("./logger");

var mongoGetDataByURI = function(app) {

    var mermaidGetter = app.mermaid.getDataByURI;

    return function(uri) {

        var deferred = Q.defer();

        app.service("/v1/meta").get(uri).then((data) => {

            deferred.resolve(data);

        }).catch((_) => {

            if (mermaidGetter(uri)) {
                var data = mermaidGetter(uri);
                deferred.resolve(data);
            } else {
                deferred.reject("No data with that uri");
            }
        })


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
