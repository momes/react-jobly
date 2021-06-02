import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import Error from "./Error";

/** CompanyDetail
 * 
 * Props:
 * - currentUser {}
 * - addJobApp()
 * 
 * State:
 * - company {}
 * - isLoadingCompany boolean
 * - error null or []
 * 
 * Routes --> CompanyDetail
 */

function CompanyDetail({ currentUser, addJobApp }) {

  const [company, setCompany] = useState({});
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [errors, setErrors] = useState(null);

  const { handle } = useParams();
  console.log("companydetail thinks param is", handle);
  console.log("company is", company);

  useEffect(function setCompanyOrError() {
    console.log("company use effect")
    async function fetchCompany() {
      try {
        let company = await JoblyApi.getCompany(handle);
        setCompany(company);
        setIsLoadingCompany(false);
      } catch (err) {
        setErrors(err);
      }
    }
    fetchCompany();
  }, [handle]);

  if (isLoadingCompany) {
    return (
      <h2>Loading</h2>
    )
  }

  return (
    <div className="CompanyDetail">
      {errors && errors.map(e => <Error error={e}/>)}
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

