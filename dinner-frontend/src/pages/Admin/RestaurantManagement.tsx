import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaImage, FaHome, FaUtensils, FaWarehouse, FaTachometerAlt, FaCog, FaSignOutAlt, FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { Restaurant, MenuItem, getAllRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } from '../../api/RestaurantApi';
import AdminLayout from '../../components/admin/AdminLayout';

const RestaurantManagement = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
  const [formData, setFormData] = useState<Partial<Restaurant>>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const fetchRestaurants = async () => {
    try {
      const response = await getAllRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      alert('Failed to load restaurants');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const processImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const img = document.createElement('img');
        const reader = new FileReader();

        reader.onload = () => {
          img.src = reader.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions while maintaining aspect ratio
            const maxSize = 600; // Reduced from 800 to 600
            if (width > height && width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            } else if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error('Could not get canvas context'));
              return;
            }

            // Set image smoothing for better quality at smaller sizes
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // Draw image with white background to handle transparency
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to base64 with reduced quality
            const base64 = canvas.toDataURL('image/jpeg', 0.5); // Reduced quality from 0.7 to 0.5

            // Check if the base64 string is too large (over 1MB)
            if (base64.length > 1024 * 1024) {
              // If still too large, reduce dimensions further
              const scale = Math.sqrt(1024 * 1024 / base64.length);
              canvas.width = Math.round(width * scale);
              canvas.height = Math.round(height * scale);
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              resolve(canvas.toDataURL('image/jpeg', 0.5));
            } else {
              resolve(base64);
            }
          };
        };

        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'menuItem') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await processImage(file);
        if (type === 'cover') {
          setFormData({ ...formData, coverImage: base64 });
        }
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Failed to process image');
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
    if (window.confirm('Are you sure you want to delete this restaurant? This action cannot be undone and will delete all related data including menu items, reviews, and reservations.')) {
      try {
        await deleteRestaurant(id);
        // Update local state to remove the deleted restaurant
        setRestaurants(prevRestaurants => prevRestaurants.filter(r => r.id !== id));
        alert('Restaurant and all related data deleted successfully');
      } catch (error: any) {
        console.error('Error deleting restaurant:', error);
        if (error.response?.status === 403) {
          alert('You do not have permission to delete restaurants');
          navigate('/auth');
        } else {
          const errorMessage = error.response?.data?.message || 'Failed to delete restaurant';
          alert(`Error: ${errorMessage}`);
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

  // Filter restaurants based on search query
  const filteredRestaurants = useMemo(() => {
    if (!searchQuery) return restaurants;

    const query = searchQuery.toLowerCase();
    return restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.description.toLowerCase().includes(query) ||
      restaurant.address.toLowerCase().includes(query) ||
      restaurant.email.toLowerCase().includes(query) ||
      restaurant.phone.toLowerCase().includes(query) ||
      restaurant.menu?.some(item => item.name.toLowerCase().includes(query))
    );
  }, [restaurants, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <AdminLayout onSearch={handleSearch}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-800">Restaurant Management</h1>
            <p className="text-sm text-gray-500 mt-1">
              {filteredRestaurants.length} restaurants found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map(restaurant => (
            <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={restaurant.coverImage || "https://via.placeholder.com/400x200"}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-4">{restaurant.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {restaurant.openTime} - {restaurant.closeTime}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setCurrentRestaurant(restaurant);
                        setFormData(restaurant);
                        setMenuItems(restaurant.menu || []);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Restaurant Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6">
                {currentRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-6 mb-6">
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
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Opening Time</label>
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
                    <label className="block text-sm font-medium text-gray-700">Closing Time</label>
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

                {/* Description */}
                <div className="mb-6">
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

                {/* Cover Image */}
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

                {/* Menu Items */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Menu Items</h3>
                    <button
                      type="button"
                      onClick={handleAddMenuItem}
                      className="bg-zinc-100 px-3 py-1 rounded-md hover:bg-zinc-200"
                    >
                      Add Item
                    </button>
                  </div>
                  {menuItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-3 gap-4 mb-4">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => handleMenuItemChange(item.id, 'name', e.target.value)}
                        placeholder="Item name"
                        className="rounded-md border-gray-300"
                      />
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleMenuItemChange(item.id, 'price', parseFloat(e.target.value))}
                        placeholder="Price"
                        className="rounded-md border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setMenuItems(menuItems.filter(i => i.id !== item.id))}
                        className="text-red-600 hover:bg-red-50 px-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form Actions */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-800 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RestaurantManagement; 