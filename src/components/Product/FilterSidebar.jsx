import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log("searchParams:", searchParams);

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    materials: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);

  // categories
  const categories = ["Top Wear", "Bottom Wear"];

  // genders
  const genders = ["Men", "Women"];

  // colors
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];

  // sizes
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // materials
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  // brnads
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      materials: params.materials ? params.materials.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handelFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key];
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.append(key, value.join(","));
        }
      } else if (
        value !== "" &&
        value !== null &&
        value !== undefined &&
        !(typeof value === "number" && isNaN(value))
      ) {
        // Only add if value is not empty string, null, undefined, or NaN
        params.append(key, value);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handelPriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(filters);
    updateURLParams(newFilters);
  }

  // console.log("Params:", searchParams);
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* CATEGORY FILTER */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">CATEGORY</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handelFilterChange}
              checked={filters.category === category}
              className="mr-2 h-4 w-4 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* GENDER FILTER */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">GENDER</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handelFilterChange}
              className="mr-2 h-4 w-4 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* COLOR FILTER */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">COLOR</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handelFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* SIZE FILTER */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">SIZE</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handelFilterChange}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 border-gray-300"
            />
            <span className="text-gray-700 ">{size}</span>
          </div>
        ))}
      </div>

      {/* MATERIALS FILTER */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          MATERIALS
        </label>
        {materials.map((materials) => (
          <div key={materials} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="materials"
              value={materials}
              onChange={handelFilterChange}
              checked={filters.materials.includes(materials)}
              className="mr-2 h-4 w-4 border-gray-300"
            />
            <span className="text-gray-700 ">{materials}</span>
          </div>
        ))}
      </div>

      {/* BRAND FILTER */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">BRANDS</label>
        {brands.map((brands) => (
          <div key={brands} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brands"
              value={brands}
              onChange={handelFilterChange}
              checked={filters.brand.includes(brands)}
              className="mr-2 h-4 w-4 border-gray-300"
            />
            <span className="text-gray-700 ">{brands}</span>
          </div>
        ))}
      </div>

      {/* PRICE RANGE FILTER */}

      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">
          PRICE RANGE
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handelPriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>₹0</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
