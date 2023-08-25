const Couser = require('../models/Couser');
const User = require('../models/User');

//create new cousers
module.exports.create = async (req, res) => {
    try {
        let user = await User.findOne({ customer_id: req.body.customer_id });

        if (user) {
            let cousers = await Couser.create(req.body);

            return res.status(200).json({
                success: true,
                message: "Co-user created successfully",
                couserId: cousers.customer_id
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid user id.",
            });
        }
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

module.exports.getOne = async (req, res) => {
    try {
        let couser = await Couser.findOne({ application_id: req.body.application_id });

        if (couser) {
            return res.status(200).json({
                success: true,
                message: "Co-user fetched successfully",
                couserId: couser.application_id
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
        } else {
            return res.status(400).json({
                success: false,
                message: "Co-user doesn't exist.",
            });
        }
    }
}

// update existing one
module.exports.update = async (req, res) => {
    try {
        let couser = await Couser.findOne({ application_id: req.body.application_id });

        if (couser) {
            await Couser.findOneAndUpdate({ application_id: app.application_id }, req.body);

            return res.status(200).json({
                success: true,
                message: "Co-user updated successfully",
                couserId: couser.application_id
            });

        } else {
            return res.status(400).json({
                success: false,
                message: "Co-user doesn't exist.",
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
        let couser = await Couser.findOneAndDelete({ customer_id: req.params.id });

        if (couser) {
            return res.status(200).json({
                success: true,
                message: "Co-user deleted.",
                couser
            });
        }

        return res.status(400).json({
            success: false,
            message: "Co-user could not be deleted.",
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