import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";

/** CompanyDetail
 * 
 * Props:
 * State:
 * 
 * App --> NavBar, Routes --> CompanyList --> CompanyCard --> CompanyDetail
 */

function CompanyDetail({ currentUser, addJobApp }) {

  const [company, setCompany] = useState({});
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [error, setError] = useState(null);


  const { handle } = useParams();
  console.log("companydetail thinks param is", handle);
  console.log("company is", company);

  useEffect(function () {
    console.log("company use effect")
    async function getCompany() {
      try {
        let company = await JoblyApi.getCompany(handle);
        setCompany(company);
        setIsLoadingCompany(false);
      } catch (err) {
        setError(err);
      }
    }
    getCompany();
  }, [handle]);

  if (isLoadingCompany) {
    return (
      <h2>Loading</h2>
    )
  }


  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      {company.jobs.map(job => <JobCard
        currentUser={currentUser}
        job={job}
        addJobApp={addJobApp}
      />)}
    </div>
  );
}

export default CompanyDetail;


//