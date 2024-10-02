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

exports.userDetailsDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const userExists = await UserModel.findByIdAndDelete(id);
        if (!userExists) {
            return res.status(404).json({ message: "user not found" });
        }

        return res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.userDetailsUpdate = async (req, res) => {
    try {
        const { name, email, role, location, phone, projects } = req.body;
        if (!name || !email || !role || !location || !phone || !projects) {
            return res.status(400).send({ message: "send all required fields" });
        }

        const { id } = req.params;

        const updateUserData = await UserModel.findByIdAndUpdate(id, req.body);

        if (!updateUserData) {
            return res.status(404).json({ message: "user not found!" });
        }

        return res.status(200).send({ message: "user data updated successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};