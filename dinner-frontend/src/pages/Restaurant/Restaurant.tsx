import { useEffect, useState } from "react";
import Title from "@/pages/Restaurant/ResTitle";
import SortingBar from "@/pages/Restaurant/SortingBar";
import CategoryFilter from "@/pages/Restaurant/CategoryFiller";
import RestaurantCards from "@/pages/Restaurant/RestaurantCards";

type Restaurant = {
    id: number;
    name: string;
    image: string;
    location: string;
    reviews: number;
};

const RestaurantPage = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // ✅ Specify the type here
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<string>("newest");

    useEffect(() => {
        fetch(`/api/restaurants?category=${selectedCategory || ""}&sort=${sortOption}`)
            .then((res) => res.json())
            .then((data: Restaurant[]) => {  // ✅ Explicitly type API response
                if (data.length === 0) {
                    // ✅ If no data, show a sample restaurant for testing
                    setRestaurants([
                        {
                            id: 1,
                            name: "Quán A",
                            image: "https://northwoodoffice-assets.imgix.net/goBallantyne/images/heroes/NORTHITALIA156-2.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-debug=&fp-x=0.4993&fp-y=0.7915&fp-z=1&h=1080&ixlib=php-3.1.0&q=80&v=1718293452&w=1920",
                            location: "Địa chỉ, quận, huyện, thành phố",
                            reviews: 293,
                        },
                    ]);
                } else {
                    setRestaurants(data);
                }
            })
            .catch((err) => {
                console.error(err);
                // ✅ Even if there's an error, show a sample restaurant
                setRestaurants([
                    {
                        id: 1,
                        name: "Quán A",
                        image: "https://northwoodoffice-assets.imgix.net/goBallantyne/images/heroes/NORTHITALIA156-2.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-debug=&fp-x=0.4993&fp-y=0.7915&fp-z=1&h=1080&ixlib=php-3.1.0&q=80&v=1718293452&w=1920",
                        location: "Địa chỉ, quận, huyện, thành phố",
                        reviews: 293,
                    },
                ]);
            });
    }, [selectedCategory, sortOption]);


    return (
        <div className="container bg-[#1e2328] mx-auto px-4 py-6">
            <Title />

             {/* Sorting Bar & Category Filter in One Row */}
             <div className="flex items-start space-x-1">
                {/* Category Filter */}
                <CategoryFilter setSelectedCategory={setSelectedCategory} />

                {/* Sorting Bar & Restaurant Grid in Column */}
                <div className="flex-1">
                    <SortingBar setSortOption={setSortOption} />
                    
                    {/* Restaurant Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                        <RestaurantCards restaurants={restaurants} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantPage;
