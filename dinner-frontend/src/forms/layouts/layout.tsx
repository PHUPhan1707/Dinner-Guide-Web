import Footer from "@/pages/Homepage/Footer";
import Header from "@/pages/Homepage/Header";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
            <Header />
            
            <main className="flex-1 relative w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
