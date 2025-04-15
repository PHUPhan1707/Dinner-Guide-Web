type Props = {
    restaurant: {
        id: number;
        name: string;
        image: string;
        location: string;
        reviews: number;
    };
};

const RestaurantCard = ({ restaurant }: Props) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-[300px]"> 
            <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-48 object-cover" 
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                <p className="text-gray-500 text-base">{restaurant.location}</p>
                <div className="mt-2 flex items-center text-gray-600 text-base">
                    <span className="mr-2">💬 {restaurant.reviews}</span>
                    <button className="ml-auto px-3 py-1 border rounded hover:bg-gray-200">
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
