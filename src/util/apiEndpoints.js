// export const BASE_URL = "http://localhost:8181/api/v1.0"

export const BASE_URL = "https://moneymanger-backend.onrender.com/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "dguyerusv";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  GET_ALL_CATEGORIES: "/categories",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
}
