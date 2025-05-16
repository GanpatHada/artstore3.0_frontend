import React, { useState } from "react";
import "./Filter.css";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import Slider from "@mui/material/Slider";
import { useFilters } from "../../../../hooks/useFilters";
import { makeCapitalize } from "../../../../utils/GlobalUtils";

const CategoryFilter = () => {
  const {
    state: filters,
    setCategoryFilter,
    removeCategoryFilter,
  } = useFilters();
  const categories = ["MADHUBANI", "WARLI", "PHAD", "MINIATURE"];

  

  const handleCategoryChange = (category) => {
    if (!filters.categories.includes(category))
      return setCategoryFilter(category);
    return removeCategoryFilter(category);
  };

  return (
    <section>
      <h4>Categories</h4>
      {categories.map((category, index) => {
        return (
          <div key={index}>
            <input
              type="checkbox"
              value={category}
              checked={filters.categories.includes(category)}
              id={category.toLowerCase()}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category.toLowerCase()}>
              {makeCapitalize(category)}
            </label>
          </div>
        );
      })}
    </section>
  );
};

const RatingsFilter = () => {
  const { state: filters, setMinimumRatingFilter } = useFilters();

  const setStars = (starCount) => {
    const showStars = [];
    for (let i = 0; i <= 4; i++) {
      if (i < starCount) showStars.push(<IoMdStar color={"var(--primary-color)"} />);
      else showStars.push(<IoMdStarOutline />);
    }
    return showStars;
  };

  const stars = [
    {
      count: 5,
      show: setStars(5),
    },
    {
      count: 4,
      show: setStars(4),
    },
    {
      count: 3,
      show: setStars(3),
    },
    {
      count: 2,
      show: setStars(2),
    },
    {
      count: 1,
      show: setStars(1),
    },
  ];

  
  return (
    <section id="customer-reviews">
      <h4>Customer Reviews</h4>
      {stars.map((star, index) => {
        return (
          <div key={index}>
            <input
              id={index.toString()}
              type="radio"
              name="customer-ratings"
              value={star.count}
              checked={filters.ratings === star.count}
              onChange={() => setMinimumRatingFilter(star.count)}
            />
            <label htmlFor={index.toString()}>
              {star.show.map((starShow, index) => {
                return <i key={index}>{starShow}</i>;
              })}
            </label>
            {star.count < 5 && <span>& up</span>}
          </div>
        );
      })}
    </section>
  );
};

const PriceRangeFilter = () => {
  const { state: filters, setPriceRangeFilter } = useFilters();
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeFilter(newValue);
  };

  return (
    <section id="price-range-section">
      <h4>Price Range</h4>
      <h5>{`${filters.priceRange[0]} to ${filters.priceRange[1]}+`}</h5>
      <div id="price-range">
        <Slider
          getAriaLabel={() => "Minimum distance"}
          step={1000}
          value={filters.priceRange}
          onChange={handlePriceRangeChange}
          sx={{ color: "var(--secondary-color)" }}
          disableSwap
          min={0}
          max={10000}
        />
      </div>
    </section>
  );
};

const SortByFilter = () => {
  const { state: filters, setSortByFilter } = useFilters();
  const sortBy = [
    "PRICE_LOW_TO_HIGH",
    "PRICE_HIGH_TO_LOW",
    "TOP_RATINGS",
    "MAXIMUM_DISCOUNT",
  ];
  return (
    <section id="sort-by-section">
      <h4>Sort by</h4>
      {sortBy.map((item, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              name="sort-by"
              id={item.toLowerCase()}
              checked={filters.sortBy === item}
              onChange={() => setSortByFilter(item)}
            />
            <label htmlFor={item.toLowerCase()}>
              {makeCapitalize(item).replaceAll("_", " ")}
            </label>
          </div>
        );
      })}
    </section>
  );
};

const ClearFilter = () => {
  const{clearFilter}=useFilters()
  return (
    <section id="clear-filter-section">
      <button
        id="clear-filter-btn"
        onClick={clearFilter}
      >
        Clear Filter
      </button>
    </section>
  );
};

const Filter = () => {
  return (
    <div id="filter">
      <CategoryFilter />
      <RatingsFilter />
      <PriceRangeFilter />
      <SortByFilter />
      <ClearFilter />
    </div>
  );
};

export default Filter;
