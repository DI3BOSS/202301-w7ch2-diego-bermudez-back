import multer from "multer";
import { Router } from "express";
import { loginUser, createUser } from "../controllers/usersControllers.js";
import { v4 as uuidv4 } from "uuid";

export const usersRouter = Router();

const fileNamePrefix = uuidv4;

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, `${fileNamePrefix()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

usersRouter.post("/login", loginUser);
usersRouter.post("/register", upload.single("avatar"), createUser);
