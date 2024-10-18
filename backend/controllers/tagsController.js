const TagsModel = require("../models/Tags");

exports.CreateTags = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).send({ message: "Tag name is required" });
        }

        const existingTag = await TagsModel.findOne({ name });
        if (existingTag) {
            return res.status(400).send({ message: "Tag already exists" });
        }

        const newTag = new TagsModel({ name });
        await newTag.save();

        res.status(200).send({ message: "Tag created successfully", tag: newTag });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.GetTags = async (req, res) => {
    try {
        const tags = await TagsModel.find({});
        return res.status(200).json(tags);
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};