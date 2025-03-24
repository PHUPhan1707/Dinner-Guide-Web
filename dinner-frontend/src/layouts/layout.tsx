import Footer from "@/pages/Homepage/Footer";
import Header from "@/pages/Homepage/Header";


type Props = {
    children: React.ReactNode;

};

const Layout = ({ children }: Props) => {
    return (
        <div className="relative flex flex-col min-h-screen">
            <Header />

            <div className="flex-1 relative z-0 bg-[#1E2328]
            ">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
