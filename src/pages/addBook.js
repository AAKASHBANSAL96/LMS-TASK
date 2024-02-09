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

const { setUserData, setAuthUser, addBooks } = authActions;
const AddBook = () => {
  const authorsData = useSelector((state) => state.auth.authorsData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generateUniqueId = () => {
    return uuidv4();
  };

  const [formData, setFormData] = useState({
    bookName: "",
    bookAuthor: "",
    bookDescription: "",
    price: "",
  });
  const [validation, setValidation] = useState({
    bookName: "",
    bookAuthor: "",
    bookDescription: "",
    price: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newValidationMessages = {};

    if (_.isEmpty(formData.bookName.trim())) {
      newValidationMessages.bookName = "Book name is required";
    }

    if (_.isEmpty(formData.bookAuthor)) {
      newValidationMessages.bookAuthor = "Book author is required";
    }

    if (_.isEmpty(formData.bookDescription.trim())) {
      newValidationMessages.bookDescription = "Book description is required";
    }

    if (_.isEmpty(formData.price.trim())) {
      newValidationMessages.price = "Price is required";
    }

    setValidation(newValidationMessages);
    return Object.keys(newValidationMessages).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Set the authenticated user in Redux store
      formData.id = generateUniqueId();
      dispatch(addBooks(formData));
      setMessage("Books added successfully...");
      navigate("/viewbooks");
    }
  };

  return (
    <div>
      <NavbarHead />
      <Container>
        <HeadTitle style={{ marginTop: "70px" }}>Add Books</HeadTitle>

        {/* <form onSubmit={handleLogin}> */}
        <Form onSubmit={handleSubmit}>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>Book name</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter book name"
                  name="bookName"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message" muted>
                  {validation.bookName}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label>Book author</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Select name="bookAuthor" onChange={handleChange}>
                  <option>Select author</option>
                  {!_.isEmpty(authorsData) &&
                    authorsData.map((subData, idx) => (
                      <option key={idx} value={subData.id}>
                        {subData.authorName}
                      </option>
                    ))}
                </Form.Select>

                <Form.Text className="validation-message" muted>
                  {validation.bookAuthor}
                </Form.Text>
              </Col>{" "}
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label style={{ marginRight: "45px" }}>
                  Book descripton
                </Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter book description"
                  name="bookDescription"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message" muted>
                  {validation.bookDescription}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={2}>
                <Form.Label style={{ marginRight: "45px" }}>Price</Form.Label>
              </Col>
              <Col sm={2}>
                <Form.Control
                  type="text"
                  placeholder="Enter book price"
                  name="price"
                  onChange={handleChange}
                />
                <Form.Text className="validation-message" muted>
                  {validation.price}
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

export default AddBook;
