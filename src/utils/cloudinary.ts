import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader.upload("C:\\Users\\ayush\\OneDrive\\Desktop\\auraspace\\public\\candy.png", {
  folder: "auraspace"
})
.then(result => console.log("Upload successful:", result))
.catch(error => console.error("Upload error:", error));

export { cloudinary };