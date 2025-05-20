import { Link } from "react-router-dom";
import MobileNav from "./MobieNav";
import logo from "@/assets/diningning-logo.png";
import MainNav from "./MainNav";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-10">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
            <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    <Link to="/" className="flex-shrink-0">
                        <img src={logo} alt="Logo" className="h-16 md:h-20 lg:h-24" />
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8 lg:space-x-16 text-lg lg:text-2xl font-bold text-white">
                        <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-orange-500 transition-colors">About</Link>
                        <Link to="/restaurant" className="hover:text-orange-500 transition-colors">Restaurant</Link>
                        <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
                        <div>
                            <MainNav />
                        </div>
                    </nav>

                    <div className="md:hidden">
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
