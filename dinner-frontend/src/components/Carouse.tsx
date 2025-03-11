import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import landingImage from "../assets/landing-image.png";
import ptc1 from "../assets/picture1.png";
import ptc2 from "../assets/picture2.png";
import ptc3 from "../assets/picture3.jpg";

const Carouse = () => {
    return (
        <div className="bg-black w-full py-12">
            {/* Title Section */}
            <div className="text-center text-white mb-8">
                <h3 className="text-lg font-[Bonheur Royale] italic text-yellow-400">
                    Enjoy Our Restaurants
                </h3>
                <h2 className="text-4xl font-[Newsreader] font-bold">
                    Welcome to the Heart of Reviewing
                </h2>
                {/* Aligned Line + Star */}
                <div className="flex justify-center items-center mt-2">
                    <hr className="border-t-2 border-yellow-500 w-48" />
                    <span className="text-yellow-500 mx-2">✦</span>
                    <hr className="border-t-2 border-yellow-500 w-48" />
                </div>
            </div>

            {/* Carousel Section */}
            <Carousel
                opts={{
                    align: "center",
                    loop: true,
                    containScroll: false, // Ensures smooth infinite scroll
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: false, // Keeps scrolling after interaction
                        stopOnMouseEnter: false, // Does not stop when hovering
                    }),
                ]}
                className="overflow-hidden px-6"
            >
                <CarouselContent className="flex">
                    {[landingImage, ptc1, ptc2, ptc3, landingImage].map((image, index) => (
                        <CarouselItem key={index} className="shrink-0 basis-[30%] mr-6">
                            <img
                                src={image}
                                className="w-full h-[250px] object-cover rounded-lg"
                                alt={`Slide ${index + 1}`}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Pagination Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-4 h-1 bg-gray-500 rounded-full"></div>
                ))}
            </div>
        </div>
    );
};

export default Carouse;
