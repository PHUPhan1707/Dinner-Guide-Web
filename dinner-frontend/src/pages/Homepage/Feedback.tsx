import React from "react";
import avatar1 from "@/assets/profile1.png";
import avatar2 from "@/assets/profile2.png";

const Feedback = () => {
    return (
        <section className="bg-[#1E2328] text-white py-20 w-full">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 flex flex-col lg:flex-row justify-between items-center gap-12">
                {/* Left Section */}
                <div className="max-w-lg">
                    <h3 className="text-yellow-400 font-bonheur text-2xl">Feedback</h3>
                    <h2 className="text-5xl font-[Newsreader] font-medium leading-tight mt-2">
                        Read Incredible Stories <br /> of Our Guest
                    </h2>
                    <div className="flex items-center mt-4">
                        <span className="text-yellow-400 text-3xl">✦</span>
                        <div className="w-48 h-[3px] bg-yellow-400 ml-3"></div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col lg:flex-row gap-8 w-full lg:w-auto">
                    {/* Feedback Box 1 */}
                    <div className="border border-yellow-400 p-8 w-full lg:w-96 text-lg relative rounded-lg">
                        {/* Quotation Mark */}
                        <span className="absolute font-newsreader -top-4 left-4 text-yellow-400 text-5xl bg-[#1E2328] px-2">"</span>
                        <p className="italic text-base leading-relaxed">
                            <span className="font-bold">The Rustic Table</span> – Cozy, home-style
                            comfort with a gourmet touch. The slow-braised short ribs were
                            melt-in-your-mouth perfection, and the warm ambiance made for a relaxing meal.
                        </p>
                        <div className="flex items-center mt-6">
                            <img src={avatar1} alt="Marylin Monroe" className="w-14 h-14 rounded-full" />
                            <div className="ml-4">
                                <p className="font-[Newsreader] text-xl font-medium">Marylin Monroe</p>
                                <p className="text-lg italic text-yellow-400">Travel Blogger</p>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Box 2 */}
                    <div className="border border-yellow-400 p-8 w-full lg:w-96 text-lg flex flex-col justify-between relative rounded-lg">
                        {/* Quotation Mark */}
                        <span className="absolute font-newsreader -top-4 left-4 text-yellow-400 text-5xl bg-[#1E2328] px-2">"</span>
                        <p className="italic text-base leading-relaxed">
                            <span className="font-bold">Ember & Thyme</span> – A fusion of elegance
                            and bold flavors. The seared scallops with miso butter were divine, and the
                            charred citrus duck was beautifully balanced.
                        </p>
                        <div className="flex items-center mt-6">
                            <img src={avatar2} alt="Sophia Lin" className="w-14 h-14 rounded-full" />
                            <div className="ml-4">
                                <p className="font-[Newsreader] text-xl font-medium">Sophia Lin</p>
                                <p className="text-lg italic text-yellow-400">Culinary Journalist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;