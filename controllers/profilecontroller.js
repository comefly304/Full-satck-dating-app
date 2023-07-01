import { Profile } from "../models/profilemodel.js";
import fs from "fs";
import express from 'express'



export const createprofilecontroller = async (req, res) => {
  try {
    const {
      userId,
      fullname,
      age,
      ethnicity,
      religion,
      height,
      weight,
      occupation,
      phone,
    } = req.body;

    // const { photo } = req.files;
    // const photoData = photo[0].data; 

    // const exisitingprofile = await Profile.findOne({ userId });
    // if (exisitingprofile) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Profile has already been created",
    //   });
    // }

    const profile = new Profile({
      userId,
      fullname,
      age,
      ethnicity,
      religion,
      height,
      weight,
      occupation,
      phone,
      // photo: {
      //   data: photoData,
      //   contentType: photo[0].mimetype,
      // },
    });

    await profile.save();
    return res.status(201).send({
      success: true,
      message: "Profile created",
      profile,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      err,
    });
  }
};


//get profiles
export const getprofiles = async (req, res) => {
  try {
    const getprofiles = await Profile.find();
    return res.status(201).send({
      success: true,
      getprofiles,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};

//updateprofilecontroller
export const updateprofilecontroller = async (req, res) => {
  try {
    const {
     userId
    } = req.params;

    const profile = await Profile.findOne({userId});
    const updatedprofile = await Profile.findOneAndUpdate({userId:userId}, {
      userId: profile.userId,
      fullname: fullname || profile.fullname,
      age: age || profile.age,
      ethnicity: ethnicity || profile.ethnicity,
      religion: religion || profile.religion,
      height: height || profile.height,
      weight: weight || profile.weight,
      occupation: occupation || profile.occupation,
      phone: phone || profile.phone,
    },{new:true});
    return res.status(201).send({
      success: true,
      updatedprofile,
    });
    
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      err
    });
  }
};


//getsingleprofilecontroller
export const getsingleprofilecontroller=async(req,res)=>{
  try{
   const {userId}=req.params
   const getsinghleuser=await Profile.findOne({userId})
   return res.status(201).send({
    success: true,
    getsinghleuser,
  });
  }catch(err){
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      err,
    });
}
}


/*
 userId,
      fullname,
      age,
      ethnicity,
      religion,
      height,
      weight,
      occupation,
      phone,

      try {
    const {
      userId,
      fullname,
      age,
      ethnicity,
      religion,
      height,
      weight,
      occupation,
      phone,
    } = req.body;
    const { photo } = req.files;
    const exisitingprofile = await Profile.findOne({ userId });
    if (exisitingprofile) {
      return res.status(400).send({
        success: false,
        message: "profile has been already created",
      });
    }
    const profile = new Profile({
      userId,
      fullname,
      age,
      ethnicity,
      religion,
      height,
      weight,
      occupation,
      phone,
    });
    if (photo) {
      profile.photo.data = fs.readFileSync(photo.path);
      profile.photo.contentType = photo.type;
    }
    await profile.save();
    return res.status(201).send({
      success: true,
      message: "profile created",
      profile,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
  */