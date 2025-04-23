import AboutofUs from "@/pages/Homepage/AboutofUs";
import Carouse from "@/pages/Homepage/Carouse";
import DailyOffers from "@/pages/Homepage/DailyOffers";
import Feedback from "@/pages/Homepage/Feedback";
import Hero from "@/components/Hero";

const HomePage = () => {
    return (
        <div className="bg-[#1E2328] min-h-screen w-full">
            <Hero />
            <AboutofUs />
            <Carouse />
            <DailyOffers />
            <Feedback />
        </div>
    );
};

export default HomePage;
