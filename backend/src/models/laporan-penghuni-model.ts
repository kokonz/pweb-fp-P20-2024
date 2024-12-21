import mongoose from "mongoose";

const UserReportSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const UserReport = mongoose.model("UserReport", UserReportSchema);
