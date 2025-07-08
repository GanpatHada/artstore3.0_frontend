import { Slider } from "@mui/material";
import "./MobilePriceRangeFilter.css";
import { useFilters } from "../../../../../../hooks/useFilters";
const MobilePriceRangeFilter = () => {
  const { state: filters, setPriceRangeFilter } = useFilters();

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRangeFilter(newValue);
  };

  return (
    <section id="mobile-price-range-filter">
      <header>
        <h4>Price Range</h4>
      </header>
      <main>
        <h5>
          {`${filters.priceRange[0]} to ${filters.priceRange[1]}${
            filters.priceRange[1] === 10000 ? "+" : ""
          }`}
        </h5>

        <div id="price-selector">
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
      </main>
    </section>
  );
};

export default MobilePriceRangeFilter;
