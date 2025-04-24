import Layout from "./layouts/layout";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import Auth from "./pages/Homepage/Auth";
import RestaurantPage from "./pages/Restaurant/Restaurant"; // Import the new page
import RestaurantDetail from "./pages/Restaurant/RestaurantDetail"; // Import restaurant detail page
import UserProfilePage from "./pages/UserProfilePage";
import AdminPage from "./pages/Admin/AdminPage";
import RestaurantManagement from "./pages/Admin/RestaurantManagement";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Home Page */}
            <Route
                path="/"
                element={
                    <Layout>
                        <HomePage />
                    </Layout>
                }
            />

            {/* Restaurant Page */}
            <Route
                path="/restaurant"
                element={
                    <Layout>
                        <RestaurantPage />
                    </Layout>
                }
            />

            {/* Restaurant Detail Page */}
            <Route
                path="/restaurant/:id"
                element={
                    <Layout>
                        <RestaurantDetail />
                    </Layout>
                }
            />

            {/* Authentication Page */}
            <Route path="/auth" element={<Auth />} />

            {/* Admin Pages */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/restaurants" element={<RestaurantManagement />} />

            {/* User Profile Page (Example) */}
            <Route path="/user-profile" element={<UserProfilePage />} />

            {/* Redirect Unknown Routes to Home */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
