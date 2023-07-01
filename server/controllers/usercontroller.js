import { generatetoken, hashpassword } from "../helpers/authHelpers.js";
import { User } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import { Profile } from "../models/profilemodel.js";

//register controler
export const Registercontroller = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, address, answer } =
      req.body;
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(500).send({
        success: false,
        message: "user already registered",
      });
    }
    const hashpass = await hashpassword(password);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashpass,
      phone,
      address,
      answer,
    });
    await user.save();
    delete user.password;
    return res.status(200).send({
      success: true,
      message: "Registred",
      user,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "invalid email or password",
      });
    }
    const comaprepass = await bcrypt.compare(password, user.password);
    if (!comaprepass) {
      return res.status(500).send({
        success: false,
        message: "invalid email or password",
      });
    }
    const token = await generatetoken(user);
    const others = { ...user._doc };
    delete others.password;
    return res.status(201).send({
      success: true,
      message: "login sucessful",
      token,
      user: others,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};

//forgot-password
export const forgotpasswordcontroller = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;
    const user = await User.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "invalid email or answer",
      });
    }
    const comaprepassword = await bcrypt.compare(newpassword, user.password);
    if (comaprepassword) {
      return res.send({
        success: false,
        message: "newpassword should not be same as old password",
      });
    }
    const hash = await hashpassword(newpassword);
    const updatepassword = await User.findByIdAndUpdate(user._id, {
      password: hash,
    });

    return res.status(201).send({
      success: true,
      message: "password updated",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};

//testcontroller
export const testcontroller = async (req, res) => {
  res.send({
    message: "user accessed",
  });
};

//updateusercontroller
export const updateusercontroller = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, address } = req.body;
    const user = await User.findById(req.user._id);
    const hash = password ? await hashpassword(password) : undefined;
    const updateduser = await User.findById(
      req.user._id,
      {
        firstname: firstname || user.firstname,
        lastname: lastname || user.lastname,
        email: user.email,
        password: hash || user.password,
        phone: phone || user.phone,
        address: address || user.address,
        answer: user.answer,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "user updated",
      updateduser,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};
