import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { getRestaurant } from "@/api/RestaurantApi";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";

interface RestaurantDetailType {
    id: number;
    name: string;
    coverImage: string;
    location: string;
    reviews: number;
    description: string;
    phone: string;
    email: string;
    openingHours: string;
    menu: {
        id: number;
        name: string;
        price: number;
        description: string;
        image: string;
    }[];
}

const RestaurantDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<RestaurantDetailType | null>(null);
    const [loading, setLoading] = useState(true);
    const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewsUpdating, setReviewsUpdating] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const fetchRestaurantDetail = async () => {
            try {
                setLoading(true);
                // Gọi API thực tế để lấy dữ liệu từ backend
                const response = await getRestaurant(id || "");
                const restaurantData = response.data;
                console.log('API Response:', restaurantData);

                // Mapping dữ liệu từ API vào state
                // Lưu ý: Điều chỉnh mapping này dựa trên cấu trúc API thực tế của bạn
                const formattedData: RestaurantDetailType = {
                    id: restaurantData.id,
                    name: restaurantData.name,
                    coverImage: restaurantData.coverImage || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
                    location: restaurantData.address,
                    reviews: Array.isArray(restaurantData.reviews) ? restaurantData.reviews.length :
                        (typeof restaurantData.reviews === 'number' ? restaurantData.reviews : 0),
                    description: restaurantData.description || "No description available",
                    phone: restaurantData.phone || "Not updated",
                    email: restaurantData.email || "contact@restaurant.com",
                    openingHours: `${restaurantData.openTime} - ${restaurantData.closeTime}` || "Not updated",
                    menu: Array.isArray(restaurantData.MenuItems) ? restaurantData.MenuItems.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        price: Number(item.price),
                        description: item.description || "",
                        image: item.imageUrl || "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071&auto=format&fit=crop"
                    })) : []
                };
                console.log('Formatted Data:', formattedData);

                setRestaurant(formattedData);

                // Đặt tiêu đề trang theo tên nhà hàng từ database
                document.title = `Restaurant - ${formattedData.name}`;

                setLoading(false);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
                toast.error("Could not load restaurant information");

                // Nếu lỗi, chuyển sang dùng dữ liệu mẫu (có thể bỏ phần này trong production)
                if (id) {
                    const mockData: RestaurantDetailType = {
                        id: Number(id),
                        name: "Restaurant " + id, // Tên từ API sẽ thay thế cái này
                        coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
                        location: "123 Street, City",
                        reviews: 45,
                        description: "A beautiful restaurant with amazing food and atmosphere. We serve the best dishes in town with fresh ingredients and unique recipes.",
                        phone: "+84 123 456 789",
                        email: "contact@restaurant.com",
                        openingHours: "9:00 AM - 10:00 PM",
                        menu: [
                            {
                                id: 1,
                                name: "Pasta Carbonara",
                                price: 150000,
                                description: "Classic Italian pasta with eggs, cheese, pancetta and black pepper",
                                image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071&auto=format&fit=crop"
                            },
                            {
                                id: 2,
                                name: "Beef Steak",
                                price: 250000,
                                description: "Premium beef steak grilled to perfection with vegetables",
                                image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop"
                            },
                            {
                                id: 3,
                                name: "Seafood Soup",
                                price: 180000,
                                description: "Fresh seafood soup with variety of seafood and herbs",
                                image: "https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?q=80&w=1974&auto=format&fit=crop"
                            }
                        ]
                    };
                    setRestaurant(mockData);
                }

                setLoading(false);
            }
        };

        if (id) {
            fetchRestaurantDetail();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingButton />
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="max-w-5xl mx-auto p-6 mt-8 text-center">
                <h2 className="text-2xl font-bold">Restaurant not found</h2>
                <Button className="mt-4" onClick={() => navigate("/")}>Back to Home</Button>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen">
            {/* Background image with 75% opacity overlay */}
            {restaurant.coverImage && (
                <>
                    <div
                        className="fixed inset-0 -z-10"
                        style={{
                            backgroundImage: `url(${restaurant.coverImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(5px)'
                        }}
                    />
                    <div className="fixed inset-0 bg-black/75 -z-10" />
                </>
            )}

            <div className="max-w-5xl mx-auto p-4 pt-16 mt-10 relative z-0">
                <div className="flex items-center mb-6">
                    <Button
                        variant="outline"
                        className="flex items-center gap-1 bg-white/90 text-gray-900 hover:bg-white"
                        onClick={() => navigate(-1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back
                    </Button>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                    <div className="h-80 overflow-hidden">
                        <img
                            src={restaurant.coverImage}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
                        <p className="text-gray-600 mt-2">{restaurant.location}</p>

                        <div className="flex items-center mt-4 text-gray-600">
                            <div className="mr-6">
                                <span className="font-semibold">Reviews:</span> {restaurant.reviews} reviews
                            </div>
                            <div className="mr-6">
                                <span className="font-semibold">Opening Hours:</span> {restaurant.openingHours}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                            <p><span className="font-semibold">Phone:</span> {restaurant.phone}</p>
                            <p><span className="font-semibold">Email:</span> {restaurant.email}</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <p className="text-gray-700">{restaurant.description}</p>
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold">Featured Menu</h2>
                                <Button
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                    onClick={() => setShowMenu(!showMenu)}
                                >
                                    {showMenu ? 'Hide Menu' : 'Show Menu'}
                                </Button>
                            </div>
                            {showMenu && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {restaurant.menu.map((item) => (
                                        <div key={item.id} className="bg-gray-50 rounded-lg overflow-hidden shadow">
                                            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                                <p className="text-orange-600 font-semibold mt-2">{item.price.toLocaleString('vi-VN')} VND</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-between">
                            <Button
                                variant="outline"
                                className="bg-white/90 hover:bg-white text-gray-900 border-gray-300"
                                onClick={() => window.open(`https://maps.google.com/?q=${restaurant.location}`, '_blank')}
                            >
                                View on Map
                            </Button>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                Book a Table
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-white">Customer Reviews</h2>
                        <Button
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                            onClick={() => setShowReviewForm(!showReviewForm)}
                        >
                            {showReviewForm ? 'Close' : 'Write a Review'}
                        </Button>
                    </div>

                    {showReviewForm && (
                        <div className="mb-6">
                            <ReviewForm
                                restaurantId={restaurant.id}
                                onReviewSubmitted={() => {
                                    try {
                                        // Hiển thị hiệu ứng cập nhật
                                        setReviewsUpdating(true);

                                        // Đóng form đánh giá với hiệu ứng trễ nhẹ
                                        setTimeout(() => {
                                            setShowReviewForm(false);
                                        }, 300);

                                        // Cập nhật danh sách đánh giá bằng cách tăng trigger
                                        setReviewRefreshTrigger(prev => prev + 1);

                                        // Tắt hiệu ứng cập nhật sau 1 giây
                                        setTimeout(() => {
                                            setReviewsUpdating(false);
                                        }, 1000);
                                    } catch (error) {
                                        console.error("Error updating reviews:", error);
                                        // Đảm bảo luôn tắt hiệu ứng loading nếu có lỗi
                                        setReviewsUpdating(false);
                                    }
                                }}
                            />
                        </div>
                    )}

                    <div className={`transition-opacity duration-300 ${reviewsUpdating ? 'opacity-50' : 'opacity-100'}`}>
                        <ReviewsList
                            restaurantId={restaurant.id}
                            refreshTrigger={reviewRefreshTrigger}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail; 