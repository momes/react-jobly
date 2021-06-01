import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import JoblyApi from "./api";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [isLoadingCompanyList, setIsLoadingCompanyList] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(function() {
    console.log("companylist use effect")
    async function getCompanies() {
      try {
        let companies = await JoblyApi.getCompanies(query);
        setCompanies(companies);
        setIsLoadingCompanyList(false);
      } catch (err) {
        setError(err);
      }
    }
    getCompanies();
  }, [query]);

  function search(searchTerm) {
    setQuery(searchTerm);
  }

  if (isLoadingCompanyList) {
    return (
      <h2>Loading</h2>
    )
  }

  return (
  <div className="CompanyList">
    <SearchBar search={search}/>
    <div className="CompanyList-list">
      {companies.map(company => <CompanyCard company={company}/>)}
      </div>
    </div>
  );
}

export default CompanyList;
