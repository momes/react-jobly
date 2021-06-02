import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CompanyCard.css';
import JoblyApi from "./api";

/**
 * 
 * 
 * 
 */
function JobCard({ currentUser, job }) {

  //const [hasApplied, setHasApplied] = useState()// something in here
  //const [errors, setErrors] = useState([]);// something in here

  //const 
  //const hasApplied = (user.applications.includes(job.id ))

  // useEffect( function getUser() {
  //   async function getUserInfo() {
  //     try {
  //       let user = await JoblyApi.getUser(currentUser);
  //       console.log(user);
  //       //setIsLoadingCompany(false);
  //     } catch (err) {
  //       setErrors(err);
  //     }
  //   }
  //   getUser();
  // }, []);


  return (
    <div className="JobCard">
      <Card className="JobCard-card">
        <Card.Title className="justify-content-between text-left">
          <b>{job.title}</b>
        </Card.Title>
        <Card.Body className="text-left">
          <p>Salary: {job.salary}</p>
          <p>Equity: {job.equity}</p>
        </Card.Body>
      </Card>
    </div>
  );

}

export default JobCard;