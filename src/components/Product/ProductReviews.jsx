import { useState, useMemo, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createReview, fetchReview } from "../../redux/slice/reviewSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // ✅ productId

  const { reviews, loading, success, error } = useSelector(
    (state) => state.review,
  );

  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [reviewData, setReviewData] = useState({
    title: "",
    description: "",
    name: "",
    email: "",
  });

  const [files, setFiles] = useState([]);

  // ✅ Fetch reviews on load
  useEffect(() => {
    if (id) {
      dispatch(fetchReview(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      toast.success("Review submitted successfully!");
    }
    if (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to create review",
      );
    }
  }, [success, error]);

  // 📊 Stats
  const stats = useMemo(() => {
    const total = reviews.length;

    const average =
      total > 0
        ? (
            reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / total
          ).toFixed(1)
        : 0;

    const starCounts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => Number(r.rating) === star).length,
    }));

    return { total, average, starCounts };
  }, [reviews]);

  // file handler
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const withPreview = selectedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
    setFiles(withPreview);
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Submit Review
  const handleSubmit = () => {
    if (!rating || !reviewData.title || !reviewData.description) {
      toast.error("Please fill required fields");
      return;
    }

    const formData = new FormData();

    formData.append("product", id);
    formData.append("rating", rating);
    formData.append("title", reviewData.title);
    formData.append("description", reviewData.description);
    formData.append("name", reviewData.name);
    formData.append("email", reviewData.email);

    files.forEach((file) => {
      formData.append("images", file);
    });

    // dispatch(createReview(formData));
    dispatch(
      createReview({
        product: id,
        rating,
        title: reviewData.title,
        description: reviewData.description,
        name: reviewData.name,
        email: reviewData.email,
        images: [],
      }),
    );

    // reset
    setShowForm(false);
    setRating(0);
    setReviewData({
      title: "",
      description: "",
      name: "",
      email: "",
    });
    setFiles([]);
  };

  return (
    <div className="mx-auto px-5 py-10 text-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Customer Reviews</h2>

      {/* SUMMARY */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 relative pb-6">
        {/* LEFT */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-1/4 md:border-r md:border-gray-300 md:pr-10">
          <div className="text-5xl font-bold text-black">{stats.average}</div>

          <div className="flex items-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= Math.round(stats.average) ? (
                <FaStar key={star} className="text-yellow-400" />
              ) : (
                <FaRegStar key={star} className="text-yellow-400" />
              ),
            )}
          </div>

          <div className="text-gray-500 text-sm mt-1">
            {stats.total} Reviews
          </div>
        </div>

        {/* MIDDLE */}
        <div className="flex-1 w-full max-w-md md:border-r md:border-gray-300 md:pr-10 md:pl-10">
          {stats.starCounts.map(({ star, count }) => {
            const percentage =
              stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

            return (
              <div
                key={star}
                className="flex items-center gap-3 mb-2 text-sm text-gray-700 justify-center"
              >
                <div className="flex items-center w-14 justify-end">
                  <span>{star}</span>
                  <FaStar className="text-yellow-400 ml-1" />
                </div>

                <div className="relative w-48 h-3 bg-gray-200 rounded">
                  <div
                    className="absolute left-0 top-0 h-3 bg-yellow-400 rounded"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="w-16 text-left text-gray-500 text-xs">
                  {count} {count === 1 ? "review" : "reviews"}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/4 flex justify-center md:pl-10">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="w-60 mt-8 border-2 border-black bg-white text-black text-xs sm:text-sm py-2 px-4 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out hover:bg-black hover:text-white"
          >
            {showForm ? "Cancel Review" : "Write Review"}
          </button>
        </div>

        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" />
      </div>

      {/* FORM */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showForm ? "max-h-[1000px] opacity-100 mt-8" : "max-h-0 opacity-0"
        }`}
      >
        <div className="rounded-lg p-6 bg-gray-50">
          <h3 className="text-xl font-bold mb-4 text-center">Write a Review</h3>

          {/* Rating */}
          <div className="flex flex-col items-center mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Rating</p>

            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="border-2 border-black px-2 py-1 shadow-[3px_3px_0_0_#000]"
                >
                  {star <= (hover || rating) ? (
                    <FaStar className="text-yellow-400 text-2xl" />
                  ) : (
                    <FaRegStar className="text-yellow-400 text-2xl" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Review Title"
            value={reviewData.title}
            onChange={(e) =>
              setReviewData({ ...reviewData, title: e.target.value })
            }
            className="w-full px-5 py-2 bg-white text-black border-b-4 border-r-4 border-black rounded-xl"
          />

          {/* File */}
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-4 cursor-pointer border-b-4 border-r-4 px-5 py-2 bg-white text-black border-black"
          />

          {/* Preview */}
          {files.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
              {files.map((file, i) => (
                <div key={i} className="relative border rounded-lg group">
                  <img
                    src={file.preview}
                    alt=""
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleRemove(i)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <textarea
            rows={4}
            placeholder="Write your review..."
            value={reviewData.description}
            onChange={(e) =>
              setReviewData({ ...reviewData, description: e.target.value })
            }
            className="w-full mt-4 px-5 py-2 bg-white text-black border rounded-xl border-b-4 border-r-4 border-black focus:outline-none"
          />

          {/* Name */}
          <div className="flex gap-6 mb-4 mt-4">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={reviewData.name}
              onChange={(e) =>
                setReviewData({ ...reviewData, name: e.target.value })
              }
              className="w-full px-5 py-2 bg-white text-black border-b-4 border-r-4 border-black rounded-xl"
            />
            <input
              type="text"
              placeholder="Enter Your Email"
              value={reviewData.email}
              onChange={(e) =>
                setReviewData({ ...reviewData, email: e.target.value })
              }
              className="w-full px-5 py-2 bg-white text-black border-b-4 border-r-4 border-black rounded-xl"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center items-center gap-10">
            <button
              onClick={() => setShowForm(false)}
              className="mt-8 bg-white text-black border-2 border-black text-xs sm:text-sm py-2 px-4 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out"
            >
              Cancel Review
            </button>

            <button
              onClick={handleSubmit}
              className="mt-8 bg-white text-black border-2 border-black text-xs sm:text-sm py-2 px-4 shadow-[4px_4px_0_0_#000] transition-all duration-200 ease-out"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
