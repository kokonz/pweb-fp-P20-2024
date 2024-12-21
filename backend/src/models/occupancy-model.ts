import mongoose from "mongoose";

const RoomOccupancySchema = new mongoose.Schema(
    {
        empty: {
            type: Number,
            required: true,
        },
        filled: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export const RoomOccupancy = mongoose.model("RoomOccupancy", RoomOccupancySchema);
