import React, { useRef, useEffect, useState } from "react";
import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../Redux/reducers/auth/actions";
import { useNavigate } from "react-router-dom";
import {
  HeadTitle,
  PageContainer,
  ContentContainer,
  FormGroup,
} from "../components/Styles";

const { addBorrow } = authActions;
const AssignModel = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const booksDataResponse = useSelector((state) => state.auth.booksData);
  const studentsData = useSelector((state) => state.auth.studentsData);
  console.log("AssignModel -> booksDataResponse", booksDataResponse);

  const [formData, setFormData] = useState({
    bookId: "",
    studentId: "",
    dateOfBorrow: new Date(),
    dateOfReturn: new Date(),
  });
  const [validation, setValidation] = useState({
    bookName: "",
    studentName: "",
    dateOfBorrow: "",
    dateOfReturn: "",
  });

  const generateUniqueId = () => {
    return uuidv4();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newValidationMessages = {};

    if (_.isEmpty(formData.bookId.trim())) {
      newValidationMessages.bookName = "Book name is required";
    }

    if (_.isEmpty(formData.studentId)) {
      newValidationMessages.studentName = "Student name is required";
    }

    if (_.isEmpty(formData.dateOfBorrow)) {
      newValidationMessages.dateOfBorrow = "Borrow date is required";
    }

    if (_.isEmpty(formData.dateOfReturn)) {
      newValidationMessages.dateOfReturn = "Return date is required";
    }

    setValidation(newValidationMessages);
    return Object.keys(newValidationMessages).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Set the authenticated user in Redux store
      formData.id = generateUniqueId();
      dispatch(addBorrow(formData));
      setMessage("Book assigned successfully...");
      navigate("/students-list");
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book borrow form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <FormGroup>
              <Col sm={6}>
                <Form.Label>Book name</Form.Label>
              </Col>
              <Col sm={6}>
                <Form.Select name="bookId" onChange={handleChange}>
                  <option>Select book</option>
                  {!_.isEmpty(booksDataResponse) &&
                    booksDataResponse.map((bookData, idx) => (
                      <option key={idx} value={bookData.id}>
                        {bookData.bookName}
                      </option>
                    ))}
                </Form.Select>

                <Form.Text className="validation-message">
                  {validation.bookName}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={6}>
                <Form.Label>Student name</Form.Label>
              </Col>
              <Col sm={6}>
                <Form.Select name="studentId" onChange={handleChange}>
                  <option>Select student</option>
                  {!_.isEmpty(studentsData) &&
                    studentsData.map((student, idx) => (
                      <option key={idx} value={student.id}>
                        {student.firstName} {student.lasttName}
                      </option>
                    ))}
                </Form.Select>
                <Form.Text className="validation-message">
                  {validation.studentName}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={6}>
                <Form.Label>Borrow date</Form.Label>
              </Col>
              <Col sm={6}>
                <input
                  type="date"
                  name="dateOfBorrow"
                  selected={formData.dateOfBorrow}
                  onChange={handleChange}
                />
                <br/>
                <Form.Text className="validation-message">
                  {validation.dateOfBorrow}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
          <Row>
            <FormGroup>
              <Col sm={6}>
                <Form.Label>Return date</Form.Label>
              </Col>
              <Col sm={6}>
                <input
                  type="date"
                  name="dateOfReturn"
                  selected={formData.dateOfReturn}
                  onChange={handleChange}
                />
                <br/>
                <Form.Text className="validation-message">
                  {validation.dateOfReturn}
                </Form.Text>
              </Col>
            </FormGroup>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button type={"submit"} variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const BookCards = ({ bookTitle, bookAuthor, bookPrice, bookDescription }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{bookTitle}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Author: {bookAuthor}
        </Card.Subtitle>
        <Card.Text>{bookDescription}</Card.Text>
        <Button variant="primary" onClick={handleShow}>
          Borrow - {bookPrice} Ruppes
        </Button>
        <AssignModel show={show} handleClose={handleClose} />
      </Card.Body>
    </Card>
  );
};

export default BookCards;
