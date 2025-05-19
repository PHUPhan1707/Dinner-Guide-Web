import Layout from "./layouts/layout";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import Auth from "./pages/Homepage/Auth";
import RestaurantPage from "./pages/Restaurant/Restaurant";
import AdminPage from "./pages/Admin/AdminPage";
import RestaurantManagement from "./pages/Admin/RestaurantManagement";
import RestaurantDetail from "./pages/Restaurant/RestaurantDetail";
import UserProfilePage from "./pages/UserProfilePage";
import Settings from "./pages/Admin/Settings";
import Dashboard from "./pages/Admin/Dashboard";
import ReviewManagement from "./pages/Admin/ReviewManagement";

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
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/reviews" element={<ReviewManagement />} />

            {/* User Profile Page */}
            <Route path="/user-profile" element={<UserProfilePage />} />

            {/* Redirect Unknown Routes to Home */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
