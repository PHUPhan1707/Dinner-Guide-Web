import { useNavigate } from "react-router-dom";
import { Restaurant } from "@/api/RestaurantApi";

type Props = {
    restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden w-[300px] cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={handleCardClick}
        >
            <img
                src={restaurant.coverImage}
                alt={restaurant.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-500 text-base">{restaurant.address}</p>
                <div className="mt-2 flex items-center text-gray-600 text-base">
                    <span className="mr-2">💬 {restaurant.ratingCount} reviews</span>
                    {restaurant.cuisine && (
                        <span className="mr-2">🍽️ {restaurant.cuisine}</span>
                    )}
                    <span className="ml-auto text-sm">
                        {restaurant.openTime} - {restaurant.closeTime}
                    </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {restaurant.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">📞 {restaurant.phone}</span>
                    </div>
                    <button
                        className="px-3 py-1 border rounded hover:bg-gray-200 text-sm"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click event from bubbling to card
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
