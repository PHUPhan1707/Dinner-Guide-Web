import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    email: z.string().email().optional(),

    username: z.string().min(3, "Name is required"),
    city: z.string().min(3, "City is required"),
    country: z.string().min(3, "Country is required"),
    address: z.string().min(3, "Address is required"),
    phone: z.string().min(3, "Phone is required"),
});

type UserFormData = z.infer<typeof formSchema>;

type Props = {

    onSave: (userProfile: UserFormData) => void;
    isLoading: boolean;


}

const UserProfileForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),

    });
    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(onSave)}
                className="space-y-4 bg-gray-50 rounded-lg md:p-10"
            >
                <div>
                    <h2 className="text-2xl font-bold">User Profile Form</h2>
                    <FormDescription>
                        Please fill in your information to update your profile.
                    </FormDescription>
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className="bg-white" />
                                </FormControl>
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
                                    <Input {...field} disabled className="bg-white" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className="bg-white" />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className="bg-white" />
                                </FormControl>
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
                                    <Input {...field} disabled className="bg-white" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className="bg-white" />
                                </FormControl>
                            </FormItem>
                        )}
                    />


                </div>
            </form>



        </div>
        </Form >


};

export default UserProfileForm;
