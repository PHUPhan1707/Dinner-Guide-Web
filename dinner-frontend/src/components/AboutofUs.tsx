import ptc1 from "../assets/picture1.png";
import shoppeLogo from "../assets/logo-shopee.png";
import beLogo from "../assets/logo-be.png";
import foodyLogo from "../assets/logo-foody.png";

const AboutofUs = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            {/* Phần nội dung giới thiệu ứng dụng */}
            <div className="flex flex-col md:flex-row items-center justify-center">
                {/* Hình minh họa bên trái */}
                <div className="md:w-1/4 w-full flex justify-center mb-8 md:mb-0">
                    <img src={ptc1} alt="Minh họa bên trái" className="w-full max-w-xs" />
                </div>
                {/* Đoạn giới thiệu ứng dụng */}
                <div className="md:w-1/2 w-full text-center px-4">
                    <h2 className="text-3xl font-bold mb-4">Giới thiệu Ứng Dụng</h2>
                    <p className="text-lg">
                        As a food reviewer, my philosophy is rooted in curiosity, honesty, and respect for the craft.  Every dish tells a story—of culture, technique, and passion—and it deserves to be appreciated with an open mind. My goal is not just to critique but to understand and celebrate the effort behind every plate. Whether it’s street food or fine dining, I seek to capture the essence of a meal, offering insights
                    </p>
                </div>
                {/* Hình minh họa bên phải */}
                <div className="md:w-1/4 w-full flex justify-center mt-8 md:mt-0">
                    <img src={ptc1} alt="Minh họa bên phải" className="w-full max-w-xs" />
                </div>
            </div>

            {/* Phần logo bên dưới */}
            <div className="mt-8 flex flex-row items-center justify-center space-x-8">
                <img src={shoppeLogo} alt="Logo Shopee" className="w-16 h-16 object-contain" />
                <img src={beLogo} alt="Logo Grab" className="w-16 h-16 object-contain" />
                <img src={foodyLogo} alt="Logo Foody" className="w-16 h-16 object-contain" />
            </div>
        </div>
    );
};

export default AboutofUs;
