import bg from "../assets/bg-home.png";

const Hero = () => {
    return (
        <div className="">
            <img
                src={bg}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
        </div>
    );
}
export default Hero;
