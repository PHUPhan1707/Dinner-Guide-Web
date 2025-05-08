import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/diningning-logo.png";
import bg from "../assets/Background1.png";

// Sample images. Replace these with your actual images.
import imgVision from "../assets/food2.jpg";
import imgForward from "../assets/food3.jpg";
import imgJourney from "../assets/food1.jpg";

const HomePage = () => {
    const isLoggedIn = !!localStorage.getItem("token");
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show content after a small delay for a fade-in effect
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        // Handle scroll for parallax effects
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="bg-gray-900 text-white overflow-hidden">
            {/* HERO SECTION: Full-screen hero with parallax effect */}
            <div className="relative min-h-screen pt-20">
                {/* Hero background with parallax */}
                <div
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: `center ${scrollPosition * 0.2}px`,
                        opacity: isVisible ? 0.95 : 0,
                    }}
                ></div>

                {/* Decorative overlay patterns */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/70"></div>
                <div className="absolute inset-0" style={{
                    backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "50px 50px"
                }}></div>

                {/* Hero Content */}
                <div
                    className={`relative mt-60 z-20 flex flex-col items-center justify-center h-full transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <h1
                        className="text-8xl font-extrabold text-white relative -translate-y-10 transition-all duration-500"
                        style={{fontFamily: "Newsreader"}}
                    >
                        <span className="relative">
                            About us

                        </span>
                    </h1>

                    {/* Decorative element: yellow line with an icon */}
                    <div className="-translate-y-10 flex items-center justify-center mb-3 w-full max-w-[380px]">
                        <div className={`flex-grow h-[2px] bg-yellow-500 transition-all duration-1000 ${isVisible ? "w-full" : "w-0"}`}></div>
                        <span className={`mx-2 text-yellow-500 text-xl transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>✦</span>
                        <div className={`flex-grow h-[2px] bg-yellow-500 transition-all duration-1000 ${isVisible ? "w-full" : "w-0"}`}></div>
                    </div>

                    <p className=" -translate-y-10 text-gray-200 text-lg text-center px-4 max-w-2xl">
                        Helping locals and visitors discover the best dining experiences.
                    </p>

                    {/* Decorative scrolling indicator */}
                    <div className="relative flex flex-col items-center opacity-80 animate-bounce mt-28">
                        <span className="text-sm text-gray-300 mb-2">Explore More</span>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION BELOW HERO */}
            <section className="container mx-auto py-16 px-4 relative">
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-500 blur-3xl"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
                </div>

                {/* Block 1: Title + line centered, paragraph left, image right */}
                <div className="flex flex-col md:flex-row md:items-center mb-24 relative">
                    <div className="md:w-1/2 md:pr-12">
                        <div className="mb-6 text-center">
                            <h2 className="text-3xl font-bold inline-block relative" style={{ fontFamily: "Newsreader" }}>
                                A grand vision
                            </h2>
                            {/* Center the line with mx-auto */}
                            <div className="h-[2px] w-1/2 bg-yellow-400 mt-2 mx-auto"></div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Ho Chi Minh City's dynamic food scene blends bustling street stalls
                            with fine dining. Our guide curates the best eats, from hidden gems
                            to top restaurants, with expert recommendations, chef insights, and
                            foodie tips for every craving—whether it's a quick bánh mì, a comforting
                            phở, or an indulgent multi-course meal.
                        </p>

                        {/* Decorative quote */}
                        <div className="mt-6 pl-4 border-l-4 border-yellow-500">
                            <p className="italic text-gray-400">"Cuisine is the intersection of culture, history, and innovation."</p>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-30"></div>
                            <img
                                src={imgVision}
                                alt="A grand vision"
                                className="relative w-full h-80 object-cover rounded shadow hover:scale-[1.02] transition-transform duration-500"
                            />
                            {/* Decorative corner elements */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-500 -translate-x-2 -translate-y-2"></div>
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-yellow-500 translate-x-2 translate-y-2"></div>
                        </div>
                    </div>
                </div>

                {/* Block 2: Image left, Title + line centered, paragraph left */}
                <div className="flex flex-col md:flex-row-reverse md:items-center mb-24 relative">
                    <div className="md:w-1/2 md:pl-12">
                        <div className="mb-6 text-center">
                            <h2 className="text-3xl font-bold inline-block relative" style={{fontFamily: "Newsreader"}}>
                                A better way forward
                            </h2>
                            <div className="h-[2px] w-1/2 bg-yellow-400 mt-2 mx-auto"></div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            For the first time, a dedicated platform brings together honest reviews,
                            expert insights, and exclusive features, all tailored for those who seek
                            the most delightful meals in Ho Chi Minh City. With our guide, every meal
                            is an experience, every recommendation is a story, and every bite is a
                            journey into the heart of Vietnam's dynamic food culture.
                        </p>

                        {/* Feature highlights */}
                        <div className="mt-6 pl-4 border-l-4 border-yellow-500">
                            <p className="italic text-gray-400">"A dedicated platform for honest reviews, expert insights, and exclusive features, guiding you to the best dining experiences in Ho Chi Minh City."</p>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <div className="relative">
                            <div
                                className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-30"></div>
                            <img
                                src={imgForward}
                                alt="A better way forward"
                                className="relative w-full h-80 object-cover rounded shadow hover:scale-[1.02] transition-transform duration-500"
                            />
                            {/* Decorative pattern overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded"></div>

                            {/* Decorative corner elements */}
                            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-400 translate-x-2 -translate-y-2"></div>
                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-400 -translate-x-2 translate-y-2"></div>
                        </div>
                    </div>
                </div>

                {/* Block 3: Title + line centered, paragraph left, image right */}
                <div className="flex flex-col md:flex-row md:items-center relative">
                    <div className="md:w-1/2 md:pr-12">
                        <div className="mb-6 text-center">
                            <h2 className="text-3xl font-bold inline-block relative" style={{fontFamily: "Newsreader"}}>
                                The journey continues
                            </h2>
                            <div className="h-[2px] w-1/2 bg-yellow-400 mt-2 mx-auto"></div>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Our mission is simple: to help you eat better, discover new favorites,
                            and celebrate the incredible flavors of Ho Chi Minh City. Whether you're
                            a local exploring new spots or a traveler seeking the city's best eats,
                            our guide is here to serve.
                        </p>

                        <div className="mt-6 pl-4 border-l-4 border-yellow-500">
                            <p className="italic text-gray-400">"Our mission is to help you eat better and discover the best of Ho Chi Minh City's vibrant food scene, whether you're a local or a visitor."</p>
                        </div>

                        {/* Start Explor */}
                        <div className="mt-8">
                            <Link to="/restaurants"
                                  className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded transition-colors duration-300">
                                Start Exploring
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <div className="relative">
                            <div
                                className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-30"></div>
                            <img
                                src={imgJourney}
                                alt="The journey continues"
                                className="relative w-full h-80 object-cover rounded shadow hover:scale-[1.02] transition-transform duration-500"
                            />

                            {/* Decorative corner elements */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-green-400 -translate-x-2 -translate-y-2"></div>
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-400 translate-x-2 translate-y-2"></div>
                        </div>
                    </div>
                </div>

                {/* Decorative divider */}
                <div className="py-16 flex items-center justify-center">
                    <div className="w-full h-px bg-gray-700"></div>
                </div>



                {/* Join us section */}
                <div className="text-center relative">
                    <div className="absolute inset-0 bg-yellow-500/5 rounded-xl"></div>
                    <div className="relative p-12">
                        <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "Newsreader" }}>Join Our Food Journey</h3>
                        <p className="max-w-2xl mx-auto text-gray-300 mb-8">
                            Be part of our community and never miss out on the latest restaurant openings, special events, and culinary insights.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-6 py-3 bg-gray-800 rounded border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
                            />
                            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded transition-colors duration-300 w-full sm:w-auto">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;