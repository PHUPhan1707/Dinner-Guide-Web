import bg from "@/assets/bg-home.png";
import { Link } from "react-router-dom";

const Title = () => {
    return (
        <div
            className="relative w-full min-h-screen flex flex-col items-center justify-center text-center -mt-6"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay to make text readable */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10"></div>

            {/* Subtitle */}
            <span className="text-lg md:text-xl text-white tracking-wide mb-2">
                FOOD REVIEWS CYCLES
            </span>

            {/* Main Heading */}
            <div
                className="font-bold text-white leading-tight"
                style={{
                    fontFamily: "Newsreader",
                    fontSize: "100px",
                    fontWeight: "500",
                }}
            >
                Taste The
                <span className="block -mt-8">Perspectives</span>
            </div>

            {/* Description */}
            <span className="text-lg md:text-xl text-white mt-3 max-w-2xl leading-relaxed">
                When the feelings get swayed and the decisions seem to unravel,
                <br />
                we come back here and try to see through people’s eyes.
            </span>

            {/* Button Wrapper with Longer Yellow Lines */}
            <div className="relative mt-8">
                {/* Top and Bottom Yellow Lines */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-64 md:w-80 h-[2px] bg-yellow-500"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-64 md:w-80 h-[2px] bg-yellow-500"></div>

                {/* Button */}
                <Link
                    to="/restaurant"
                    className="text-white font-semibold text-3xl md:text-4xl transition-all duration-300 hover:text-yellow-400"
                    style={{ fontFamily: "Newsreader" }}
                >
                    See the reviews
                </Link>
            </div>
        </div>
    );
};

export default Title;
