import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address:{ type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userschema);


/*
{
  "firstname":"sachin",
  "lastname":"kn",
  "email":"sachin@gmail.com",
  "password":"1234",
  "phone":"24234",
  "address":"karnataka",
  "answer":"dish"
}
*/