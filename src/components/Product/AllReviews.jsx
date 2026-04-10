// import { FaRegStar, FaStar } from "react-icons/fa";
// import { FiUser } from "react-icons/fi";
// // import { useGetReviewByProductId } from "../../api/review/service";

// const AllReviews = () => {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//   } = useGetReviewByProductId();

//   const allReviews = data?.pages?.flatMap((page) => page?.reviews || []) || [];

//   return (
//     <div className="max-w-lvw mx-auto px-10 py-10 dark:bg-black dark:text-white">
//       <h2 className="text-2xl font-bold text-center mb-6">All Reviews</h2>

//       {/* Loading */}
//       {isLoading && (
//         <p className="text-center text-gray-500">
//           Products All Reviews Loading Please Wait !
//         </p>
//       )}

//       {/* Error */}
//       {isError && (
//         <p className="text-center text-red-500">Failed to load reviews.</p>
//       )}

//       {/* Empty */}
//       {allReviews.length === 0 && !isLoading && (
//         <p className="text-center text-gray-500">No reviews yet.</p>
//       )}

//       {/* Reviews */}
//       <div className="space-y-3">
//         {allReviews.map((review) => (
//           <div key={review._id} className="border-b border-gray-600 p-5">
//             {/* ⭐ Rating */}
//             <div className="flex items-center mb-2 gap-1.5">
//               {[...Array(5)].map((_, i) =>
//                 i < review.rating ? (
//                   <FaStar key={i} className="text-yellow-400 text-lg" />
//                 ) : (
//                   <FaRegStar key={i} className="text-yellow-400 text-lg" />
//                 ),
//               )}
//             </div>

//             {/* 👤 Name */}
//             <h3 className="text-lg flex items-center gap-3 dark:text-gray-200">
//               <FiUser className="text-3xl" />
//               {review.name || "Anonymous"}
//             </h3>

//             {/* 📝 Title */}
//             <p className="font-bold text-lg mt-2 dark:text-gray-300">
//               {review.title || "No title provided"}
//             </p>

//             {/* 💬 Description */}
//             <p className="leading-relaxed dark:text-gray-300">
//               {review.description}
//             </p>

//             {/* 🖼 Images */}
//             {review.images && review.images.length > 0 && (
//               <div className="flex gap-2 mt-3">
//                 {review.images.map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt="review"
//                     className="w-20 h-20 rounded-md object-cover border"
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Load More */}
//       {hasNextPage && (
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={() => fetchNextPage()}
//             disabled={isFetchingNextPage}
//             className="px-4 py-2 border-2 border-black bg-white text-black 
//                        text-sm shadow-[4px_4px_0_0_#000] 
//                        hover:translate-x-[2px] hover:translate-y-[2px] 
//                        hover:shadow-none transition 
//                        dark:bg-black dark:text-white dark:border-white 
//                        dark:shadow-[4px_4px_0_0_#fff]"
//           >
//             {isFetchingNextPage ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllReviews;
