import ptc1 from "../assets/recpic1.jpg";
import ptc2 from "../assets/recpic2.jpg";
import shoppeLogo from "../assets/logo-shopee.png";
import grabLogo from "../assets/logo-grab.png";
import beLogo from "../assets/logo-be.png";
import foodyLogo from "../assets/logo-foody.png";

const AboutofUs = () => {
    return (
        <div className="bg-gray-900 text-white py-12 px-6 relative flex flex-col items-center border-b-4 border-orange-500 
        pb-12">
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Carattere&family=Inter:wght@300;400;600&family=Newsreader:ital,wght@0,400;1,400&display=swap"
                rel="stylesheet"
            />

            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-center max-w-5xl w-full">
                {/* Left Image */}
                <div className="w-[350px] h-[600px] flex justify-center">
                    <img src={ptc1} alt="Food Review" className="w-full h-full object-cover" />
                </div>

                {/* Text Content */}
                <div className="md:w-1/2 w-full text-center flex flex-col items-center">
                    {/* Title and Subtitle */}
                    <p className="text-yellow-400 text-sm mb-2" style={{ fontFamily: "'Bonheur Royale', cursive" }}>
                        Reviewer Philosophy
                    </p>
                    <h2 className="text-5xl font-bold mb-3" style={{ fontFamily: "'Newsreader', serif" }}>
                        Reviewer’s Words
                    </h2>

                    {/* Yellow Line - Now Matches Title Width */}
                    <div className="flex items-center justify-center mb-3 w-full max-w-[380px]">
                        <div className="flex-grow h-[2px] bg-yellow-500"></div>
                        <span className="mx-2 text-yellow-500 text-xl">✦</span>
                        <div className="flex-grow h-[2px] bg-yellow-500"></div>
                    </div>

                    {/* Quote - One Line Only */}
                    <p
                        className="italic text-lg mb-5 max-w-[380px]"
                        style={{ fontFamily: "'Newsreader', serif", fontStyle: "italic" }}
                    >
                        "Food is our common ground, a universal experience."
                    </p>

                    {/* Paragraph - Width Matches Quote */}
                    <div
                        className="text-base leading-relaxed text-justify max-w-[380px]"
                        style={{ fontFamily: "'Inter', sans-serif", textAlign: "justify", textAlignLast: "center", }}
                    >
                        <p>
                            As a food reviewer, my philosophy is rooted in curiosity, honesty, and respect for the craft.
                            Every dish tells a story—of culture, technique, and passion—and it deserves to be appreciated
                            with an open mind. My goal is not just to critique but to understand and celebrate the effort
                            behind every plate. Whether it’s street food or fine dining, I seek to capture the essence of a
                            meal, offering insights that guide and inspire fellow food lovers.
                        </p>
                    </div>

                    {/* Reviewer Name - Opposite Tilt */}
                    <p
                        className="text-yellow-400 text-6xl font-medium mt-6 italic transform -rotate-6"
                        style={{ fontFamily: "'Carattere', cursive" }}
                    >
                        James Beard
                    </p>
                </div>

                {/* Right Image */}
                <div className="w-[350px] h-[600px] flex justify-center">
                    <img src={ptc2} alt="Food Review" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Logos Section */}
            <div className="mt-8 flex flex-wrap justify-between items-center w-full max-w-5xl mx-auto gap-15">
                <img src={shoppeLogo} alt="Shopee Logo" className="w-40 h-40 object-contain" />
                <img src={grabLogo} alt="Grab Logo" className="w-40 h-40 object-contain" />
                <img src={beLogo} alt="Be Logo" className="w-16 h-16 object-contain" />
                <img src={foodyLogo} alt="Foody Logo" className="w-40 h-40 object-contain" />
            </div>

        </div>
    );
};

export default AboutofUs;
