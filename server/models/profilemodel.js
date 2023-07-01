import mongoose from "mongoose";

const profileschema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    fullname: { type: String },
    age: { type: String },
    ethnicity: { type: String },
    religion: { type: String },
    height: { type: String },
    weight:{ type: String},
    occupation: { type: String },
    phone: { type: String },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model("profiles", profileschema);

/*
{
    "userId":"649bb07f3e45867961f3aacd",
      "fullname":"sachin",
      "age":"20",
      "ethnicity":"india",
      "religion":"hindu",
      "height":"6 feet",
      "weight":"56kg",
      "occupation":"full satck web developer",
      "phone":"6361124312"
}
*/