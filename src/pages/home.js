import React, {useState} from "react";
import {
  HeadTitle,
  PageContainer,
  ContentContainer,
} from "../components/Styles";
import NavbarHead from "../components/NavbarHead";
import BookCards from "../components/bookcards";
import { Form, Row, Col, Container, Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import authActions from "../Redux/reducers/auth/actions";

const { deleteBorrow } = authActions;
const DeleteModel = ({ show, handleClose, dateID }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteBorrow(dateID));
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
const Home = () => {
  const borrowList = useSelector((state) => state.auth.borrowData);
  const studentsData = useSelector((state) => state.auth.studentsData);
  const booksData = useSelector((state) => state.auth.booksData);

  const [show, setShow] = useState(false);
  const [dateID, setDataID] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <NavbarHead />
      <Container>
        <HeadTitle style={{ marginTop: "70px" }}>
          Library Management System
        </HeadTitle>
        <hr />
      </Container>
      <Container>
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Col>
            <Col>
              <span style={{ fontWeight: 600 }}>
                Total Books: {booksData.length}
              </span>
            </Col>
            <Col style={{ fontWeight: 600 }}>
              <span>Total Students: {studentsData.length}</span>
            </Col>
          </Col>
        </Row>
        <hr />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Books borrow list
        </div>
        <div>
          {!_.isEmpty(borrowList) &&
          !_.isEmpty(studentsData) &&
          !_.isEmpty(booksData) ? (
            <Table striped bordered hover className="mt-5">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book Name</th>
                  <th>Student Name</th>
                  <th>Borrow Date</th>
                  <th>Return Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {borrowList.map((borrow, idx) => {
                  console.log("Home -> borrow", borrow);
                  let bookData = booksData.find(
                    (book) => book.id === borrow.bookId
                  );

                  let student = studentsData.find(
                    (student) => student.id === borrow.studentId
                  );
                  return (
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{bookData.bookName}</td>
                      <td>
                        {student.firstName} {student.lastName}
                      </td>
                      <td>{borrow.dateOfBorrow}</td>
                      <td>{borrow.dateOfReturn}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            setDataID(borrow.id);
                            handleShow();
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
                color: "red",
              }}
            >
              No data
            </div>
          )}
        </div>
      </Container>

      <DeleteModel show={show} handleClose={handleClose} dateID={dateID} />
    </div>
  );
};

export default Home;
