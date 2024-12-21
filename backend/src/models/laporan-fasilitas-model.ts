import mongoose from "mongoose";
import { User } from "./home-model";

const DamageReportingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const DamageReporting = mongoose.model("DamageReporting", DamageReportingSchema);
