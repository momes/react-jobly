import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import './CompanyCard.css';
import JoblyApi from "./api";
import './JobCard.css'
import Error from "./Error";

/** JobCard Component
 * 
 * Props:
 * - showCompany: boolean
 * - currentUser {}
 * - job {}
 * - addJobApp()
 * 
 * State:
 * - hasApplied: boolean
 * - isSubmittingApplication: boolean
 * - errors: null or []
 * 
 * JobList -> JobCard
 */
function JobCard({ currentUser, job, addJobApp, showCompany }) {
  const [hasApplied, setHasApplied] = useState(currentUser.applications.has(job.id));
  const [isSubmittingApplication, setIsSubmittingApplication] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(function () {
    async function applyToJob() {
      if (isSubmittingApplication) {
        try {
          let applyResult = await JoblyApi.applyToJob(currentUser.username, job.id);
          addJobApp(job.id);
          setIsSubmittingApplication(false);
          setHasApplied(true);
          console.log("applied to job---->", applyResult);
        } catch (err) {
          console.log("error occurred", err);
          setErrors(err);
          setIsSubmittingApplication(false);
        }
      }
    }
    applyToJob();
  }, [isSubmittingApplication]);

  function handleApply(evt) {
    setIsSubmittingApplication(true);
  }

  return (
    <Card className="JobCard">
        {errors && errors.map(e => <Error error={e} />)}
      <Card.Title className="justify-content-between text-left">
        <b>{job.title}</b>
        {showCompany && <h5>{job.companyName}</h5>}
      </Card.Title>
      <Card.Body className="text-left">
        <p>Salary: {job.salary}</p>
        <p>Equity: {job.equity}</p>
        <div className="JobCard-button">
          {hasApplied
            ? <Button disabled>Applied</Button>
            : <Button onClick={handleApply}>Apply</Button>}
        </div>
      </Card.Body>
    </Card>
  );

}

export default JobCard;