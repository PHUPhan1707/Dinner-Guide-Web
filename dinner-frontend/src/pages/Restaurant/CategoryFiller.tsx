interface CategoryFilterProps {
    setSelectedCategory: (category: string | null) => void;
}

const CategoryFilter = ({ setSelectedCategory }: CategoryFilterProps) => {
    const handleCategoryClick = (category: string | null) => {
        setSelectedCategory(category);
    };

    return (
        <div className="w-64 bg-[#ffffff] text-white p-5 rounded-md mr-6">
            <h2 className="text-2xl font-bold mb-4 text-black">Discover</h2>
            <ul className="space-y-2 text-lg font-semibold">
                <li
                    className="cursor-pointer hover:text-gray-300 text-black "
                    onClick={() => handleCategoryClick("our-choices")}
                >
                    Our Choices
                </li>
                <li
                    className="cursor-pointer text-black hover:text-gray-300"
                    onClick={() => handleCategoryClick("best-rating")}
                >
                    Best Rating
                </li>
                <li
                    className="cursor-pointer text-black  hover:text-gray-300"
                    onClick={() => handleCategoryClick("fast-food")}
                >
                    Fast Food
                </li>
            </ul>
        </div>
    );
};

export default CategoryFilter;
