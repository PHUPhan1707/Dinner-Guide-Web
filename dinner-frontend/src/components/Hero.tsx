import bg from "../assets/bg-home.png";

const Hero = () => {
    return (
        <div className="w-full h-screen relative">
            {/* Background Image */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${bg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    transform: 'scale(1.5)',
                    transformOrigin: 'center center'
                }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
                <div className="w-full max-w-[90%] lg:max-w-[1400px] mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Taste The<br />Perspectives
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed">
                        When the feelings get swayed and the decisions seem to unravel,
                        we come back here and try to see through people's eyes.
                    </p>
                    <button className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg sm:text-xl font-bold py-3 px-8 rounded-full transition-colors transform hover:scale-105">
                        See the reviews
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;