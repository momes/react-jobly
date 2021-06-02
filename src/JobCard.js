import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import './CompanyCard.css';
import JoblyApi from "./api";

/**
 * 
 * 
 * 
 */
function JobCard({ currentUser, job }) {
  const [hasApplied, setHasApplied] = useState()// something in here
  const [errors, setErrors] = useState([]);// something in here

  console.log("Jobcard component cur user prop --->", currentUser);
  console.log("Jobcard component cur user applications --->", (currentUser.applications).includes(job.id));
  useEffect( function () {
    async function applyToJob() {
      if (hasApplied) {
        try {
          console.log("username,jobid",currentUser.username, job.id)
        let applyResult = await JoblyApi.applyToJob(currentUser.username, job.id);
        console.log("applied to job---->", applyResult);
        //setIsLoadingCompany(false);
      } catch (err) {
        setErrors(err);
        setHasApplied(false);
      }
      }
      }
      
      applyToJob();
  }, [hasApplied]);

  function handleApply(evt) {
    setHasApplied(true);
  }

  return (
    <div className="JobCard">
      <Card className="JobCard-card">
        <Card.Title className="justify-content-between text-left">
          <b>{job.title}</b>
        </Card.Title>
        <Card.Body className="text-left">
          <p>Salary: {job.salary}</p>
          <p>Equity: {job.equity}</p>
          {hasApplied ? <Button disabled>Applied</Button> : <Button onClick={handleApply}>Apply</Button>}
        </Card.Body>
      </Card>
    </div>
  );

}

export default JobCard;