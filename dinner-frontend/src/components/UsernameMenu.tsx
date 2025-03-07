import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
const UsernameMenu = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.reload(); // Tải lại trang để cập nhật giao diện
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500">
                <CircleUserRound className="text-orange-500 w-6 h-6" />
                {username && <span className="ml-2">{username}</span>}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-md rounded-md p-2">
                <DropdownMenuItem>
                    <Link to="/user-profile" className="font-bold hover:text-orange-500"> User Profile</Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Button onClick={handleLogout} className="flex flex-1 font-bold bg-orange-500">Logout</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UsernameMenu;
