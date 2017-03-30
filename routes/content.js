var contentManager = function(app, Content) {
    app.get('/api/content-store/:application', function(req, res) {
        // get the application settings from the mongodb

        var applicationName = req.params.application;

        Content.findOne({
            "application": applicationName
        }, function(err, success) {
            if (success) {
                res.status(200).json({
                    result: success
                });
            } else {
                res.status(404).json({
                    msg: "Not found: " + applicationName
                });
            }
        });

    });

    app.post('/api/content-store/add', function(req, res) {
        // insert into/overwrite existing application in mongodb document
        var applicationName = req.body.application;
        var content = req.body.content; // the posted content should be a stringified object

        try {

            content = JSON.parse(content);
            Content.findOneAndUpdate({
                "application": applicationName
            }, {
                "content": content
            }, {
                new: true,
                upsert: true
            }, function(err, doc) {
                if (err) {
                    res.status(400).json({
                        result: err
                    });
                } else {
                    res.status(200).json({
                        msg: "New settings: " + doc
                    });
                }
            });
        } catch (e) {
            res.status(500).json({
                msg: "Something went wrong: " + e
            });
        }

    });
};

exports.contentManager = contentManager;