import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { createReview } from '@/api/ReviewApi';
import { useNavigate } from 'react-router-dom';

interface ReviewFormProps {
    restaurantId: number | string;
    onReviewSubmitted: () => void;
}

const ReviewForm = ({ restaurantId, onReviewSubmitted }: ReviewFormProps) => {
    const navigate = useNavigate();
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [visitDate, setVisitDate] = useState<string>('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [photoUrls, setPhotoUrls] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // Kiểm tra đăng nhập mỗi khi component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handlePhotoUrlsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhotoUrls(e.target.value);
    };

    const handleAddPhotos = () => {
        if (photoUrls.trim()) {
            // Lọc URL hợp lệ (đảm bảo URL không trống và có định dạng đúng)
            const urls = photoUrls
                .split(',')
                .map(url => url.trim())
                .filter(url => {
                    try {
                        return url && url.startsWith('http');
                    } catch (e) {
                        return false;
                    }
                });

            if (urls.length > 0) {
                setPhotos(prev => [...prev, ...urls]);
                setPhotoUrls('');
            }
        }
    };

    const handleRemovePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const resetForm = () => {
        setRating(0);
        setComment('');
        setVisitDate('');
        setPhotos([]);

        try {
            const starButtons = document.querySelectorAll('.star-rating-button');
            starButtons.forEach(button => {
                button.classList.add('form-reset-flash');
                setTimeout(() => {
                    try {
                        button.classList.remove('form-reset-flash');
                    } catch (e) {
                        // Ignore errors if component unmounted
                    }
                }, 500);
            });
        } catch (e) {
            console.log('Animation error, ignoring');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            toast.error('Bạn cần đăng nhập để gửi đánh giá');
            setTimeout(() => {
                navigate('/auth');
            }, 1500);
            return;
        }

        if (rating === 0) {
            toast.error('Vui lòng chọn số sao đánh giá');
            return;
        }

        try {
            setIsSubmitting(true);

            // Chuẩn bị dữ liệu đánh giá, đảm bảo dữ liệu hợp lệ
            const reviewData = {
                restaurantId: Number(restaurantId) || restaurantId, // Chuyển về số nếu có thể
                rating,
                comment: comment.trim() || undefined,
                visitDate: visitDate || undefined,
                photos: photos.length > 0 ? photos.filter(url => url && url.trim() && url.startsWith('http')) : undefined,
            };

            const response = await createReview(reviewData);

            if (response && response.data) {
                toast.success('Đánh giá của bạn đã được gửi thành công!');
                resetForm();

                // Gọi callback để cập nhật danh sách đánh giá
                if (typeof onReviewSubmitted === 'function') {
                    onReviewSubmitted();
                }
            } else {
                throw new Error('Response không hợp lệ');
            }
        } catch (error: any) {
            console.error('Error submitting review:', error);
            if (error.response?.status === 401) {
                toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setTimeout(() => {
                    navigate('/auth');
                }, 1500);
            } else {
                toast.error(error.response?.data?.message || 'Không thể gửi đánh giá. Vui lòng thử lại sau.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Đánh giá của bạn</h3>

            {!isLoggedIn && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                    <p className="font-medium">Bạn cần đăng nhập để gửi đánh giá.</p>
                    <Button
                        className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white"
                        onClick={() => navigate('/auth')}
                    >
                        Đăng nhập ngay
                    </Button>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Xếp hạng
                    </label>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => handleStarClick(star)}
                                className="focus:outline-none star-rating-button transition-colors duration-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={star <= rating ? "currentColor" : "none"}
                                    stroke={star <= rating ? "none" : "currentColor"}
                                    className={`w-8 h-8 ${star <= rating ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Ngày đến thăm
                    </label>
                    <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Nhận xét
                    </label>
                    <Textarea
                        placeholder="Chia sẻ trải nghiệm của bạn..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[100px]"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Hình ảnh (Nhập URL, phân cách bằng dấu phẩy)
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={photoUrls}
                            onChange={handlePhotoUrlsChange}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddPhotos}
                            className="whitespace-nowrap"
                        >
                            Thêm
                        </Button>
                    </div>

                    {photos.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm font-semibold mb-1">Đã thêm {photos.length} hình ảnh:</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                                {photos.map((photo, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={photo}
                                            alt={`Ảnh ${index + 1}`}
                                            className="w-full h-20 object-cover rounded border border-gray-200"
                                            onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150?text=Link+ảnh+lỗi")}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePhoto(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                </Button>
            </form>

            <style>
                {`
                .form-reset-flash {
                    animation: flash-animation 0.5s;
                }
                
                @keyframes flash-animation {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); color: #f97316; }
                    100% { transform: scale(1); }
                }
                `}
            </style>
        </div>
    );
};

export default ReviewForm; 