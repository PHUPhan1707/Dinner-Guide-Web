import bg from "../assets/bg-home.png";

const Hero = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full border-8 border-yellow-500 -z-10">
            <img
                src={bg}
                alt="Background"
                className="w-full h-full object-cover opacity-95"
            />
        </div>
    );
};

export default Hero;