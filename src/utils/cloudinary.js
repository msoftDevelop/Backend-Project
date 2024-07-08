import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";
// Configuration
  cloudinary.config({
    cloud_name: process.env.CLOULDINARY_NAME,
    api_key: process.env.CLOULDINARY_API_KEY,
    api_secret: process.env.CLOULDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
  }); 

  const uploadOnCloudinary = async (localFilePath) => {
try {
    if(!localFilePath)return null
    // Upload the file on cloudinary
    cloudinary.uploader.upload(localFilePath,{
        resource_type: "auto",
    })
// file has been uploaded successfully
console.log("File uploaded successfully on cloudinary: ", response.url)
return response;
} catch (error) {
    fs.unlinkSync(localFilePath);
    
    return null;

}  

  }
export {uploadOnCloudinary}