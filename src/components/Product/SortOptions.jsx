import { FaSortAmountDown, FaChevronDown } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {

  const [searchParams, setSearchParams] = useSearchParams();
   

  const handelSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  }
  return (
    <div className="mb-6 flex items-center justify-end">
      <div className="relative inline-block w-72 mb-4">
        {/* Left Icon */}
        <FaSortAmountDown className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-lg" />

        {/* Select Box */}
        <select
          id="sort"
          className="w-full appearance-none pl-12 pr-10 py-3 bg-white text-gray-800 border border-gray-300 rounded-xl shadow-md focus:outline-none transition-all duration-300 ease-in-out cursor-pointer hover:bg-gradient-to-r hover:to-white hover:shadow-lg"
          onChange={handelSortChange}
          value={searchParams.get("sortBy") || ""}
        >
          <option value="">✨ Default</option>
          <option value="priceAsc">💸 Price: Low To High</option>
          <option value="priceDesc">💰 Price: High To Low</option>
          <option value="popularity">🔥 Popularity</option>
        </select>

        {/* Custom Arrow Icon */}
        <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none text-sm" />
      </div>
    </div>
  );
};

export default SortOptions;
