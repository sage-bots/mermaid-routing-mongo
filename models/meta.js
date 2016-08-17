var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var metaSchema = new Schema({
    uri: String
}, {
    strict: false,
    minimize: false,
    collection: "meta"
});


mongoose.model('Meta', metaSchema);
