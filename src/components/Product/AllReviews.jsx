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
    <div>
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
      <div className="w-full max-w-6xl mx-auto">
        <p className="text-xl mb-4"> Reviews : </p>
        {reviews.map((review, index) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="pb-6 mb-6 border-b border-gray-400 last:border-none last:mb-0 last:pb-0"
          >
            {/* ⭐ Rating */}
            <div className="flex items-center mb-2 gap-1">
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <FaStar key={i} className="text-black text-sm sm:text-base" />
                ) : (
                  <FaRegStar
                    key={i}
                    className="text-black text-sm sm:text-base"
                  />
                ),
              )}
            </div>

            {/* 👤 Name */}
            <h3 className="text-sm flex items-center gap-2 text-gray-800">
              <FiUser className="text-xl sm:text-3xl text-gray-500" />
              {review.name || "Anonymous"}
            </h3>

            {/* 📝 Title */}
            <p className="font-semibold text-sm sm:text-base mt-2 text-gray-700">
              {review.title || "No title provided"}
            </p>

            {/* 💬 Description */}
            <p className="text-sm text-black mt-1 leading-relaxed">
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
