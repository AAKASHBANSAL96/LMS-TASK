import React, { useState } from "react";
import NavbarHead from "../components/NavbarHead";
import { Form, Row, Col, Container, Table } from "react-bootstrap";
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
const StudentsList = () => {
  const StudentsList = useSelector((state) => state.auth.studentsData);

  return (
    <div>
      <NavbarHead />
      <Container>
        <HeadTitle style={{ marginTop: "70px" }}>Students List</HeadTitle>
        {!_.isEmpty(StudentsList) ? (
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>School Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {StudentsList.map((student, idx) => (
                <tr>
                  <td>{idx+1}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.schoolName}</td>
                  <td>{student.age}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Row className="mt-5">
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span className="d-flex text-center">No students</span>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default StudentsList;
