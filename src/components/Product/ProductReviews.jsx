import { useState, useMemo, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createReview,
  fetchReview,
  resetReviewState,
} from "../../redux/slice/reviewSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // ✅ productId

  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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
      dispatch(resetReviewState());
    }
    if (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "You already reviewed this product.",
      );
    }
  }, [success, error, dispatch]);

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
    <div className="mx-auto px-5 py-12 text-center">
      <h2 className="text-3xl font-extrabold mb-8 tracking-wide">
        Customer Reviews
      </h2>

      {/* SUMMARY */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 relative pb-8">
        {/* LEFT */}
        <div className="flex flex-col items-center justify-center text-center w-full md:w-1/4 md:border-r md:border-gray-300 md:pr-10 transition-all duration-300 hover:scale-105">
          <div className="text-6xl font-extrabold text-black drop-shadow-sm">
            {stats.average}
          </div>

          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= Math.round(stats.average) ? (
                <FaStar key={star} className="text-yellow-400 animate-pulse" />
              ) : (
                <FaRegStar key={star} className="text-yellow-400" />
              ),
            )}
          </div>

          <div className="text-gray-500 text-sm mt-2 tracking-wide">
            {stats.total} Reviews
          </div>
        </div>

        {/* MIDDLE */}
        <div className="flex-1 w-full max-w-md md:border-r md:border-gray-300 md:px-10">
          {stats.starCounts.map(({ star, count }) => {
            const percentage =
              stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

            return (
              <div
                key={star}
                className="flex items-center gap-3 mb-3 text-sm text-gray-700 justify-center group"
              >
                <div className="flex items-center w-14 justify-end font-medium">
                  <span>{star}</span>
                  <FaStar className="text-yellow-400 ml-1" />
                </div>

                <div className="relative w-52 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-3 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-700 ease-out group-hover:scale-x-105 origin-left"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="w-20 text-left text-gray-500 text-xs">
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
            className="w-60 mt-8 border-2 border-black bg-white text-black text-sm py-2 px-4 shadow-[6px_6px_0_0_#000] transition-all duration-300 ease-out hover:bg-black hover:text-white hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            {showForm ? "Cancel Review" : "Write Review"}
          </button>
        </div>

        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black to-transparent opacity-40" />
      </div>

      {/* FORM */}
      <div
        className={`overflow-hidden transition-all duration-700 ease-in-out ${
          showForm
            ? "max-h-[1200px] opacity-100 mt-10 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
      >
        <div className="rounded-2xl p-8 shadow-xl backdrop-blur-md">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Write a Review
          </h3>

          {/* Rating */}
          <div className="flex flex-col items-center mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Rating</p>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="border-2 border-black px-3 py-2 rounded-lg shadow-[3px_3px_0_0_#000] transition-all duration-200 hover:scale-110 hover:bg-yellow-100"
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
            className="w-full px-5 py-3 bg-white/80 backdrop-blur-md text-black border border-gray-300 rounded-xl shadow-sm focus:outline-none transition-all duration-300 ease-in-out placeholder:text-gray-400 hover:shadow-md focus:shadow-lg focus:scale-[1.02]"
          />

          {/* File */}
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mt-5 w-full cursor-pointer border border-gray-300 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 transition-all duration-300 hover:shadow-md"
          />

          {/* Preview */}
          {files.length > 0 && (
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {files.map((file, i) => (
                <div
                  key={i}
                  className="relative border rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={file.preview}
                    alt=""
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <button
                    onClick={() => handleRemove(i)}
                    className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
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
            className="w-full mt-5 px-5 py-3 bg-white/80 backdrop-blur-md text-black border border-gray-300 rounded-xl focus:outline-none transition-all duration-300 ease-in-out placeholder:text-gray-400 hover:shadow-md focus:shadow-lg focus:scale-[1.02] resize-none"
          />

          {/* Name */}
          <div className="flex gap-6 mb-4 mt-5">
            {/* NAME INPUT */}
            <input
              type="text"
              placeholder="Enter Your Name"
              value={reviewData.name}
              onChange={(e) =>
                setReviewData({ ...reviewData, name: e.target.value })
              }
              className="w-full px-5 py-3 bg-white/80 backdrop-blur-md text-black border border-gray-300 rounded-xl focus:outline-none transition-all duration-300 ease-in-out placeholder:text-gray-400 hover:shadow-md focus:shadow-lg focus:scale-[1.02]"
            />

            {/* EMAIL INPUT + ERROR */}
            <div className="w-full flex flex-col">
              <input
                type="email"
                placeholder="Enter Your Email"
                value={reviewData.email}
                onChange={(e) => {
                  const value = e.target.value;
                  setReviewData({ ...reviewData, email: value });
                }}
                onBlur={() => {
                  setEmailTouched(true);

                  if (!validateEmail(reviewData.email)) {
                    setEmailError("Please enter a valid email...");
                  } else {
                    setEmailError("");
                  }
                }}
                className={`w-full px-5 py-3 bg-white/80 backdrop-blur-md text-black border rounded-xl focus:outline-none transition-all duration-300 ease-in-out placeholder:text-gray-400 hover:shadow-md focus:shadow-lg focus:scale-[1.02] ${
                  emailError && emailTouched
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {/* Error Message */}
              {emailError && emailTouched && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="mt-6 bg-white text-black border-2 border-black text-sm py-2 px-5 rounded-lg shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            >
              Cancel Review
            </button>

            <button
              onClick={handleSubmit}
              className="mt-6 bg-black text-white border-2 border-black text-sm py-2 px-5 rounded-lg shadow-[5px_5px_0_0_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
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
