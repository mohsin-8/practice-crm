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

exports.UpdateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { projectName, startDate, endDate, projectDescription, budget, categories, priorityStatus, assignMembers, projectTags } = req.body;
        if (!projectName || !startDate || !endDate || !projectDescription || !budget || !categories || !assignMembers || !priorityStatus || !projectTags) {
            return res.status(404).json({ message: "send all required fields" });
        }

        const updateProjects = await ProjectModel.findByIdAndUpdate(id, req.body);
        if (!updateProjects) {
            return res.status(404).json({ message: "project not found" });
        }

        return res.status(200).send({ message: "project updated succesfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.GetAllProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find()
            .populate('assignMembers', 'name')
            .populate('projectTags', 'name')
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

exports.DeleteUserFromProjects = async (req, res) => {
    try {
        const { projectId, memberId } = req.params;

        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isMemberAssigned = project.assignMembers.includes(memberId);
        if (!isMemberAssigned) {
            return res.status(404).json({ message: "User not assigned to this project" });
        }

        project.assignMembers = project.assignMembers.filter(member => member.toString() !== memberId);

        await project.save();

        res.status(200).json({ message: "User removed from project successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

exports.DeleteProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await ProjectModel.findByIdAndDelete(id);

        if (!projects) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.status(200).send({ message: "Project Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.DeleteProjectTagsById = async (req, res) => {
    const { projectId, tagId } = req.params;

    try {
        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isTagAssigned = project.projectTags.includes(tagId);
        if (!isTagAssigned) {
            return res.status(404).json({ message: "Tag not assigned to this project" });
        }

        project.projectTags = project.projectTags.filter(tag => tag.toString() !== tagId);

        await project.save();

        res.status(200).json({ message: "Tag removed from project successfully", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};