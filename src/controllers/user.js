import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiError}  from "../utils/ApiError.js";
import {User} from '../models/user.models.js';
import {upload} from '../middlewares/multer.js'
import { uploadOnCloudinary } from '../utils/fileUpload.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler (async(req , res)=>{
  //get details from frontend
  //validation - check for it is non empty
  //check if user is already existed: username any email check
  //check for images, check for avatar
  //upload them to cloudinary 
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation
  // return response
  const {fullName , email , username , password}=req.body
  // console.log("email :" , email)
  
    // if(fullName == ""){
    //   throw new ApiError(400, "full name is required")
    // }    
    //                   or

    if(
      [fullName,email,password,username].some((field)=>{
        field?.trim() === ""
      })
    ){
      throw new ApiError(400,"Please fill all the fields ")
    }

   
  const existedUser =  await User.findOne({
      $or:[{email}, {username}]
    })
  if(existedUser){
    throw new ApiError(409, "Username or email is already existed")
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImagePath = req.files?.coverImage[0].path;
  let coverImagePath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImagePath = req.files.coverImage[0].path
  } 
  
  if(!avatarLocalPath ){
    throw new ApiError(400, "avatar file is required")
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImagePath)

  if(!avatar){
    throw new ApiError(500,'Server error while uploading image')
  }
  const userData = await User.create({
    fullName,
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    email ,
    password,
    username:username.toLowerCase()
  })
 const createdUserName = await User.findById(userData._id).select(
  "-password -refreshToken"
 )

  if (!createdUserName) {
    throw  new ApiError(500 , "something went wrong while registering the user")
  }

    return res.status(201).json(
      new  ApiResponse(200 , createdUserName,"user registered sucessfully ")
  )

})
  


export {registerUser}