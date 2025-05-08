import axios from "axios";

// Đảm bảo URL phù hợp với API backend
const API_URL = "http://localhost:5000/api";

// Helper function to get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        },
    };
};

// Upload review image
export const uploadReviewImage = async (imageData: FormData) => {
    return axios.post(`${API_URL}/reviews/upload-image`, imageData, getAuthHeader());
}; 