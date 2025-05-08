import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "@/api/UserApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    email: z.string().email().optional(),
    username: z.string().min(3, "Name is required"),
    city: z.string().optional(),
    country: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
});

type UserFormData = z.infer<typeof formSchema>;

const UserProfileForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            city: "",
            country: "",
            address: "",
            phone: "",
            currentPassword: "",
            newPassword: "",
        }
    });

    // Lấy thông tin profile khi component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setInitialLoading(true);
                console.log("Fetching user profile...");
                const response = await getUserProfile();
                console.log("User profile response:", response.data);
                const userData = response.data.user;

                if (userData) {
                    console.log("User data received:", userData);
                    form.reset({
                        email: userData.email || "",
                        username: userData.username || "",
                        city: userData.city || "",
                        country: userData.country || "",
                        address: userData.address || "",
                        phone: userData.phone || "",
                        currentPassword: "",
                        newPassword: "",
                    });
                } else {
                    console.error("User data is undefined or null");
                    toast.error("Could not load user data - No user data returned");
                }
            } catch (error: any) {
                console.error("Error fetching user profile:", error);
                let errorMessage = "Không thể lấy thông tin người dùng";

                if (error.response) {
                    console.error("Response status:", error.response.status);
                    console.error("Response data:", error.response.data);
                    errorMessage = `Error ${error.response.status}: ${error.response.data?.message || errorMessage}`;
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    errorMessage = "Server did not respond to the request";
                } else {
                    console.error("Error message:", error.message);
                    errorMessage = error.message || errorMessage;
                }

                toast.error(errorMessage);

                // Check if token is expired or invalid
                if (error.response?.status === 401 || error.response?.status === 403) {
                    toast.error("Your session may have expired. Please log in again.");
                    // Optional: redirect to login page
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }
            } finally {
                setInitialLoading(false);
            }
        };

        fetchUserProfile();
    }, [form, navigate]);

    const onSubmit = async (data: UserFormData) => {
        setIsSubmitting(true);

        setTimeout(async () => {
            setIsLoading(true);
            try {
                const updateData: any = {};
                Object.entries(data).forEach(([key, value]) => {
                    if (value && value.trim() !== "") {
                        updateData[key] = value;
                    }
                });

                const response = await updateUserProfile(updateData);
                toast.success("Cập nhật thông tin thành công!");

                if (updateData.username) {
                    localStorage.setItem("username", updateData.username);
                }
            } catch (error: any) {
                console.error("Lỗi khi cập nhật:", error);
                toast.error(error.response?.data?.message || "Lỗi khi cập nhật thông tin");
            } finally {
                setIsLoading(false);
                setIsSubmitting(false);
            }
        }, 500);
    };

    if (initialLoading) {
        return <div className="flex justify-center items-center h-96">
            <LoadingButton />
        </div>;
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 bg-gray-100 rounded-lg md:p-6 max-w-2xl mx-auto mt-24 shadow-lg border border-gray-200"
            >
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={() => navigate("/")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">User Profile Form</h2>
                    <FormDescription className="text-gray-600">
                        Please fill in your information to update your profile.
                    </FormDescription>
                </div>

                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} className="bg-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="border-t pt-4 mt-4">
                        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {isSubmitting || isLoading ?
                    <LoadingButton /> :
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Save</Button>
                }
            </form>
        </Form>
    );
};

export default UserProfileForm;
