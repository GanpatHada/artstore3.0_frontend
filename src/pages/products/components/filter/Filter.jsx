import React, { useContext } from "react";
import "./Filter.css";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import Slider from "@mui/material/Slider";
import { ProductContext } from "../../../../context/ProductContext";

const Filter = () => {
  const {
    state: { filters },
    dispatch,
  } = useContext(ProductContext);
  const categories = ["MADHUBANI", "WARLI", "PHAD", "MINIATURE"];
  const sortBy = [
    "PRICE_LOW_TO_HIGH",
    "PRICE_HIGH_TO_LOW",
    "TOP_RATINGS",
    "MAXIMUM_DISCOUNT",
  ];

  const setStars = (starCount) => {
    const showStars = [];
    for (let i = 0; i <= 4; i++) {
      if (i < starCount) showStars.push(<IoMdStar />);
      else showStars.push(<IoMdStarOutline />);
    }
    return showStars;
  };

  const handleCategoryChange = (category) => {
    if (filters.categories.includes(category))
      return dispatch({ type: "REMOVE_CATEGORY_FILTER", payload: category });
    return dispatch({ type: "SET_CATEGORY_FILTER", payload: category });
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

  const handlePriceRangeChange = (event, newValue) => {
    dispatch({type:"SET_PRICE_RANGE",payload:newValue});
  };

  const makeCapitalize = (value) => {
    let firstCapitalChar = value.slice(0, 1).toUpperCase();
    let remainingSmallValue = value.slice(1).toLowerCase();
    let capitalizeValue = firstCapitalChar.concat(remainingSmallValue);
    return capitalizeValue;
  };
  return (
    <div id="filter">
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

      <section id="customer-reviews">
        <h4>Customer Reviews</h4>
        {stars.map((star, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                name="customer-ratings"
                value={star.count}
                checked={filters.ratings === star.count}
                onChange={() =>
                  dispatch({
                    type: "SET_MINIMUM_RATING_FILTER",
                    payload: star.count,
                  })
                }
              />
              <label htmlFor="">
                {star.show.map((starShow, index) => {
                  return <i key={index}>{starShow}</i>;
                })}
              </label>
              {star.count < 5 && <span>& up</span>}
            </div>
          );
        })}
      </section>
      <section id="price-range-section">
        <h4>Price Range</h4>
        <h5>{`${filters.priceRange[0]} to ${filters.priceRange[1]}+`}</h5>
        <div id="price-range">
          <Slider
            getAriaLabel={() => "Minimum distance"}
            step={1000}
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="off"
            sx={{ color: "var(--secondary-color)" }}
            disableSwap
            min={0}
            max={10000}
          />
        </div>
      </section>
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
                onChange={() =>
                  dispatch({ type: "SET_SORT_BY", payload: item })
                }
              />
              <label htmlFor={item.toLowerCase()}>
                {makeCapitalize(item).replaceAll("_", " ")}
              </label>
            </div>
          );
        })}
      </section>
      <section id="clear-filter-section">
         <button id="clear-filter-btn" onClick={()=>dispatch({type:"CLEAR_FILTERS"})}>
            Clear Filter
         </button>
      </section>
    </div>
  );
};

export default Filter;
