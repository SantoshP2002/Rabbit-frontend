import { useEffect } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReview } from "../../redux/slice/reviewSlice";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AllReviews = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { reviews, loading, error } = useSelector((state) => state.review);

  useEffect(() => {
    if (id) {
      dispatch(fetchReview(id));
    }
  }, [dispatch, id]);

  return (
    <div className="w-full px-3 sm:px-6 lg:px-10 py-8 sm:py-10 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8"
      >
        All Reviews
      </motion.h2>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse">
          Loading reviews...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-500">Failed to load reviews.</p>
      )}

      {/* Empty */}
      {reviews.length === 0 && !loading && (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}

      {/* Reviews List */}
      <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border hover:shadow-lg transition"
          >
            {/* ⭐ Rating */}
            <div className="flex items-center mb-2 gap-1">
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <FaStar
                    key={i}
                    className="text-yellow-400 text-sm sm:text-base"
                  />
                ) : (
                  <FaRegStar
                    key={i}
                    className="text-yellow-400 text-sm sm:text-base"
                  />
                ),
              )}
            </div>

            {/* 👤 Name */}
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-gray-800">
              <FiUser className="text-xl sm:text-2xl text-gray-500" />
              {review.name || "Anonymous"}
            </h3>

            {/* 📝 Title */}
            <p className="font-semibold text-sm sm:text-base mt-2 text-gray-700">
              {review.title || "No title provided"}
            </p>

            {/* 💬 Description */}
            <p className="text-sm sm:text-base text-gray-600 mt-1 leading-relaxed">
              {review.description}
            </p>

            {/* 🖼 Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="review"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border flex-shrink-0 hover:scale-105 transition"
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
