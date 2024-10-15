const mongoose = require("mongoose");

const Projects = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    assignMembers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
    },
    priorityStatus: {
        type: String,
        enum: ['Active', 'In Progress', 'Completed'],
        required: true
    },
    projectTags: {
        type: [String],
        required: false,
    },
    projectPreviewImage: {
        type: String,
        required: false,
    },
    attachedFile: {
        type: String,
        required: false,
    },
    createdBy: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model("Projects", Projects);