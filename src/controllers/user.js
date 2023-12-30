import { asyncHandler } from '../utils/asyncHandler.js';

const registerUser = asyncHandler (async(req , res)=>{
      res.status(200).json({
        message : "Ok"
    })
})
  
const userRes = asyncHandler(async(req,res)=>{
  //get details from frontend
  //validation - check for it is non empty
  //check if user is already existed: username anf email check
  //check for images, check for avatar
  //upload them to cloudinary 
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  // return response
  const {fullName , email , usernam