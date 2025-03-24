import AboutofUs from "@/pages/Homepage/AboutofUs";
import Carouse from "@/pages/Homepage/Carouse";
import DailyOffers from "@/pages/Homepage/DailyOffers";
import Feedback from "@/pages/Homepage/Feedback";
import Title from "@/pages/Homepage/Title";

type Props = {
    children: React.ReactNode;

};

const Layout = ({ children }: Props) => {
    return (
        <div>
            <div className="flex flex-col min-h-screen">

                <div className="container mx-auto flex-1">
                    {children}
                    <Title />
                    <AboutofUs />
                    <Carouse />
                    <DailyOffers />
                    <Feedback />
                </div>
            </div>
        </div>
    );
};

export default Layout;
