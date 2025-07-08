import "./MobileFilter.css";
import { RxCross1 } from "react-icons/rx";
import MobileCategoriesFilter from "./components/mobile_categories_filter/MobileCategoriesFilter";
import filters from "../../../../data/filters.json";
import { useState } from "react";
import MobileCustomerReviewsFilter from "./components/mobile_customer_reviews_filter/MobileCustomerReviewsFilter";
import MobilePriceRangeFilter from "./components/mobile_price_range_filter/MobilePriceRangeFilter";
import MobileSortByFilter from "./components/mobile_sort_by_filter/MobileSortByFilter";
import { useFilters } from "../../../../hooks/useFilters";
import { getAppliedFilterCount, getAppliedFilters, isAnyFilterApplied } from "../../../../utils/FilterHelper";

const FilterContent = ({ selectedFilterType }) => {
  switch (selectedFilterType) {
    case "Categories":
      return <MobileCategoriesFilter />;

    case "Customer Reviews":
      return <MobileCustomerReviewsFilter />;

    case "Price Range":
      return <MobilePriceRangeFilter />;

    case "Sort By":
      return <MobileSortByFilter />;
  }
};

const MobileFilter = ({ closeMobileFilter }) => {
  const [selectedFilterType, setSelectedFilterType] = useState(filters[0].name);
  const {clearFilter,state}=useFilters();

  console.log(getAppliedFilters(state))

  return (
    <div id="mobile-filter-layover">
      <div id="mobile-filter">
        <header>
          <h2>Filters {getAppliedFilters(state).count>0&&<span>{getAppliedFilters(state).count}</span>}</h2>
          <button onClick={closeMobileFilter}>
            <RxCross1 />
          </button>
        </header>
        <main>
          <div id="filter-heading">
            {filters.map((filter, index) => (
              <button
                onClick={() => setSelectedFilterType(filter.name)}
                key={index}
                className={`${
                  selectedFilterType === filter.name && "selected"
                }`}
              >
                {filter.name}
                
              </button>
            ))}
          </div>
          <div id="filter-content">
            <FilterContent selectedFilterType={selectedFilterType} />
          </div>
        </main>
        <footer>
          <button onClick={clearFilter}>Clear Filters</button>
        </footer>
      </div>
    </div>
  );
};

export default MobileFilter;
