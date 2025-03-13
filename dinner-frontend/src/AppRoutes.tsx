import Layout from "./layouts/layout"
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";
import Restaurant from "./pages/Restaurant";



const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout>
                        <HomePage />
                    </Layout>}
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="/user-profile" element={<span>User profile PAGE</span>} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/restaurant" element={<Restaurant />} />





        </Routes>

    )
}


export default AppRoutes;
