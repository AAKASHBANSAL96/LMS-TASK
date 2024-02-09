import React, { useState } from "react";
import { HeadDescription } from "../components/Styles";
import NavbarHead from "../components/NavbarHead";
import {
  HeadTitle,
  PageContainer,
  ContentContainer,
  FormGroup,
  Input,
  Label,
  Button,
} from "../components/Styles";
import { Form, Row, Col, Container } from "react-bootstrap";

import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../Redux/reducers/auth/actions";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const { addAuthors } = authActions;
const AddAuthor = () => {
  const authors = useSelector((state) => state.auth.authorsData);
  console.log("authors", authors);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateUniqueId = () => {
    return uuidv4();
  };

  const [formData, setFormData] = useState({
    authorName: "",
    authorCountry: "",
    authorAge: "",
    authorDescription: "",
  });
  const [validation, setValidation] = useState({
    authorName: "",
    authorCountry: "",
    authorAge: "",
    authorDescription: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newValidationMessages = {};

    if (_.isEmpty(formData.authorName.trim())) {
      newValidationMessages.authorName = "Author name is required";
    }

    if (_.isEmpty(formData.authorCountry.trim())) {
      newValidationMessages.authorCountry = "Author country is required";
    }

    if (_.isEmpty(formData.authorAge.trim())) {
      newValidationMessages.authorAge = "Author age is required";
    }

    if (_.isEmpty(formData.authorDescription.trim())) {
      newValidationMessages.authorDescription =
        "Author description is required";
    }

    setValidation(newValidationMessages);
    return Object.keys(newValidationMessages).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Set the authenticated user in Redux store
      formData.id = generateUniqueId();
      dispatch(addAuthors(formData));
      setMessage("Author added successfully...");
      navigate("/viewbooks");
    }
  };

  return (
    <div>
      <NavbarHead />
      <Container>
        <HeadTitle style={{ marginTop: "70px" }}>Add Author</HeadTitle>

        {/* <form onSubmit={handleLogin}> */}

        <Form
          onSubmit={handleSubmit}
        >
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>Author name</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter author name"
                  name="authorName"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message" muted>
                  {validation.authorName}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>Author country</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter author country"
                  name="authorCountry"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message" muted>
                  {validation.authorCountry}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>Author descripton</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter author description"
                  name="authorDescription"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message" muted>
                  {validation.authorDescription}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>Author age</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter author age"
                  name="authorAge"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message" muted>
                  {validation.authorAge}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <span className="success-message">{message}</span>
          </Row>
          <Row>
            <Col sm={6}>
              <Button
                style={{ marginLeft: "110px", marginTop: "50px" }}
                type="submit"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default AddAuthor;
