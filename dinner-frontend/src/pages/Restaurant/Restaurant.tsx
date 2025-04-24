import { useEffect, useState } from "react";
import Title from "@/pages/Restaurant/ResTitle";
import SortingBar from "@/pages/Restaurant/SortingBar";
import CategoryFilter from "@/pages/Restaurant/CategoryFiller";
import RestaurantCards from "@/pages/Restaurant/RestaurantCards";
import { getAllRestaurants, Restaurant } from "@/api/RestaurantApi";

const RestaurantPage = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string>("newest");

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                const response = await getAllRestaurants();

                // Transform the API response to match our Restaurant type
                const formattedRestaurants = response.data.map((restaurant: Restaurant) => ({
                    id: restaurant.id,
                    name: restaurant.name,
                    image: restaurant.coverImage,
                    location: restaurant.address,
                    reviews: restaurant.ratingCount || 0,
                }));

                setRestaurants(formattedRestaurants);
                setError(null);
            } catch (err) {
                console.error("Error fetching restaurants:", err);
                setError("Failed to load restaurants. Please try again later.");

                // For development purposes, you can uncomment this to show sample data
                /*
                setRestaurants([
                    {
                        id: 1,
                        name: "Quán A",
                        image: "https://northwoodoffice-assets.imgix.net/goBallantyne/images/heroes/NORTHITALIA156-2.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-debug=&fp-x=0.4993&fp-y=0.7915&fp-z=1&h=1080&ixlib=php-3.1.0&q=80&v=1718293452&w=1920",
                        location: "Địa chỉ, quận, huyện, thành phố",
                        reviews: 293,
                    },
                ]);
                */
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#1E2328]">
            <div className="w-full bg-[#1E2328] pt-24">
                <Title />
                
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Sorting Bar & Category Filter in One Row */}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Category Filter */}
                        <div className="md:w-1/4">
                            <CategoryFilter setSelectedCategory={setSelectedCategory} />
                        </div>

                        {/* Sorting Bar & Restaurant Grid in Column */}
                        <div className="flex-1">
                            <SortingBar setSortOption={setSortOption} />

                            {/* Loading and Error states */}
                            {loading && (
                                <div className="text-center py-10">
                                    <p className="text-gray-300">Loading restaurants...</p>
                                </div>
                            )}

                            {error && !loading && (
                                <div className="text-center py-10">
                                    <p className="text-red-500">{error}</p>
                                </div>
                            )}

                            {/* Restaurant Cards */}
                            {!loading && !error && (
                                <RestaurantCards restaurants={restaurants} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantPage;
