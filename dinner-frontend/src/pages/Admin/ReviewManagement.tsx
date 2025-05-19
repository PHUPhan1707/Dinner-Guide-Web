import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getAllRestaurants } from '../../api/RestaurantApi';
import { getRestaurantReviews, deleteReview } from '../../api/ReviewApi';

interface User {
    id: string;
    username: string;
    email?: string;
    avatar?: string;
}

interface Review {
    id: string;
    content: string;
    rating: number;
    UserId: string;
    RestaurantId: string;
    photos?: string[];
    createdAt: string;
    user?: User;
}

interface Restaurant {
    id: string;
    name: string;
    coverImage?: string;
}

const ReviewManagement: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [reviewsByRestaurant, setReviewsByRestaurant] = useState<Record<string, Review[]>>({});
    const [loading, setLoading] = useState(false);

    const fetchAllReviews = async () => {
        setLoading(true);
        try {
            const res = await getAllRestaurants();
            const restaurantList: Restaurant[] = res.data || [];
            setRestaurants(restaurantList);
            const reviewsObj: Record<string, Review[]> = {};
            await Promise.all(
                restaurantList.map(async (r) => {
                    try {
                        const reviewRes = await getRestaurantReviews(r.id);
                        reviewsObj[r.id] = reviewRes.data || [];
                    } catch {
                        reviewsObj[r.id] = [];
                    }
                })
            );
            setReviewsByRestaurant(reviewsObj);
        } catch (err) {
            setRestaurants([]);
            setReviewsByRestaurant({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllReviews();
    }, []);

    const handleDeleteReview = async (reviewId: string) => {
        try {
            await deleteReview(reviewId);
            // Sau khi xóa thành công, cập nhật lại danh sách review
            await fetchAllReviews();
        } catch (error) {
            console.error('Lỗi khi xóa review:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">All User Reviews</h2>
                {loading ? (
                    <div>Loading reviews...</div>
                ) : (
                    <div className="space-y-8">
                        {restaurants.length === 0 ? (
                            <div>No restaurants found.</div>
                        ) : (
                            restaurants.map(r => (
                                <div key={r.id} className="bg-zinc-100 rounded-lg p-4 shadow">
                                    <h3 className="text-xl font-semibold mb-2 text-black">{r.name}</h3>
                                    {reviewsByRestaurant[r.id] && reviewsByRestaurant[r.id].length > 0 ? (
                                        <div className="space-y-4">
                                            {reviewsByRestaurant[r.id].map(review => (
                                                <div key={review.id} className="bg-white rounded shadow p-4">
                                                    <div className="flex items-center mb-2">
                                                        <span className="font-semibold mr-2">{review.user?.username || 'Anonymous'}</span>
                                                        <span className="text-yellow-500">{Array(review.rating).fill('★').join('')}</span>
                                                        <span className="ml-2 text-gray-500 text-xs">{new Date(review.createdAt).toLocaleString()}</span>
                                                        <button
                                                            onClick={() => handleDeleteReview(review.id)}
                                                            className="ml-auto bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                    <div className="mb-2">{review.content}</div>
                                                    {review.photos && review.photos.length > 0 && (
                                                        <div className="flex space-x-2 mt-2">
                                                            {review.photos.map((url, idx) => (
                                                                <img key={idx} src={url} alt="review" className="w-16 h-16 object-cover rounded" />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-gray-500">No reviews for this restaurant.</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ReviewManagement; 