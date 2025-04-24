import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaImage } from 'react-icons/fa';
import { Restaurant, MenuItem, getAllRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../../api/RestaurantApi';

const RestaurantManagement = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
  const [formData, setFormData] = useState<Partial<Restaurant>>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      navigate('/auth');
      return;
    }

    const userData = JSON.parse(user);
    if (!userData.isAdmin) {
      navigate('/');
      return;
    }

    fetchRestaurants();
  }, [navigate]);

  const fetchRestaurants = async () => {
    try {
      const response = await getAllRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      alert('Failed to load restaurants');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'menuItem') => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement proper image upload to your server/storage
      const imageUrl = URL.createObjectURL(file); // Temporary URL for preview
      if (type === 'cover') {
        setFormData({ ...formData, coverImage: imageUrl });
      }
    }
  };

  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: '',
      imageUrl: '',
      price: 0
    };
    setMenuItems([...menuItems, newItem]);
  };

  const handleMenuItemChange = (id: string, field: keyof MenuItem, value: string | number) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await deleteRestaurant(id);
        await fetchRestaurants();
        alert('Restaurant deleted successfully');
      } catch (error: any) {
        console.error('Error deleting restaurant:', error);
        if (error.response?.status === 403) {
          alert('You do not have permission to delete restaurants');
          navigate('/auth');
        } else {
          alert('Failed to delete restaurant');
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.address || !formData.openTime || 
          !formData.closeTime || !formData.email || !formData.phone || 
          !formData.description) {
        throw new Error('Please fill in all required fields');
      }

      const restaurantData = {
        ...formData,
        menu: menuItems,
        ratingCount: 0,
        coverImage: formData.coverImage || 'https://via.placeholder.com/400x300' // Fallback image
      } as Restaurant;

      if (currentRestaurant) {
        await updateRestaurant(currentRestaurant.id, restaurantData);
        alert('Restaurant updated successfully');
      } else {
        const response = await createRestaurant(restaurantData);
        console.log('Create response:', response);
        alert('Restaurant created successfully');
      }

      setIsModalOpen(false);
      await fetchRestaurants();
    } catch (error: any) {
      console.error('Error saving restaurant:', error);
      if (error.response?.status === 403) {
        alert('You do not have permission to manage restaurants');
        navigate('/auth');
      } else {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to save restaurant';
        alert(`Error: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">Restaurant Management</h1>
        <button
          onClick={() => {
            setCurrentRestaurant(null);
            setFormData({});
            setMenuItems([]);
            setIsModalOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Restaurant
        </button>
      </div>

      {/* Restaurant List */}
      <div className="grid grid-cols-1 gap-6">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-start">
              <img
                src={restaurant.coverImage}
                alt={restaurant.name}
                className="w-48 h-32 object-cover rounded-md mr-6"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-2">{restaurant.address}</p>
                <p className="text-gray-600 mb-4">{restaurant.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCurrentRestaurant(restaurant);
                      setFormData(restaurant);
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(restaurant.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {currentRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'cover')}
                      className="hidden"
                      id="coverImage"
                    />
                    <label
                      htmlFor="coverImage"
                      className="cursor-pointer bg-zinc-100 p-2 rounded-md hover:bg-zinc-200 flex items-center"
                    >
                      <FaImage className="mr-2" /> Upload Image
                    </label>
                    {formData.coverImage && (
                      <img
                        src={formData.coverImage}
                        alt="Preview"
                        className="ml-4 h-10 w-10 object-cover rounded"
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Open Time</label>
                    <input
                      type="time"
                      name="openTime"
                      value={formData.openTime || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Close Time</label>
                    <input
                      type="time"
                      name="closeTime"
                      value={formData.closeTime || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Menu Items Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-lg font-medium text-gray-700">Menu Items</label>
                  <button
                    type="button"
                    onClick={handleAddMenuItem}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm flex items-center"
                  >
                    <FaPlus className="mr-1" /> Add Item
                  </button>
                </div>
                <div className="space-y-4">
                  {menuItems.map((item, index) => (
                    <div key={item.id} className="flex items-start space-x-4 p-4 bg-zinc-50 rounded-md">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleMenuItemChange(item.id, 'name', e.target.value)}
                          placeholder="Item name"
                          className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500"
                        />
                        <div className="mt-2 flex space-x-4">
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) => handleMenuItemChange(item.id, 'price', parseFloat(e.target.value))}
                            placeholder="Price"
                            className="block w-32 rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                handleMenuItemChange(item.id, 'imageUrl', imageUrl);
                              }
                            }}
                            className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-50 file:text-zinc-700 hover:file:bg-zinc-100"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMenuItems(menuItems.filter(i => i.id !== item.id))}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantManagement; 