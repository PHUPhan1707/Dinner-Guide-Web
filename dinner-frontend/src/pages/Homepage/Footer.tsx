import React from "react";
import { Link } from "react-router-dom";
import diningLogo from "@/assets/diningning-logo.png";
import twitterLogo from "@/assets/twitterlogo.png";
import fbLogo from "@/assets/fblogo.png";
import insLogo from "@/assets/inslogo.png";

const Footer = () => {
    return (
        <div className="bg-black text-white py-8 md:py-10 px-4 sm:px-8 md:px-16">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col items-center">
                    {/* Logo */}
                    <Link to="/main.tsx">
                        <img src={diningLogo} alt="DiningNing Logo" className="h-12 md:h-16 mb-4" />
                    </Link>

                    {/* Text */}
                    <p className="text-xl md:text-2xl lg:text-3xl font-[Carattere] text-center max-w-lg">
                        Whisper to us about your feelings and we will prepare what you need now
                    </p>

                    {/* Social Media Icons */}
                    <div className="flex space-x-6 mt-6">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <img src={twitterLogo} alt="Twitter" className="h-6 md:h-8" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <img src={fbLogo} alt="Facebook" className="h-6 md:h-8" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                            <img src={insLogo} alt="Instagram" className="h-6 md:h-8" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
