import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';
import { createReview } from '@/api/ReviewApi';
import { uploadReviewImage } from '@/api/ImageApi';
import { useNavigate } from 'react-router-dom';

interface ReviewFormProps {
    restaurantId: number | string;
    onReviewSubmitted: () => void;
}

const ReviewForm = ({ restaurantId, onReviewSubmitted }: ReviewFormProps) => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [visitDate, setVisitDate] = useState<string>('');
    const [photos, setPhotos] = useState<string[]>([]);
    const [photoUrls, setPhotoUrls] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Check if user is logged in
        if (!isLoggedIn) {
            toast.error('Bạn cần đăng nhập để tải lên ảnh');
            setTimeout(() => {
                navigate('/auth');
            }, 1500);
            return;
        }

        setIsUploadingImage(true);

        try {
            // Upload each file
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append('image', file);

                const response = await uploadReviewImage(formData);

                if (response && response.data && response.data.imageUrl) {
                    setPhotos(prev => [...prev, response.data.imageUrl]);
                }
            }

            // Clear the file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error: any) {
            console.error('Error uploading images:', error);
            toast.error(error.response?.data?.message || 'Không thể tải lên ảnh. Vui lòng thử lại sau.');
        } finally {
            setIsUploadingImage(false);
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
        setPhotoUrls('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

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
                photos: photos.length > 0 ? photos : undefined,
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
                        Hình ảnh
                    </label>

                    <Tabs defaultValue="upload" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-2">
                            <TabsTrigger value="upload">Tải lên từ máy tính</TabsTrigger>
                            <TabsTrigger value="url">Thêm từ URL</TabsTrigger>
                        </TabsList>

                        <TabsContent value="upload">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="fileUpload"
                                    className={`flex items-center justify-center w-full h-24 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-orange-400 focus:outline-none ${isUploadingImage ? 'opacity-50' : ''}`}
                                >
                                    {isUploadingImage ? (
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 border-t-2 border-b-2 border-orange-500 rounded-full animate-spin"></div>
                                            <span className="mt-2 text-sm text-gray-600">Đang tải lên...</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            <span className="mt-2 text-base leading-normal text-gray-600">Chọn ảnh từ máy tính</span>
                                            <span className="mt-1 text-xs text-gray-500">PNG, JPG (tối đa 5MB)</span>
                                        </div>
                                    )}
                                </label>
                                <input
                                    ref={fileInputRef}
                                    id="fileUpload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                    disabled={isUploadingImage}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="url">
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
                            <p className="mt-1 text-xs text-gray-500">Nhập URL, phân cách bằng dấu phẩy nếu có nhiều ảnh</p>
                        </TabsContent>
                    </Tabs>

                    {photos.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm font-semibold mb-2">Đã thêm {photos.length} hình ảnh:</p>
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
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                            <span>Đang gửi...</span>
                        </div>
                    ) : (
                        "Gửi đánh giá"
                    )}
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