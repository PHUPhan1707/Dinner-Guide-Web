import { useState, useEffect } from "react";
import { getUniqueCuisines } from "@/api/RestaurantApi";

interface SortingBarProps {
    setSortOption: (option: string) => void;
    setCuisineFilter: (cuisine: string | null) => void;
}

const SortingBar = ({ setSortOption, setCuisineFilter }: SortingBarProps) => {
    const [selectedSort, setSelectedSort] = useState("newest");
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCuisines = async () => {
            try {
                setLoading(true);
                const cuisinesList = await getUniqueCuisines();
                setCuisines(cuisinesList);
            } catch (error) {
                console.error("Error fetching cuisines:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCuisines();
    }, []);

    const handleSortChange = (sort: string) => {
        setSelectedSort(sort);
        setSortOption(sort);
    };

    const handleCuisineChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const cuisine = event.target.value;
        // If "Category" is selected, set cuisine filter to null
        setCuisineFilter(cuisine === "Category" ? null : cuisine);
    };

    return (
        <div className="flex items-center justify-between bg-[#d9d9d9] px-4 py-3 rounded-md">
            {/* Sorting options */}
            <div className="flex space-x-6 text-black text-lg font-semibold">
                {["newest", "near me", "saved"].map((sort) => (
                    <button
                        key={sort}
                        onClick={() => handleSortChange(sort)}
                        className={`px-6 py-1 rounded-md ${selectedSort === sort ? "text-red-500 bg-white" : "hover:text-red-300"
                            }`}
                    >
                        {sort.charAt(0).toUpperCase() + sort.slice(1)}
                    </button>
                ))}
            </div>

            {/* Dropdowns for Category & District */}
            <div className="flex space-x-3">
                <select
                    className="bg-white px-4 py-2 rounded-md text-black font-semibold"
                    onChange={handleCuisineChange}
                >
                    <option>Category</option>
                    {loading ? (
                        <option disabled>Loading...</option>
                    ) : (
                        cuisines.map((cuisine) => (
                            <option key={cuisine} value={cuisine}>
                                {cuisine}
                            </option>
                        ))
                    )}
                </select>

                <select className="bg-white px-4 py-2 rounded-md text-black font-semibold">
                    <option>District</option>
                    <option>Downtown</option>
                    <option>Suburbs</option>
                    <option>City Center</option>
                </select>
            </div>
        </div>
    );
};

export default SortingBar;
