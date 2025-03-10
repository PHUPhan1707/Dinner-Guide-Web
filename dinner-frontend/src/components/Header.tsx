import { Link } from "react-router-dom";
import MobileNav from "./MobieNav";
import logo from "../assets/diningning-logo.png";

const Header = () => {
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <div className="py-8 z-10">
            <div className="container mx-auto flex justify-center items-center gap-32">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img src={logo} alt="Logo" className="h-32" />
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-32 text-2xl font-bold text-white">
                    <Link to="/" className="hover:text-orange-500">Home</Link>
                    <Link to="/about" className="hover:text-orange-500">About</Link>
                    <Link to="/restaurant" className="hover:text-orange-500">Restaurant</Link>
                    <Link to="/contact" className="hover:text-orange-500">Contact</Link>

                    {/* Sign In */}
                    {isLoggedIn ? (
                        <Link to="/profile" className="hover:text-orange-500">Profile</Link>
                    ) : (
                        <Link to="/auth" className="hover:text-orange-500">Sign In</Link>
                    )}
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <MobileNav />
                </div>
            </div>
        </div>
    );
};

export default Header;
