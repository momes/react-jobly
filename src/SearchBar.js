import { useState } from "react";


/**SearchBar Component
 * 
 * Props: 
 * - search()
 * - initialSearchTerm ""
 * 
 * State:
 * - searchTerm: ""
 * 
 * JobList -> SearchBar
 * CompanyList -> SearchBar
 */
function SearchBar({ search, initialSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm);
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }
  return (
  <form className="SearchBar" onSubmit={handleSubmit}>
      <input 
        type="text"
        value={searchTerm}
        onChange={handleChange} 
        placeholder="Enter search term..."/>
      <button>Submit</button>
  </form>
  )
}

export default SearchBar;