import axios from "axios";

// Đảm bảo URL phù hợp với API backend
const API_URL = "http://localhost:5000/api";

// Helper function to get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Get reviews for a restaurant
export const getRestaurantReviews = async (restaurantId: string | number) => {
    return axios.get(`${API_URL}/reviews/restaurant/${restaurantId}`);
};

// Create a new review
export const createReview = async (reviewData: {
    restaurantId: string | number;
    rating: number;
    comment?: string;
    visitDate?: string;
    photos?: string[];
}) => {
    return axios.post(`${API_URL}/reviews`, reviewData, getAuthHeader());
};

// Update an existing review
export const updateReview = async (
    reviewId: string | number,
    reviewData: {
        rating?: number;
        comment?: string;
        visitDate?: string;
        photos?: string[];
    }
) => {
    return axios.put(`${API_URL}/reviews/${reviewId}`, reviewData, getAuthHeader());
};

// Delete a review
export const deleteReview = async (reviewId: string | number) => {
    return axios.delete(`${API_URL}/reviews/${reviewId}`, getAuthHeader());
}; 