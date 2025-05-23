import RestaurantCard from "./RestaurantCard";

type Props = {
    restaurants: {
        id: number;
        name: string;
        image: string;
        location: string;
        reviews: number;
    }[];
};

const RestaurantCards = ({ restaurants }: Props) => {
    if (!restaurants || restaurants.length === 0) {
        return <p className="text-center text-gray-500 mt-6">No restaurants found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default RestaurantCards;
