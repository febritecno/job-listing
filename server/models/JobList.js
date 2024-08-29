import mongoose from "mongoose";

const JobListSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        type: {
            type: String,
        },
        url: {
            type: String,
        },
        created_at: {
            type: Date,
        },
        company: {
            type: String,
        },
        company_url: {
            type: String,
        },
        location: {
            type: String,
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        how_to_apply: {
            type: String,

        },
        company_logo: {
            type: String,
        },
    }, { timestamps: true }
);

const JobList = mongoose.model("JobList", JobListSchema);

export default JobList;
