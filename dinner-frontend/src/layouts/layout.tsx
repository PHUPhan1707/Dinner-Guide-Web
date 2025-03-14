import Footer from "@/pages/Homepage/Footer";
import Header from "@/pages/Homepage/Header";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="relative flex flex-col min-h-screen">
            {/* Header - Overlays Title */}
            <Header />

            {/* Main Content - Ensure no gap before footer */}
            <div className="flex-1 relative z-0">{children}</div>

            {/* Footer - Remove any gaps */}
            <Footer />
        </div>
    );
};

export default Layout;
