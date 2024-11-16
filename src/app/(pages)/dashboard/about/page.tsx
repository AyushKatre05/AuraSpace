"use client";
import React, { useState, useEffect } from "react";
import InputAdmin from "@/components/AdminComponent/InputAdmin";
import { Button } from "@/components/ui/button";
import { useForm, FieldError } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type AboutFormData = {
  userid: string | undefined;
  name: string;
  heading: string;
  about: string;
  image: FileList;
};

const Page: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string>("");
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AboutFormData>();
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [aboutId, setAboutId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [previousImage, setPreviousImage] = useState<string>("");

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onSubmit = async (data: AboutFormData) => {
    setIsLoading(true);
    let imageUrl = imagePreview;

    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append("file", data.image[0]);

      const imageResponse = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
      });

      const imageResult = await imageResponse.json();

      if (previousImage) {
        fetch(`/api/image/upload/${previousImage}`, {
          method: "DELETE",
        });
      }

      if (imageResponse.ok) {
        imageUrl = imageResult.imgUrl;
        setPreviousImage(imageUrl);
      } else {
        console.error("Failed to upload image", imageResult);
        setIsLoading(false);
        return;
      }
    } else {
      if (!imagePreview) {
        toast.error("Please select an image");
        setIsLoading(false);
        return;
      }
    }

    const aboutData = {
      userid: session?.user?.id,
      name: data.name,
      heading: data.heading,
      about: data.about,
      image: imageUrl,
    };

    if (isUpdate) {
      await updateUserAbout(aboutData);
    } else {
      await addUserAbout(aboutData);
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const addUserAbout = async (
    data: Omit<AboutFormData, "image"> & { image: string }
  ) => {
    try {
      const response = await fetch("/api/portfolio/about/addabout", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("About added successfully");
        setIsUpdate(true);
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAbout = async () => {
    setPageLoading(true);
    try {
      const response = await fetch(
        `/api/portfolio/about/getabout/${session?.user?.id}`,
        {
          method: "GET",
          cache: "default"
        }
      );

      const data = await response.json();

      if (response.ok && data.data && data.data.length > 0) {
        setIsUpdate(true);
        setIsLoading(false);
        setValue("name", data.data[0].name);
        setAboutId(data.data[0]._id);
        setValue("heading", data.data[0].heading);
        setValue("about", data.data[0].about);
        setPreviousImage(data.data[0].image);
        
        setImagePreview(data.data[0].image);
      } else {
        setIsUpdate(false);
        setIsLoading(false);
        setAboutId("");
      }
    } catch (error) {
      console.log("error getting user about", error);
    } finally {
      setPageLoading(false);
    }
  };

  const updateUserAbout = async (
    data: Omit<AboutFormData, "image"> & { image: string }
  ) => {
    try {
      const response = await fetch(`/api/portfolio/about/${aboutId}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("About updated successfully");
      } else {
        console.error("Failed to submit data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setValue("image", files);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getErrorMessage = (
    error: FieldError | undefined
  ): string | undefined => {
    return error?.message;
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUserAbout();
    }
  }, [status]);

  if (pageLoading || status === "loading") {
    return (
      <main className="flex justify-center items-center w-full h-screen bg-gray-50">
        <span className="loader2"></span>
      </main>
    );
  }

  return (
    <div className="container mx-auto md:mt-16 mt-6 px-6">
      <h1 className="text-3xl font-semibold text-gray-800">Personal Details</h1>
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="w-full md:w-1/2 space-y-4">
              <InputAdmin
                label="Name"
                placeholder="Enter your name"
                {...register("name")}
                error={getErrorMessage(errors.name)}
              />
              <InputAdmin
                label="About"
                placeholder="Enter details about yourself"
                {...register("about")}
                error={getErrorMessage(errors.about)}
                textarea
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <InputAdmin
                label="Heading"
                placeholder="Enter your headline"
                {...register("heading")}
                error={getErrorMessage(errors.heading)}
              />
              <InputAdmin
                type="file"
                label="Image"
                placeholder="Upload image"
                onChange={handleImageChange}
                error={getErrorMessage(errors.image)}
                image={!!imagePreview}
                imageUrl={imagePreview}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-8 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              disabled={isLoading}
            >
              {isUpdate ? "Update" : "Add"}
              {isLoading && <span className="loader ml-2"></span>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
