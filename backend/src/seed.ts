import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import { User } from "./models/home-model";
dotenv.config();
const mongoURI = (process.env.MONGODB_URI as string) || "";
const seedUsers = async () => {
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
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};
seedUsers();