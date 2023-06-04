import { UserModel } from "../models/users.model.js";
import express from "express";

export const usersRouter = express.Router();

    usersRouter.get("/", async (req, res) => {
        try {
            const users = await UserModel.find({});
            return res.status(200).json({
                status: "success",
                msg: "listado de usuarios",
                data: users,
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {},
            });
        }
    });
