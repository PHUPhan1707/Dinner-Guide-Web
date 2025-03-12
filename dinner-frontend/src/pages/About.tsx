import food1 from "../assets/food1.jpg";
import food2 from "../assets/food2.jpg";
import food3 from "../assets/food3.jpg";
import backgroundImage from "../assets/Background1.png";
import logo from "../assets/logo-be.png";

const AboutUs = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <header
                className="relative"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '95vh'
                }}
            >
                {/* Lớp phủ màu xám đậm ánh xanh */}
                <div className="absolute inset-0" style={{backgroundColor: '#0F172A', opacity: 0.8}}></div>

                <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-10 py-8 text-2xl">
                    <img src={logo} alt="Logo" className="h-20"/>
                    <ul className="flex space-x-40">
                        <li className="hover:text-yellow-400 cursor-pointer font-bold">Home</li>
                        <li className="hover:text-yellow-400 cursor-pointer font-bold">About</li>
                        <li className="hover:text-yellow-400 cursor-pointer font-bold">Restaurant</li>
                        <li className="hover:text-yellow-400 cursor-pointer font-bold">Contact</li>
                        <li className="hover:text-yellow-400 cursor-pointer font-bold">Sign in</li>
                    </ul>
                </nav>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-8xl font-extrabold text-white" style={{fontFamily: 'Newsreader'}}>About us</h1>
                    <p className="text-gray-400 text-lg">
                        Helping locals and visitors discover the best dining experiences.
                    </p>
                </div>
            </header>


            <section className="bg-[#0F172A] max-w-full mx-auto py-12 px-6 text-white">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">A grand vision</h2>
                        <p className="text-gray-300 text-xl leading-relaxed">
                            Ho Chi Minh City's dynamic food scene blends bustling street stalls with fine dining. Our guide curates the best eats, from hidden gems to top restaurants, with expert recommendations, chef insights, and foodie tips for every craving—whether it's a quick bánh mì, a comforting phở, or an indulgent multi-course meal.
                        </p>
                    </div>
                    <img src={food1} alt="Street dining" className="rounded-2xl shadow-lg w-full"/>
                </div>

                <div className="grid md:grid-cols-2 gap-16 mt-16">
                    <img src={food2} alt="Fine dining" className="rounded-2xl shadow-lg w-full"/>
                    <div>
                        <h2 className="text-4xl font-bold mb-6">A better way forward</h2>
                        <p className="text-gray-300 text-xl leading-relaxed">
                            For the first time, a dedicated platform brings together honest reviews, expert insights, and exclusive features, all tailored for those who seek the most delightful meals in Ho Chi Minh City.
                            With our guide, every meal is an experience, every recommendation is a story, and every bite is a journey into the heart of Vietnam’s dynamic food culture.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-16 mt-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">The journey continues</h2>
                        <p className="text-gray-300 text-xl leading-relaxed">
                            Our mission is simple: to help you eat better, discover new favorites, and celebrate the incredible flavors of Ho Chi Minh City. Whether you’re a local exploring new spots or a traveler seeking the city's best eats, our guide is here to serve.
                        </p>
                    </div>
                    <img src={food3} alt="City night view" className="rounded-2xl shadow-lg w-full"/>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
