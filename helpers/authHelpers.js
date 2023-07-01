import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generatetoken = async (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  return token;
};

export const hashpassword = async (password) => {
  const SALT_ROUNDS = 10;
  const hashedpassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedpassword;
};

export const comparepassword = async (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword);
};
