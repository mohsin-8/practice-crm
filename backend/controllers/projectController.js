const ProjectModel = require("../models/Projects");

exports.CreateProject = async (req, res) => {
    try {
        const {
            projectName,
            startDate,
            endDate,
            projectDescription,
            budget,
            categories,
            priorityStatus,
            assignMembers,
            projectTags
        } = req.body;

        const project = new ProjectModel({
            projectName,
            startDate,
            endDate,
            projectDescription,
            budget,
            categories,
            priorityStatus,
            assignMembers,
            projectTags,
            createdBy: req.user.id
        });

        await project.save();
        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.GetAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find()
            .populate('assignMembers', 'name')
            .populate('createdBy', 'name');

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.GetProjectById = async (req, res) => {
    try {
        const { id } = req.body;
        const project = await ProjectModel.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};