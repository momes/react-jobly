import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import './CompanyCard.css';
import JoblyApi from "./api";
import './JobCard.css'

/**
 * 
 * 
 * 
 */
function JobCard({ currentUser, job, addJobApp }) {

  const [isLoadingJobCard, setIsLoadingJobCard] = useState(true);
  const [hasApplied, setHasApplied] = useState();
  const [submittedApplication, setSubmittedApplication] = useState(false);
  const [errors, setErrors] = useState([]);

  console.log("Jobcard component rendered");
  //const { username, applications } = currentUser;
  //console.log("Jobcard component cur user applications --->", currentUser.applications.includes(job.id));

  useEffect(function () {
    function checkIfAppliedAfterRender() {
      if (currentUser.applications.includes(job.id)) {
        setHasApplied(true);
      }
    }
    checkIfAppliedAfterRender();
  }, [submittedApplication]);


  useEffect(function () {
    async function applyToJob() {
      if (submittedApplication) {
        try {
          //console.log("username,jobid", currentUser.username, job.id)
          let applyResult = await JoblyApi.applyToJob(currentUser.username, job.id);
          addJobApp(job.id);
          //setHasApplied(true);
          console.log("applied to job---->", applyResult);
        } catch (err) {
          console.log("error occurred", err);
          setErrors(err);
          setSubmittedApplication(false);
        }
      }
    }
    applyToJob();
  }, [setSubmittedApplication]);

  function handleApply(evt) {
    setSubmittedApplication(true);
  }

  return (
      <Card className="JobCard">
        <Card.Title className="justify-content-between text-left">
          <b>{job.title}</b>
        </Card.Title>
        <div className="row">
        <Card.Body className="text-left">
            <p>Salary: {job.salary}</p>
            <p>Equity: {job.equity}</p>
          <div className="JobCard-button">
            {hasApplied ? <Button disabled>Applied</Button> : <Button onClick={handleApply}>Apply</Button>}
          </div>
        </Card.Body>
        </div>
      </Card>
  );

}

export default JobCard;