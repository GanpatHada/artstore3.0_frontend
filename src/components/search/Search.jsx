import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import { useFilters } from "../../hooks/useFilters";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useRef, useState } from "react";

const searchTypes = ["All", "Title", "Category", "Price"];

const SearchType = ({ searchRef,setFocused }) => {
  const {
    state: { searchType },
    setSearchType,
  } = useFilters();

  const handleChange = (event) => {
    setSearchType(event.target.value);
    setFocused(true)
    setTimeout(() => {
      searchRef.current?.focus(); 
    }, 0);
  };

  return (
    <Select
      id="search-type"
      value={searchType}
      onChange={handleChange}
      inputProps={{ "aria-label": "Without label" }}
      sx={{
        backgroundColor: "lightgray",
        borderRadius: "0px",
        borderTopLeftRadius: "0.4rem",
        borderBottomLeftRadius: "0.4rem",
        borderRight: "1px solid gray",
        fontSize: "0.8rem",
        color:"#4a4a4a",
        "&:hover": {
          backgroundColor:"#c2c2c2",
          color:"black"
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          borderRadius: "0px",
        },
        
      }}
    >
      {searchTypes.map((searchType, index) => {
        return (
          <MenuItem key={index} value={searchType.toUpperCase()}>
            {searchType}
          </MenuItem>
        );
      })}
    </Select>
  );
};

const Search = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [focused,setFocused]=useState(false)
  const {
    state: { searchText },
    setSearchText,
  } = useFilters();
  return (
    <section id="search-box" style={{boxShadow:`${focused?"0 0 3px 3px orange":""}`}} onClick={() => navigate("/products")}>
      <SearchType searchRef={searchRef} setFocused={setFocused} />
      <input
        ref={searchRef}
        onFocus={()=>setFocused(true)}
        onBlur={()=>setFocused(false)}
        type="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search in Artstore"
      />
      {/* <button id="search">
        <BsSearch />
      </button> */}
    </section>
  );
};

export default Search;
