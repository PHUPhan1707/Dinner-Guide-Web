import { Link } from "react-router-dom";
import logo from "../assets/diningning-logo.png";
import bg from "../assets/Background1.png";

// Sample images. Replace these with your actual images.
import imgVision from "../assets/food2.jpg";
import imgForward from "../assets/food3.jpg";
import imgJourney from "../assets/food1.jpg";

const HomePage = () => {
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <div className="bg-gray-900 text-white">
            {/* HERO SECTION: Full-screen hero */}
            <div className="relative min-h-screen pt-20">
                {/* Hero background */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.95,
                    }}
                ></div>


                {/* Hero Content */}
                <div className="relative mt-60
                 z-20 flex flex-col items-center justify-center h-full">
                    <h1
                        className="text-8xl font-extrabold text-white mb-4"
                        style={{fontFamily: "Newsreader"}}
                    >
                        About us
                    </h1>

                    {/* Decorative element: yellow line with an icon */}
                    <div className="flex items-center justify-center mb-3 w-full max-w-[380px]">
                        <div className="flex-grow h-[2px] bg-yellow-500"></div>
                        <span className="mx-2 text-yellow-500 text-xl">✦</span>
                        <div className="flex-grow h-[2px] bg-yellow-500"></div>
                    </div>

                    <p className="text-gray-200 text-lg text-center px-4 max-w-2xl">
                        Helping locals and visitors discover the best dining experiences.
                    </p>
                </div>
            </div>

            {/* CONTENT SECTION BELOW HERO */}
            <section className="container mx-auto py-16 px-4">
                {/* Block 1: Title + line centered, paragraph left, image right */}
                <div className="flex flex-col md:flex-row md:items-center mb-16">
                    <div className="md:w-1/2 md:pr-8">
                        <div className="mb-4 text-center">
                            <h2 className="text-2xl font-bold inline-block" style={{ fontFamily: "Newsreader" }}>
                                A grand vision
                            </h2>
                            {/* Center the line with mx-auto */}
                            <div className="h-[2px] w-1/2 bg-yellow-400 mt-2 mx-auto"></div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Ho Chi Minh City's dynamic food scene blends bustling street stalls
                            with fine dining. Our guide curates the best eats, from hidden gems
                            to top restaurants, with expert recommendations, chef insights, and
                            foodie tips for every craving—whether it's a quick bánh mì, a comforting
                            phở, or an indulgent multi-course meal.
                        </p>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0">
                        <img
                            src={imgVision}
                            alt="A grand vision"
                            className="w-full h-80 object-cover rounded shadow"
                        />
                    </div>
                </div>

                {/* Block 2: Image left, Title + line centered, paragraph left */}
                <div className="flex flex-col md:flex-row-reverse md:items-center mb-16">
                    <div className="md:w-1/2 md:pl-8">
                        <div className="mb-4 text-center">
                            <h2 className="text-2xl font-bold inline-block" style={{ fontFamily: "Newsreader" }}>
                                A better way forward
                            </h2>
                            <div className="h-[2px] w-1/2 bg-yellow-400 mt-2 mx-auto"></div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            For the first time, a dedicated platform brings together honest reviews,
                            expert insights, and exclusive features, all tailored for those who seek
                            the most delightful meals in Ho Chi Minh City. With our guide, every meal
                            is an experience, every recommendation is a story, and every bite is a
                            journey into the heart of Vietnam’s dynamic food culture.
                        </p>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0">
                        <img
                            src={imgForward}
                            alt="A better way forward"
                            className="w-full h-80 object-cover rounded shadow"
                        />
                    </div>
                </div>

                {/* Block 3: Title + line centered, paragraph left, image right */}
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="md:w-1/2 md:pr-8">
                        <div className="mb-4 text-center">
                            <h2 className="text-2xl font-bold inline-block" style={{ fontFamily: "Newsreader" }}>
                                The journey continues
                            </h2>
                            <div className="h-[2px] w-1/2 bg-yellow-400 mt-2 mx-auto"></div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Our mission is simple: to help you eat better, discover new favorites,
                            and celebrate the incredible flavors of Ho Chi Minh City. Whether you’re
                            a local exploring new spots or a traveler seeking the city's best eats,
                            our guide is here to serve.
                        </p>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0">
                        <img
                            src={imgJourney}
                            alt="The journey continues"
                            className="w-full h-80 object-cover rounded shadow"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;