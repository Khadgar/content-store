var mongoose = require('mongoose');

module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ContentModel = new Schema({
        application: String,
        content: Object
    }, {
        collection: 'content'
    });

    var model = mongoose.model('content', ContentModel);

    return model;
};