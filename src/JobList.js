import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import SearchBar from "./SearchBar";

function JobList({ currentUser }) {
  const [isLoadingJobList, setIsLoadingJobList] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(function() {
    console.log("joblist use effect")
    async function getJobs() {
      try {
        let jobs = await JoblyApi.getJobs(query);
        setJobs(jobs);
        setIsLoadingJobList(false);
      } catch (err) {
        setError(err);
      }
    }
    getJobs();
  }, [query]);

  function search(searchTerm) {
    setQuery(searchTerm);
  }

  if (isLoadingJobList) {
    return (
      <h2>Loading</h2>
    )
  }

  return (
  <div className="JobList">
    <SearchBar search={search}/>
    <div className="JobList-list">
      {jobs.map(job => <JobCard job={job} currentUser={currentUser}/>)}
      </div>
    </div>
  );
}

export default JobList;
