import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import UsernameMenu from "./UsernameMenu";

const MainNav = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <div className="flex items-center">
            {isLoggedIn ? (
                <UsernameMenu />
            ) : (
                <Button
                    variant="ghost"
                    className="font-bold text-white hover:text-orange-500 hover:bg-black"
                    onClick={() => navigate("/auth")}
                >
                    Log In
                </Button>
            )}
        </div>
    );
};

export default MainNav;