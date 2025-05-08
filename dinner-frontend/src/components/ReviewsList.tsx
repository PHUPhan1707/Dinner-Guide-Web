import { useState, useEffect, useCallback } from 'react';
import { getRestaurantReviews, deleteReview, updateReview } from '@/api/ReviewApi';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface User {
    id: number | string;
    username: string;
}

interface Review {
    id: number | string;
    UserId: string | number;
    userId: string | number; // For backward compatibility
    RestaurantId: number | string;
    restaurantId: number | string; // For backward compatibility
    rating: number;
    comment: string | null;
    content: string | null; // Backend might use content instead of comment
    visitDate: string | null;
    createdAt: string;
    updatedAt: string;
    photos: string[];
    user: User;
    User?: User; // Backend might return User (uppercase) instead of user (lowercase)
}

interface ReviewsListProps {
    restaurantId: number | string;
    refreshTrigger: number;
}

const ReviewsList = ({ restaurantId, refreshTrigger }: ReviewsListProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [reviewToDelete, setReviewToDelete] = useState<string | number | null>(null);
    const [currentUser, setCurrentUser] = useState<{ id: string | number | null, role?: string }>({ id: null });

    // Edit review state
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);
    const [editedComment, setEditedComment] = useState("");
    const [editedRating, setEditedRating] = useState(0);
    const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Get user ID from token payload (assuming JWT)
                const payload = JSON.parse(atob(token.split('.')[1]));
                setCurrentUser({
                    id: payload.id,
                    role: payload.role
                });
            } catch (error) {
                console.error("Error parsing token:", error);
                setCurrentUser({ id: null });
            }
        } else {
            setCurrentUser({ id: null });
        }
    }, []);

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

            // Log review data for debugging
            console.log('Raw review data:', reviewsData);

            // Kiểm tra và chuẩn hóa dữ liệu reviews
            const normalizedReviews = reviewsData.map(review => {
                // Debug logs for each review's user information
                console.log('Processing review:', {
                    id: review.id,
                    UserId: review.UserId,
                    userId: review.userId,
                    User: review.User,
                    user: review.user
                });

                // Extract user information with fallbacks
                const username = review.user?.username || review.User?.username || 'Người dùng ẩn danh';

                // Debug the user information we're using
                console.log('User information for review:', {
                    username,
                    id: review.user?.id || review.User?.id || review.UserId || review.userId
                });

                return {
                    ...review,
                    // Handle different field names
                    userId: review.UserId || review.userId || 0,
                    restaurantId: review.RestaurantId || review.restaurantId || 0,
                    // For content/comment field
                    comment: review.content || review.comment || "",
                    // Đảm bảo rating luôn có giá trị hợp lệ từ 1-5
                    rating: Math.min(Math.max(review.rating || 3, 1), 5),
                    // Ensure user is properly populated from either user or User property
                    user: {
                        id: review.user?.id || review.User?.id || review.UserId || review.userId || 0,
                        username: username
                    },
                    // Đảm bảo photos luôn là mảng
                    photos: Array.isArray(review.photos) ?
                        review.photos.filter(url => url && typeof url === 'string') :
                        []
                };
            });

            console.log('Normalized reviews:', normalizedReviews);
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

    // Handle delete review
    const handleDeleteReview = async (reviewId: string | number) => {
        try {
            await deleteReview(reviewId);
            toast.success("Đã xóa đánh giá thành công!");
            fetchReviews(); // Refresh the list
        } catch (error: any) {
            console.error("Error deleting review:", error);
            if (error.response?.status === 401) {
                toast.error("Bạn cần đăng nhập để thực hiện thao tác này");
            } else if (error.response?.status === 403) {
                toast.error("Bạn không có quyền xóa đánh giá này");
            } else {
                toast.error("Không thể xóa đánh giá. Vui lòng thử lại sau.");
            }
        }
    };

    // Open edit dialog
    const openEditDialog = (review: Review) => {
        setReviewToEdit(review);
        setEditedComment(review.comment || "");
        setEditedRating(review.rating);
        setEditDialogOpen(true);
    };

    // Handle saving edited review
    const handleSaveEdit = async () => {
        if (!reviewToEdit) return;

        setIsSubmittingEdit(true);
        try {
            await updateReview(reviewToEdit.id, {
                rating: editedRating,
                comment: editedComment
            });
            toast.success("Đã cập nhật đánh giá thành công!");
            setEditDialogOpen(false);
            fetchReviews(); // Refresh the list
        } catch (error: any) {
            console.error("Error updating review:", error);
            if (error.response?.status === 401) {
                toast.error("Bạn cần đăng nhập để thực hiện thao tác này");
            } else if (error.response?.status === 403) {
                toast.error("Bạn không có quyền chỉnh sửa đánh giá này");
            } else {
                toast.error("Không thể cập nhật đánh giá. Vui lòng thử lại sau.");
            }
        } finally {
            setIsSubmittingEdit(false);
        }
    };

    // Open delete confirmation dialog
    const openDeleteConfirm = (reviewId: string | number) => {
        setReviewToDelete(reviewId);
        setConfirmDelete(true);
    };

    // Confirm delete action
    const confirmDeleteAction = () => {
        if (reviewToDelete) {
            handleDeleteReview(reviewToDelete);
        }
        setConfirmDelete(false);
        setReviewToDelete(null);
    };

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
                        <div className="flex items-center">
                            <div className="text-sm text-gray-500 mr-2">
                                {review.visitDate && (
                                    <span className="mr-2">Ghé thăm: {formatDate(review.visitDate)}</span>
                                )}
                                <span>Đánh giá: {formatDate(review.createdAt)}</span>
                            </div>

                            {/* Edit and Delete buttons - only show for the review owner or admin */}
                            {(currentUser.id === review.userId || currentUser.role === 'admin') && (
                                <div className="flex space-x-2">
                                    {/* Edit button */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => openEditDialog(review)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </Button>

                                    {/* Delete button */}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => openDeleteConfirm(review.id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </Button>
                                </div>
                            )}
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

            {/* Edit Review Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa đánh giá</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Xếp hạng</label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setEditedRating(star)}
                                        className="focus:outline-none transition-colors duration-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill={star <= editedRating ? "currentColor" : "none"}
                                            stroke={star <= editedRating ? "none" : "currentColor"}
                                            className={`w-8 h-8 ${star <= editedRating ? "text-yellow-400" : "text-gray-300"}`}
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
                        <div>
                            <label className="block text-sm font-medium mb-2">Nhận xét</label>
                            <Textarea
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                                className="min-h-[100px]"
                                placeholder="Chia sẻ trải nghiệm của bạn..."
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setEditDialogOpen(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSaveEdit}
                            disabled={isSubmittingEdit}
                            className="bg-orange-500 hover:bg-orange-600"
                        >
                            {isSubmittingEdit ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang lưu...
                                </span>
                            ) : "Lưu thay đổi"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xóa đánh giá</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa đánh giá này? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteAction} className="bg-red-500 hover:bg-red-600">
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ReviewsList; 