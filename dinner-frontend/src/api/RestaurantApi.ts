import axios from "axios";
import { API_URL } from './config';

export interface MenuItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

export interface Restaurant {
  id: string;
  name: string;
  coverImage: string;
  address: string;
  ratingCount: number;
  openTime: string;
  closeTime: string;
  email: string;
  phone: string;
  description: string;
  menu: MenuItem[];
}

// Add Authorization header with token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all restaurants (public)
export const getAllRestaurants = () => {
  return axios.get(`${API_URL}/restaurants`);
};

// Get a single restaurant (public)
export const getRestaurant = (id: string) => {
  return axios.get(`${API_URL}/restaurants/${id}`);
};

// [ADMIN] Create a new restaurant
export const createRestaurant = (restaurantData: Omit<Restaurant, 'id'>) => {
  return axios.post(`${API_URL}/restaurants`, restaurantData, getAuthHeader());
};

// [ADMIN] Update a restaurant
export const updateRestaurant = (id: string, restaurantData: Partial<Restaurant>) => {
  return axios.put(`${API_URL}/restaurants/${id}`, restaurantData, getAuthHeader());
};

// [ADMIN] Delete a restaurant
export const deleteRestaurant = (id: string) => {
  return axios.delete(`${API_URL}/restaurants/${id}`, getAuthHeader());
}; 