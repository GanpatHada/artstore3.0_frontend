import "./MobileCategoriesFilter.css";
import filters from "../../../../../../data/filters.json";
import { useFilters } from "../../../../../../hooks/useFilters";
import { makeCapitalize } from "../../../../../../utils/GlobalUtils";
import { RxCross1 } from "react-icons/rx";
const MobileCategoriesFilter = () => {
  const categories = filters.find((filter) => filter.name === "Categories");
  const { state: appliedFilters, removeCategoryFilter, setCategoryFilter } = useFilters();

  const selectedCategories = appliedFilters.categories;

  const isCategorySelected = (category) =>
    selectedCategories.includes(category);

  const handleCategorySelection = (category) => {
    if (isCategorySelected(category))
      return removeCategoryFilter(category)
    return setCategoryFilter(category)
  }

  return (
    <section id="mobile-categories-filter">
      <header>
        <h4>Categories</h4>
      </header>
      <main>
        {categories.options.map((category) => {
          return (
            <div
              onClick={() => handleCategorySelection(category)}
              className={`category ${isCategorySelected(category) && "selected"}`}
              key={category}
            >{isCategorySelected(category) && <span className="all-centered"><RxCross1 /></span>}
              {makeCapitalize(category)}
            </div>
          );
        })}
      </main>

    </section>
  );
};

export default MobileCategoriesFilter;
