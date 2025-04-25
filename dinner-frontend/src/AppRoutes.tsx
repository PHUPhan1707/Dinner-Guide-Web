import Layout from "./layouts/layout";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import Auth from "./pages/Homepage/Auth";
import RestaurantPage from "./pages/Restaurant/Restaurant"; // Import the new page
import RestaurantDetail from "./pages/Restaurant/RestaurantDetail"; // Import restaurant detail page
import UserProfilePage from "./pages/UserProfilePage";
import About from "./pages/About"
import ContactUs from "./pages/ContactUs"

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

            <Route
                path="/About"
                element={
                    <Layout>
                        <About />
                    </Layout>
                }
            />

            <Route
                path="/Contactus"
                element={
                    <Layout>
                        <ContactUs />
                    </Layout>
                }
            />
            {/* Authentication Page */}
            <Route path="/auth" element={<Auth />} />

            {/* User Profile Page (Example) */}
            <Route path="/user-profile" element={<UserProfilePage />} />

            {/* Redirect Unknown Routes to Home */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
