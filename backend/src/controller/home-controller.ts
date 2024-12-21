import { Request, Response } from "express";
import { User } from "../models/home-model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Login = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    var { username, password, role } = user;
    
    const isUserAlreadyExist = await User.findOne({
      username: username,
    });
    if (!isUserAlreadyExist) {
      res.status(400).json({
        status: 400,
        message: "User has not Registered yet",
      });
      return;
    }
    
    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserAlreadyExist.password
    );
    if (!isPasswordMatched) {
      res.status(401).json({
        status: 401,
        message: "Wrong Password",
      });
      return;
    }
    
    const isRoleMatched = isUserAlreadyExist.role === role;
    if (!isRoleMatched) {
      res.status(401).json({
        status: 401,
        message: "Wrong Role",
      });
      return;
    }
    
    const token = jwt.sign(
      { _id: isUserAlreadyExist?._id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );
    
    isUserAlreadyExist.tokens.push({ token });
    await isUserAlreadyExist.save();
    
    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      username: username,
      token: token,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};

export const getUserId = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      res.status(400).json({
        status: 400,
        message: "Username is required",
      });
      return;
    }
    
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }
    
    res.status(200).json({
      _id: user._id,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const getUserRole = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      res.status(400).json({
        status: 400,
        message: "Username is required",
      });
      return;
    }
    
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }
    
    res.status(200).json({
      role: user.role,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const getUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userDetails = await User.find({ role: { $ne: 'ADMIN' } }).select("_id username role");
    
    res.status(200).json({
      status: 200,
      success: true,
      message: "User details retrieved successfully",
      data: userDetails,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    
    if (!_id) {
      res.status(400).json({
        status: 400,
        message: "ID is required",
      });
      return;
    }
    
    const user = await User.findOne({ _id });
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "User not found",
      });
      return;
    }
    
    res.status(200).json({
      _id: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};