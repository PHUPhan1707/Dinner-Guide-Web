import UserProfileForm from "@/forms/user-profile-form";
import { Toaster } from "sonner";

const UserProfilePage = () => {
    return (
        <>
            <Toaster position="top-right" richColors />
            <UserProfileForm />
        </>
    );
};

export default UserProfilePage;
