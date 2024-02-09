import React, { useState } from "react";
import NavbarHead from "../components/NavbarHead";
import { Form, Row, Col, Container } from "react-bootstrap";
import authActions from "../Redux/reducers/auth/actions";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  HeadTitle,
  PageContainer,
  ContentContainer,
  FormGroup,
  Input,
  Label,
  Button,
} from "../components/Styles";


const { addStudents } = authActions;
const Students = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateUniqueId = () => {
    return uuidv4();
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    schoolName: "",
  });
  const [validation, setValidation] = useState({
    firstName: "",
    lastName: "",
    age: "",
    schoolName: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newValidationMessages = {};

    if (_.isEmpty(formData.firstName.trim())) {
      newValidationMessages.firstName = "First name is required";
    }

    if (_.isEmpty(formData.lastName.trim())) {
      newValidationMessages.lastName = "Last name is required";
    }

    if (_.isEmpty(formData.age.trim())) {
      newValidationMessages.age = "Age is required";
    }

    if (_.isEmpty(formData.schoolName.trim())) {
      newValidationMessages.schoolName = "School name is required";
    }

    setValidation(newValidationMessages);
    return Object.keys(newValidationMessages).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Set the authenticated user in Redux store
      formData.id = generateUniqueId();
      dispatch(addStudents(formData));
      setMessage("Students added successfully...");
      navigate("/students-list");
    }
  };

  return (
    <div>
      <NavbarHead />
      <Container>
        <HeadTitle style={{ marginTop: "70px" }}>Add Students</HeadTitle>

        <Form onSubmit={handleSubmit}>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>First name</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message">
                  {validation.firstName}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>Last name</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message">
                  {validation.lastName}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>Age</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter student's age"
                  name="age"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message">
                  {validation.age}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>School Name</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter School Name"
                  name="schoolName"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message">
                  {validation.schoolName}
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

export default Students;
