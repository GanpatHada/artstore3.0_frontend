import React from "react";
import "./SubNav.css";
import { makeCapitalize } from "../../utils/GlobalUtils";
import PaintingCategories from "../../data/PaintingCategories.json";
import { useFilters } from "../../hooks/useFilters";
import { useLocation, useNavigate } from "react-router-dom";
const SubNav = () => {
  const { setCategoryFilter, removeCategoryFilter } = useFilters();
  const location = useLocation();
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
    if (location.pathname !== "/products") navigate("/products");
    PaintingCategories.forEach((painting) => {
      if(painting.name!==categoryName)
        removeCategoryFilter(painting.name)
    });
    setCategoryFilter(categoryName);
  };

  const handleAllClick=()=>{
    if (location.pathname !== "/products") navigate("/products");
     PaintingCategories.forEach((painting) => {
        removeCategoryFilter(painting.name)
    });
  }

  const handleSellOnArtstore=()=>{
    return navigate("/seller")
  }

  return (
    <section id="sub-nav">
      <li onClick={handleAllClick}>All</li>
      {PaintingCategories.map((painting) => {
        return (
          <li
            onClick={() => handleCategoryClick(painting.name)}
            key={painting.id}
          >
            {makeCapitalize(painting.name)}
          </li>
        );
      })}
      <li style={{color:'orange'}} onClick={handleSellOnArtstore}>Sell</li>
    </section>
  );
};

export default SubNav;
