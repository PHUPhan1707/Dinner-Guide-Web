import React from "react";
import bgImage from "@/assets/bg2.png"; // Import background image

const DailyOffers = () => {
    return (
        <div className="relative flex items-center justify-end w-full h-screen bg-black px-36 py-12">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={bgImage}  
                    alt="Food Background"
                    className="w-full h-full object-cover opacity-40"
                />
            </div>

            {/* Content Block (Moved Right) */}
            <div className="relative z-10 text-white w-[45%]"> {/* Adjusted width and positioning */}
                {/* Section Title */}
                <h3 className="text-2xl text-yellow-400 font-bonheur">
                    From Our Reviewers
                </h3>
                <h2 className="text-5xl font-newsreader font-medium mt-2">
                    Try Our Daily Offers
                </h2>

                {/* Gold Line with Sparkle (Aligned Left) */}
                <div className="flex items-center mt-2">
                    <span className="text-yellow-400 text-xl">✦</span>
                    <div className="w-28 h-[2px] bg-yellow-400 ml-2"></div>
                </div>

                {/* Restaurant List (Aligned Left) */}
                <div className="mt-4 space-y-3">
                    <div>
                        <h4 className="text-2xl font-newsreader font-medium leading-tight">
                            Dookki Korea Buffet
                        </h4>
                        <p className="text-lg text-gray-300 font-inter italic text-right">
                            A Korean tteok-bokki buffet restaurant
                        </p>
                    </div>

                    <div>
                        <h4 className="text-2xl font-newsreader font-medium leading-tight">
                            Pizza 4P’s
                        </h4>
                        <p className="text-lg text-gray-300 font-inter italic text-right">
                            One of the best America pizza restaurants
                        </p>
                    </div>

                    <div>
                        <h4 className="text-2xl font-newsreader font-medium leading-tight">
                            Kungfu Wok
                        </h4>
                        <p className="text-lg text-gray-300 font-inter italic text-right">
                            American-styled Chinese food
                        </p>
                    </div>

                    <div>
                        <h4 className="text-2xl font-newsreader font-medium leading-tight">
                            Sugar Town
                        </h4>
                        <p className="text-lg text-gray-300 font-inter italic text-right">
                            A celebrity-made bakery with a fervid past
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyOffers;
