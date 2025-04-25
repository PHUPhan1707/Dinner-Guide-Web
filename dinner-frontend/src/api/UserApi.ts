import axios from "axios";
import { API_URL } from './config';

export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  avatar?: string;
  createdAt: string;
}

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
  return axios.post(`${API_URL}/auth/register`, { username, email, password });
};

export const verifyEmail = async (email: string, code: string) => {
  return axios.post(`${API_URL}/auth/verify-email`, { email, code });
};

export const loginUser = async (email: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
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

// Update user profile
export const updateUser = (userId: string, userData: {
  fullName?: string;
  email?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
}) => {
  return axios.put(`${API_URL}/users/${userId}`, userData, getAuthHeader());
};

// Upload user avatar
export const uploadAvatar = (formData: FormData) => {
  return axios.post(`${API_URL}/users/avatar`, formData, {
    ...getAuthHeader(),
    headers: {
      ...getAuthHeader().headers,
      'Content-Type': 'multipart/form-data',
    },
  });
};

// [ADMIN] Get all users
export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`, getAuthHeader());
};

// [ADMIN] Delete a user
export const deleteUser = (id: string) => {
  return axios.delete(`${API_URL}/users/${id}`, getAuthHeader());
};

