import express from "express";
import {
  Registercontroller,
  forgotpasswordcontroller,
  loginController,
  testcontroller,
  updateusercontroller,
} from "../controllers/usercontroller.js";
import { requireSignin } from "../middlewares/authmiddleware.js";

export const userRouter = express.Router();

//regitser
userRouter.post("/register", Registercontroller);

//login
userRouter.post("/login", loginController);

//forgot-password
userRouter.put("/forgot-password", forgotpasswordcontroller);

//update-profile
userRouter.put("/update-user",requireSignin, updateusercontroller);

// //update-profile
// userRouter.get("/get-user/:id",requireSignin, getsingleuser);

//test router
userRouter.get("/test", requireSignin, testcontroller);

//user-auth
userRouter.get("/user-auth", requireSignin, async (req, res) => {
  res.send({ ok: true });
});
