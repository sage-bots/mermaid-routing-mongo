var mongoose = require("mongoose");
var services = require("./services");
var Q = require("q");
var logger = require("./logger");

var mongoGetDataByURI = function() {

    var nativeGetter = this.mermaid.getDataByURI;

    return function(uri) {

        var deferred = Q.defer();

        this.service("/v1/meta").get(uri).then((data) => {

            deferred.resolve(data);

        }).catch((_) => {

            if (nativeGetter(uri)) {
                var data = nativeGetter(uri);
                deferred.resolve(data);
            } else {
                deferred.reject("No data with that uri");
            }
        })


        return deferred.promise;


    }.bind(this);

}

var routingMongo = function(config) {

    return {
        setup: function() {

            this.mongoose = mongoose.createConnection(config.db);

            mongoose.Promise = global.Promise;

            this.mermaid.getDataByURI = mongoGetDataByURI.call(this);

            this.configure(services);

        }
    }
};





module.exports = routingMongo;
