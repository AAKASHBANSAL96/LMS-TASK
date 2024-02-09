import React, { useRef, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AuthorCard = ({
  authorId,
  authorName,
  authorCountry,
  authorAge,
  authorDescription,
}) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          {" "}
          <>
            <b>Name:</b> {authorName}{" "}
          </>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {" "}
          <>
            <b>Country:</b> {authorCountry}
          </>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <>
            <b>Age:</b> {authorAge}
          </>
        </Card.Subtitle>
        <Card.Text>{authorDescription}</Card.Text>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/viewBooks", { state: {authorId: authorId} });
          }}
        >
          View books
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AuthorCard;
