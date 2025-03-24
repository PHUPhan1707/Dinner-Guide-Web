import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Thêm header Authorization với token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  return axios.post(`${API_URL}/register`, { username, email, password });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

// Thêm hàm lấy thông tin profile
export const getUserProfile = async () => {
  return axios.get(`${API_URL}/profile`, getAuthHeader());
};

// Thêm hàm cập nhật profile
export const updateUserProfile = async (userData: {
  username?: string;
  email?: string;
  address?: string;
  phone?: string;
  city?: string;
  country?: string;
  newPassword?: string;
  currentPassword?: string;
}) => {
  return axios.put(`${API_URL}/profile`, userData, getAuthHeader());
};  

