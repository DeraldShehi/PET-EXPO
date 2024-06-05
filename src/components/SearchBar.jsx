import { FaSearch } from "react-icons/fa";

const SearchBar = ({ wordEntered, setWordEntered }) => {
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Search..."
        value={wordEntered}
        onChange={handleFilter}
      />
      <div className="searchIcon">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;
