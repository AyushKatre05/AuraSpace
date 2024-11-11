import { uploadToCloudinary } from "@/utils/handleupload";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cloudinary } from "@/utils/cloudinary";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const fileBuffer = await file.arrayBuffer();
  const mimeType = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;
  const res = await uploadToCloudinary(fileUri, file.name);

  if (res.success && res.result) {
     return NextResponse.json({ 
        message: "success", imgUrl: res.result.secure_url 
     }); 
   } else return NextResponse.json({ message: "failure" });
}

export async function DELETE(req: NextRequest, { params }: any) {
  const { url } = params;

  if (!url || !Array.isArray(url)) {
    return NextResponse.json({ message: "Image URL is required" }, { status: 400 });
  }

  try {
    const folder = url[6];  
    const fileWithExt = url[7]; 

    const file = fileWithExt.replace(/\.[^/.]+$/, ''); 

    const publicId = `${folder}/${file}`;

    console.log("Deleting image with publicId:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      return NextResponse.json({ message: "Image deleted successfully" });
    } else {
      return NextResponse.json({ message: "Failed to delete image", result }, { status: 500 });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ message: "An error occurred", error }, { status: 500 });
  }
}
