import axios from "axios";

const API_URL = "http://localhost:5000/api/restaurants";

// Thêm header Authorization với token
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Lấy danh sách nhà hàng
export const getAllRestaurants = async () => {
    return axios.get(API_URL);
};

// Lấy chi tiết nhà hàng
export const getRestaurantById = async (id: string) => {
    return axios.get(`${API_URL}/${id}`);
};

// [ADMIN] Thêm nhà hàng
export const createRestaurant = async (restaurantData: {
    name: string;
    description?: string;
    address: string;
    phone?: string;
    openingHours?: string;
    cuisine?: string;
    priceRange?: string;
    imageUrl?: string;
    latitude?: number;
    longitude?: number;
}) => {
    return axios.post(API_URL, restaurantData, getAuthHeader());
};

// [ADMIN] Cập nhật nhà hàng
export const updateRestaurant = async (
    id: string,
    restaurantData: Partial<{
        name: string;
        description: string;
        address: string;
        phone: string;
        openingHours: string;
        cuisine: string;
        priceRange: string;
        imageUrl: string;
        latitude: number;
        longitude: number;
        isActive: boolean;
    }>
) => {
    return axios.put(`${API_URL}/${id}`, restaurantData, getAuthHeader());
};

// [ADMIN] Xóa nhà hàng
export const deleteRestaurant = async (id: string) => {
    return axios.delete(`${API_URL}/${id}`, getAuthHeader());
}; 