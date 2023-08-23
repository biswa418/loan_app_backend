const User = require('../models/User');

// for home page
module.exports.users = async (req, res) => {
    const users = await User.find({}).sort({ '_id': -1 }).limit(5);

    return res.status(200).json({
        success: true,
        message: "Users fetched successfully.",
        users
    });
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
    const users = await User.find({}).sort({ '_id': -1 }).limit(5);

    return res.status(200).json({
        success: true,
        message: "Users fetched successfully.",
        users
    });
}

//create new user
module.exports.create = async (req, res) => {
    try {
        let user = await User.findOneAndDelete({ customer_id: req.query.id });

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