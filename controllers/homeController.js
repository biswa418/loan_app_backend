const User = require('../models/User');
const Audit = require('../models/Audit');

// for home page
module.exports.users = async (req, res) => {
    const users = await User.find({}).sort({ '_id': -1 }).limit(5);

    return res.status(200).json({
        success: true,
        message: "Users fetched successfully.",
        users
    });
}

// for home page
module.exports.user = async (req, res) => {
    try {
        const user = await User.findOne({ customer_id: req.params.id });

        if (user) {
            return res.status(200).json({
                success: true,
                message: "User fetched successfully.",
                user
            });
        } else {
            return res.status(400).json({
                success: true,
                message: "User doesn't exist.",
                user: null
            });
        }
    } catch (err) {
        if (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Something went wrong!",
                error: err
            })
        }
    }

}

//create new user
module.exports.create = async (req, res) => {
    try {
        let user = await User.findOne({ customer_id: req.body.customer_id });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists, try updating.",
                userId: user.customer_id
            });
        }

        user = await User.create(req.body);

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            userId: user
        });

    } catch (err) {
        if (err) {
            console.log(err);
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
        let user = await User.findOne({ customer_id: req.body.customer_id });

        if (user) {
            await User.findOneAndUpdate({ customer_id: user.customer_id }, req.body);

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                userId: user.customer_id
            });

        } else {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist.",
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
        let user = await User.findOneAndDelete({ customer_id: req.params.id });

        if (user) {
            return res.status(200).json({
                success: true,
                message: "User deleted.",
                user
            });
        }

        return res.status(400).json({
            success: false,
            message: "User could not be deleted.",
            userId: user
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

//get all audits
module.exports.audits = async (req, res) => {
    const audits = await Audit.find({});

    return res.status(200).json({
        success: true,
        message: "Audits fetched successfully.",
        audits
    });
}

// find through appId
module.exports.audit = async (req, res) => {
    const audits = await Audit.find({ user: req.params.id });

    return res.status(200).json({
        success: true,
        message: "Audits fetched successfully.",
        audits
    });
} 