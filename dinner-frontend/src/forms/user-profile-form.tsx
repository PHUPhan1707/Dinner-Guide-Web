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
                const response = await getUserProfile();
                const userData = response.data.user;

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
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
                toast.error("Không thể lấy thông tin người dùng");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchUserProfile();
    }, [form]);

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
                className="space-y-4 bg-gray-100 rounded-lg md:p-10 max-w-3xl mx-auto mt-40 shadow-lg border border-gray-200"
            >
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">User Profile Form</h2>
                    <FormDescription className="text-gray-600">
                        Please fill in your information to update your profile.
                    </FormDescription>
                </div>

                <div className="space-y-4">
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
