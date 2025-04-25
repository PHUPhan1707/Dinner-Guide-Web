import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCamera } from 'react-icons/fa';
import { updateUser, uploadAvatar } from '../../api/UserApi';
import AdminLayout from '../../components/admin/AdminLayout';

const Settings = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatar: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const updateUserDataInStorage = (newData: any) => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      const updatedUserData = { ...userData, ...newData };
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      return updatedUserData;
    }
    return null;
  };

  useEffect(() => {
    const loadUserData = () => {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        setFormData(prevData => ({
          ...prevData,
          fullName: userData.username || userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          avatar: userData.avatar || ''
        }));
        setPreviewImage(userData.avatar || null);
      }
    };

    loadUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        
        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to server
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await uploadAvatar(formData);
        
        if (response.data.avatarUrl) {
          const avatarUrl = response.data.avatarUrl;
          
          // Update local state
          setFormData(prevData => ({
            ...prevData,
            avatar: avatarUrl
          }));
          
          // Update localStorage and get updated user data
          const updatedUserData = updateUserDataInStorage({
            avatar: avatarUrl
          });
          
          // Update preview with the actual URL
          setPreviewImage(avatarUrl);
          
          // Force reload user data to ensure consistency
          if (updatedUserData) {
            setFormData(prevData => ({
              ...prevData,
              ...updatedUserData
            }));
          }
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        alert('Failed to upload avatar');
        // Revert preview on error
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          setPreviewImage(userData.avatar || null);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate passwords if attempting to change
      if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
        if (!formData.currentPassword) {
          throw new Error('Current password is required to change password');
        }
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }
      }

      const updateData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        ...(formData.currentPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      };

      const user = localStorage.getItem('user');
      if (!user) throw new Error('No user found');
      const userData = JSON.parse(user);

      const response = await updateUser(userData.id, updateData);
      
      // Update local storage with new user data
      const updatedUserData = {
        ...userData,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      };
      localStorage.setItem('user', JSON.stringify(updatedUserData));

      alert('Profile updated successfully');
      
      // Clear password fields
      setFormData(prevData => ({
        ...prevData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-zinc-800 mb-8">Profile Settings</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
          {/* Avatar Section */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative">
              <img
                src={previewImage || formData.avatar || "https://via.placeholder.com/128"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/128";
                }}
              />
              <label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 bg-black bg-opacity-50 rounded-full p-2 cursor-pointer hover:bg-opacity-75"
              >
                <FaCamera className="text-white" />
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaPhone className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password Change Section */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Change Password</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaLock className="inline mr-2" />
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaLock className="inline mr-2" />
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaLock className="inline mr-2" />
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-zinc-800 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Settings; 