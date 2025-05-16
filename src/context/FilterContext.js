import { createContext, useReducer } from "react";
import { filterReducer, initialFilterState} from "../reducers/FilterReducer";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer,initialFilterState);
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;