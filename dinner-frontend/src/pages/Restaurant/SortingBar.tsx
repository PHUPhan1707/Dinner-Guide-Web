import { useState } from "react";

interface SortingBarProps {
    setSortOption: (option: string) => void;
}

const SortingBar = ({ setSortOption }: SortingBarProps) => {
    const [selectedSort, setSelectedSort] = useState("newest");

    const handleSortChange = (sort: string) => {
        setSelectedSort(sort);
        setSortOption(sort);
    };

    return (
        <div className="flex items-center justify-between bg-[#d9d9d9] px-4 py-3 rounded-md">
            {/* Sorting options */}
            <div className="flex space-x-6 text-black text-lg font-semibold">
                {["newest", "near me", "saved"].map((sort) => (
                    <button
                        key={sort}
                        onClick={() => handleSortChange(sort)}
                        className={`px-6 py-1 rounded-md ${
                            selectedSort === sort ? "text-red-500 bg-white" : "hover:text-red-300"
                        }`}
                    >
                        {sort.charAt(0).toUpperCase() + sort.slice(1)}
                    </button>
                ))}
            </div>

            {/* Dropdowns for Category & District */}
            <div className="flex space-x-3">
                <select className="bg-white px-4 py-2 rounded-md text-black font-semibold">
                    <option>Category</option>
                    <option>Fast Food</option>
                    <option>Asian</option>
                    <option>Italian</option>
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
