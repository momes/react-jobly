import { useState } from "react";

function SearchBar({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm);
  }

  function handleChange(evt) {
    setSearchTerm(currSearchTerm => (evt.target.value));
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