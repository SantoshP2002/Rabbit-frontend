import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilters,
  setFilter,
} from "../../redux/slice/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(true);
    document.querySelector(".navbar")?.classList.add("hidden"); // Hide navbar
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
    document.querySelector(".navbar")?.classList.remove("hidden"); // Show navbar
  };

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilter({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isOpen
          ? "fixed top-0 left-0 w-full h-20 bg-white z-50 flex items-center justify-center px-4"
          : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="w-full max-w-3xl relative flex items-center"
          //   SEARCH INPUT
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full bg-gray-100 px-4 py-3 border shadow-md focus:outline-none text-lg placeholder:text-gray-600"
          />

          {/* SEARCH ICON */}
          <button
            type="submit"
            className="absolute right-12 text-gray-600 hover:text-black"
          >
            <HiMagnifyingGlass className="h-6 w-6" />
          </button>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-2 text-gray-600 hover:text-black"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button
          className="flex items-center justify-center"
          onClick={handleSearchToggle}
        >
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
