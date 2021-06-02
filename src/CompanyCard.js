import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './CompanyCard.css';

function CompanyCard({ company }) {
  const { name, handle, description, logoUrl } = company;

  return (
    <div className="CompanyCard">
      <Link exact to={`/companies/${handle}`} style={{ textDecoration: "none" }}>
        <Card className="CompanyCard-card">
          <Card.Title className="justify-content-between text-left">
            <b>{name}</b>
            {logoUrl && <img className="CompanyCard-logo" src={logoUrl} />}
          </Card.Title>
          <Card.Body className="text-left">
            <p>{description}</p>
          </Card.Body>
        </Card>
      </Link>
    </div>
  )
}

export default CompanyCard;