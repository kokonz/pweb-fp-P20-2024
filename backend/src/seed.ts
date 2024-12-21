import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { User } from "./models/home-model";
import { Room, RentPeriod } from "./models/room-model";
import { RoomOccupancy } from "./models/occupancy-model";

const mongoURI = (process.env.MONGODB_URI as string) || "";

const seedDatabase = async () => {
  if (!mongoURI) {
    console.error("Error: MONGODB_URI is not defined in the .env file.");
    return;
  }
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
    
    const users = [
      {
        username: "admin",
        password: await bcrypt.hash("admin123", 10),
        role: "ADMIN",
      },
      {
        username: "kopet",
        password: await bcrypt.hash("kopet123", 10),
        role: "USER",
      },
      {
        username: "haidar",
        password: await bcrypt.hash("haidar123", 10),
        role: "USER",
      },
      {
        username: "kris",
        password: await bcrypt.hash("kris123", 10),
        role: "USER",
      },
    ];
    
    for (const user of users) {
      const existingUser = await User.findOne({ username: user.username });
      if (existingUser) {
        console.log(
          `User with username "${user.username}" already exists. Skipping.`
        );
        continue;
      }
      await User.create(user);
      console.log(`User "${user.username}" added successfully.`);
    }
    
    // Seed Rooms
    const rooms = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      occupied: false,
      username: "",
      rent_periods: null as RentPeriod | null,
    }));
    
    for (const room of rooms) {
      const existingRoom = await Room.findOne({ id: room.id });
      if (existingRoom) {
        console.log(`Room with id "${room.id}" already exists. Skipping.`);
        continue;
      }
      await Room.create(room);
      console.log(`Room with id "${room.id}" added successfully.`);
    }
    
    const roomOccupancyData = [
      { empty: 10, filled: 0 },
    ];
    
    for (const occupancy of roomOccupancyData) {
      const existingOccupancy = await RoomOccupancy.findOne(occupancy);
      if (existingOccupancy) {
        console.log(`RoomOccupancy data already exists. Skipping.`);
        continue;
      }
      await RoomOccupancy.create(occupancy);
      console.log(`RoomOccupancy data added successfully.`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

seedDatabase();
