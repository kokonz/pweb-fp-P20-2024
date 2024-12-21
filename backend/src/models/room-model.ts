import mongoose from "mongoose";

export enum RentPeriod {
    THREE = 3,
    SIX = 6,
}

const RoomSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        occupied: {
            type: Boolean,
            required: true,
            default: false,
        },
        username: {
            type: String,
        },
        rent_periods: {
            type: Number,
        },
    },
    { timestamps: true }
);

export const Room = mongoose.model("Rooms", RoomSchema);
