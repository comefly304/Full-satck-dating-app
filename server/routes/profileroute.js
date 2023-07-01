import express from 'express'
import { createprofilecontroller, getprofiles, getsingleprofilecontroller, updateprofilecontroller } from '../controllers/profilecontroller.js'
import { requireSignin } from '../middlewares/authmiddleware.js'


export const profileRoute=express.Router()


//create profile
profileRoute.post("/create-profile",createprofilecontroller)

//get profile
profileRoute.get("/get-profile",getprofiles)

//get single profile
profileRoute.get("/get-profile/:userId",requireSignin,getsingleprofilecontroller)


//update profile
profileRoute.put("/update-profile/:userId",requireSignin,updateprofilecontroller)