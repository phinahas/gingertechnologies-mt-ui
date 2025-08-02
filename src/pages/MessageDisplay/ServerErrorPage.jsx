import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Alert } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ServerErrorPage = () => {

  const navigate = useNavigate();
  const { errorMessage } = useParams();
  
  const [reported, setReported] = useState(false);

  const handleReportError = () => {
    // Here you can send the error details to your backend or logging service
    console.error("Reported Error:", errorMessage);
    setReported(true);
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "5rem" }}>
      <Typography variant="h3" color="error">
        Oops! Something Went Wrong
      </Typography>
      <Typography variant="h6" color="textSecondary" style={{ marginTop: "1rem" }}>
        It looks like our server encountered an issue. But don’t worry, we’re on it!
      </Typography>

      {/* Expansion Panel for Error Details */}
      <Accordion style={{ marginTop: "2rem", border:'1px solid black' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1">See Technical Details </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{}}>
          {/* <Alert severity="error"> */}
            {errorMessage || "Unknown server error. Please try again later."}
          {/* </Alert> */}
        </AccordionDetails>
      </Accordion>

      {/* Report Button */}
      {/* Buttons: Report Error & Go Home */}
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        {!reported ? (
          <Button variant="contained" color="primary" onClick={handleReportError}>
            Report This Issue
          </Button>
        ) : (
          <Typography variant="body1" color="success">
            Thank you! Our team has been notified.
          </Typography>
        )}
        <Button variant="outlined" color="secondary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </div>
    </Container>
  );
};

export default ServerErrorPage;
