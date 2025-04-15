import { Link } from "react-router-dom";
import MobileNav from "./MobieNav";
import logo from "@/assets/diningning-logo.png";

const Header = () => {
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <div className="absolute top-0 left-0 w-full z-20">
            <div className="container mx-auto flex justify-center items-center gap-32 py-6">
                <Link to="/" className="flex-shrink-0">
                    <img src={logo} alt="Logo" className="h-32" />
                </Link>

                <nav className="hidden md:flex space-x-32 text-2xl font-bold text-white">
                    <Link to="/" className="hover:text-orange-500">Home</Link>
                    <Link to="/about" className="hover:text-orange-500">About</Link>
                    <Link to="/restaurant" className="hover:text-orange-500">Restaurant</Link>
                    <Link to="/contact" className="hover:text-orange-500">Contact</Link>
                    {isLoggedIn ? (
                        <Link to="/profile" className="hover:text-orange-500">Profile</Link>
                    ) : (
                        <Link to="/auth" className="hover:text-orange-500">Sign In</Link>
                    )}
                </nav>
                <div className="md:hidden">
                    <MobileNav />
                </div>
            </div>
        </div>
    );
};

export default Header;
