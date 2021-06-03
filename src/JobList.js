import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import SearchBar from "./SearchBar";
import Error from "./Error";

/** JobList component
 * 
 * Props:
 * - currentUser {}
 * 
 * State:
 * - isLoadingJobList: boolean
 * - jobs: []
 * - errors: null or []
 * - searchTerm: ""
 * 
 * Routes -> JobList -> SearchBar
 *                   -> JobCard
 */
function JobList({ currentUser, addJobApp }) {

  console.log("joblist rendered");
  const [isLoadingJobList, setIsLoadingJobList] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(function setJobsOrError() {
    console.log("joblist use effect")
    async function fetchJobs() {
      try {
        let jobs = await JoblyApi.getJobs(searchTerm);
        console.log("jobs is", jobs);
        setJobs(jobs);
        setIsLoadingJobList(false);
      } catch (err) {
        setErrors(err);
        setIsLoadingJobList(false);
      }
    }
    fetchJobs();
  }, [searchTerm]);

  function search(searchTerm) {
    setIsLoadingJobList(true);
    setSearchTerm(searchTerm);
    setIsLoadingJobList(false);
  }

  if (isLoadingJobList) {
    return (
      <h2>Loading...</h2>
    )
  }

  return (
    <div className="JobList">
      {errors && errors.map(e => <Error error={e} />)}
      <SearchBar search={search} initialSearchTerm={searchTerm} />
      {jobs.length > 0
        ? jobs.map(job => <JobCard
                              key={job.id}
                              job={job}
                              currentUser={currentUser}
                              addJobApp={addJobApp}
                              showCompany={true} />)
        : <p>No results found.</p>}
      </div>
  );
}

export default JobList;
