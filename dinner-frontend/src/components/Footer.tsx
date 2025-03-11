import React from "react";
import { Link } from "react-router-dom";
import diningLogo from "../assets/diningning-logo.png";
import twitterLogo from "../assets/twitterlogo.png";
import fbLogo from "../assets/fblogo.png";
import insLogo from "../assets/inslogo.png";

const Footer = () => {
    return (
        <div className="bg-black text-white py-10 px-16 flex flex-col items-center">
            {/* Logo */}
            <Link to="/main.tsx">
                <img src={diningLogo} alt="DiningNing Logo" className="h-16 mb-4" />
            </Link>

            {/* Text */}
            <p className="text-3xl font-[Carattere] text-center max-w-lg">
                Whisper to us about your feelings and we will <br /> prepare what you need now
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-6 mt-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={twitterLogo} alt="Twitter" className="h-8" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={fbLogo} alt="Facebook" className="h-8" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={insLogo} alt="Instagram" className="h-8" />
                </a>
            </div>
        </div>
    );
};

export default Footer;
