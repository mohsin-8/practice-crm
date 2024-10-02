const UserModel = require("../models/User");

exports.userDetails = async (req, res) => {
    try {
        const userExists = await UserModel.find({});

        return res.status(200).json({
            data: userExists,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};