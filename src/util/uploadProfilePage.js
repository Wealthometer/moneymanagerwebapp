import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = "MoneyManager";

const uploadProfileImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Cloudinary Upload Failed: ${errorData.error.message}`);
        }

        const data = await response.json(); 
        console.log(`Image Uploaded Succesfully` + data)
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }

}

export default uploadProfileImage;