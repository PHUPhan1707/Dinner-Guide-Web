import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"


import landingImgage from "../assets/landing-image.png";
import ptc1 from "../assets/picture1.png";
import ptc2 from "../assets/picture2.png";
import ptc3 from "../assets/picture3.jpg";



const Carouse = () => {
    return (
        <div className="bg-black w-full h-100">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 3000
                    }),
                ]}
            >
                <CarouselContent>
                    <CarouselItem className="basis-1/3 flex justify-center items-center">
                        <img
                            src={landingImgage}
                            style={{
                                width: "75%",
                                height: "75%",
                                objectFit: "cover",
                            }}
                        />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3 flex justify-center items-center">
                        <img
                            src={ptc1}
                            style={{
                                width: "75%",
                                height: "75%",
                                objectFit: "cover",
                            }}
                        />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3 flex justify-center items-center">
                        <img
                            src={ptc2}
                            style={{
                                width: "75%",
                                height: "75%",
                                objectFit: "cover",
                            }}
                        />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3 flex justify-center items-center">
                        <img
                            src={ptc3}
                            style={{
                                width: "75%",
                                height: "75%",
                                objectFit: "cover",
                            }}
                        />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3 flex justify-center items-center">
                        <img
                            src={landingImgage}
                            style={{
                                width: "75%",
                                height: "75%",
                                objectFit: "cover",
                            }}
                        />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3 flex justify-center items-center">
                        <img
                            src={ptc1}
                            style={{
                                width: "75%",
                                height: "75%",
                                objectFit: "cover",
                            }}
                        />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default Carouse;
