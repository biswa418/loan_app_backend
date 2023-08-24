const Application = require('../models/Application');


module.exports.apps = async (req, res) => {
    const apps = await Application.find({}).sort({ '_id': -1 }).limit(5);

    return res.status(200).json({
        success: true,
        message: "Applications fetched successfully.",
        apps
    });
}

//return exact application
module.exports.app = async (req, res) => {
    const app = await Application.find({ application_id: req.params.id });

    return res.status(200).json({
        success: true,
        message: "Applications fetched successfully.",
        app
    });
}

//create new apps
module.exports.create = async (req, res) => {
    try {
        let app = await Application.findOne({ application_id: req.body.application_id });

        if (app) {
            return res.status(400).json({
                success: false,
                message: "Application already exists, try updating.",
                appId: app.application_id
            });
        }

        app = await Application.create(req.body);

        return res.status(200).json({
            success: true,
            message: "Loan Application created successfully",
            appId: app.application_id
        });

    } catch (err) {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong!",
                error: err
            })
        }
    }
}

// update existing one
module.exports.update = async (req, res) => {
    try {
        let app = await Application.findOne({ application_id: req.body.application_id });

        if (app) {
            await Application.findOneAndUpdate({ application_id: app.application_id }, req.body);

            return res.status(200).json({
                success: true,
                message: "Application updated successfully",
                appId: app.application_id
            });

        } else {
            return res.status(400).json({
                success: false,
                message: "Application doesn't exist.",
            });
        }
    } catch (err) {
        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Something went wrong!",
                error: err
            })
        }
    }
}

//delete if exists
module.exports.delete = async (req, res) => {
    try {
        let app = await Application.findOneAndDelete({ application_id: req.params.id });

        if (app) {
            return res.status(200).json({
                success: true,
                message: "Application deleted.",
                app
            });
        }

        return res.status(400).json({
            success: false,
            message: "Application could not be deleted.",
        });

    } catch (err) {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong!",
                error: err
            })
        }
    }
}