import { useState, useEffect, useCallback } from 'react';
import { getRestaurantReviews } from '@/api/ReviewApi';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface User {
    id: number;
    username: string;
}

interface Review {
    id: number;
    userId: number;
    restaurantId: number;
    rating: number;
    comment: string | null;
    visitDate: string | null;
    createdAt: string;
    updatedAt: string;
    photos: string[];
    user: User;
}

interface ReviewsListProps {
    restaurantId: number | string;
    refreshTrigger: number;
}

const ReviewsList = ({ restaurantId, refreshTrigger }: ReviewsListProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Chuyển fetchReviews thành useCallback để tránh tạo lại hàm mỗi lần render
    const fetchReviews = useCallback(async () => {
        if (!restaurantId) {
            setError('ID nhà hàng không hợp lệ');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await getRestaurantReviews(restaurantId);

            if (!response || !response.data) {
                throw new Error('Dữ liệu không hợp lệ');
            }

            let reviewsData: Review[] = [];

            if (Array.isArray(response.data)) {
                reviewsData = response.data;
            } else if (response.data.reviews && Array.isArray(response.data.reviews)) {
                // Trường hợp API trả về một đối tượng có reviews là mảng
                reviewsData = response.data.reviews;
            } else {
                console.error('Unexpected response format:', response.data);
                throw new Error('Định dạng dữ liệu không hợp lệ');
            }

            // Kiểm tra và chuẩn hóa dữ liệu reviews
            const normalizedReviews = reviewsData.map(review => ({
                ...review,
                // Đảm bảo userId luôn có giá trị hợp lệ
                userId: review.userId || 0,
                // Đảm bảo rating luôn có giá trị hợp lệ từ 1-5
                rating: Math.min(Math.max(review.rating || 3, 1), 5),
                // Đảm bảo user luôn có giá trị
                user: review.user || { id: 0, username: 'Người dùng ẩn danh' },
                // Đảm bảo photos luôn là mảng
                photos: Array.isArray(review.photos) ?
                    review.photos.filter(url => url && typeof url === 'string') :
                    []
            }));

            setReviews(normalizedReviews);
        } catch (error: any) {
            console.error('Error fetching reviews:', error);
            setError('Không thể tải đánh giá');

            if (error.response?.status === 404) {
                toast.error('Không tìm thấy thông tin nhà hàng này!');
            } else if (error.response?.status >= 500) {
                toast.error('Lỗi máy chủ, vui lòng thử lại sau.');
            } else {
                toast.error('Không thể tải đánh giá. Vui lòng thử lại sau.');
            }

            setReviews([]);
        } finally {
            setLoading(false);
        }
    }, [restaurantId]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews, refreshTrigger]);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Không có ngày';

        try {
            return format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
        } catch (e) {
            return 'Không có ngày';
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-2 text-gray-500">Đang tải đánh giá...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
                <p className="text-orange-600">{error}</p>
                <button
                    onClick={fetchReviews}
                    className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    if (reviews.length === 0) {
        return (
            <div className="text-center py-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
                <p className="text-gray-500">Chưa có đánh giá nào. Hãy là người đánh giá đầu tiên!</p>
                <div className="mt-3 text-sm text-gray-500">
                    <span className="block">Viết đánh giá sẽ giúp người khác biết thêm về nhà hàng này.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold">
                            {review.user?.username || 'Người dùng ẩn danh'}
                        </div>
                        <div className="text-sm text-gray-500">
                            {review.visitDate && (
                                <span className="mr-2">Ghé thăm: {formatDate(review.visitDate)}</span>
                            )}
                            <span>Đánh giá: {formatDate(review.createdAt)}</span>
                        </div>
                    </div>

                    <div className="flex mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={star <= review.rating ? "currentColor" : "none"}
                                stroke={star <= review.rating ? "none" : "currentColor"}
                                className={`w-5 h-5 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"
                                    }`}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                    </div>

                    {review.comment && (
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                    )}

                    {review.photos && review.photos.length > 0 && (
                        <div className="mt-3">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {review.photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`Ảnh ${index + 1} từ ${review.user?.username || 'người dùng'}`}
                                        className="w-full h-24 object-cover rounded border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => window.open(photo, '_blank')}
                                        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150?text=Ảnh+lỗi")}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ReviewsList; 