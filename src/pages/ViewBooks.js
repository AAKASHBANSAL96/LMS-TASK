import React, { useEffect, useState } from "react";
import {
  HeadTitle,
  PageContainer,
  ContentContainer,
} from "../components/Styles";
import NavbarHead from "../components/NavbarHead";
import AddBook from "./addBook";
import BookCards from "../components/bookcards";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import _ from "lodash";
import { useLocation } from "react-router-dom";




const ViewBooks = () => {
  const location = useLocation();
  const { state } = location;
  const { authorId } = authorId || "";
  const [booksData, setBooksData] = useState([]);
  const [authorsData, setAuthorsData] = useState([]);

 
  // const [booksData, setBooksData] = useState([]);

  const booksDataResponse = useSelector((state) => state.auth.booksData);
  const authorsResponse = useSelector((state) => state.auth.authorsData);

  useEffect(() => {
    setBooksData(booksDataResponse);
    setAuthorsData(authorsResponse);
  }, []);
  useEffect(() => {
    if (!_.isEmpty(booksData)) {
      const newData = booksData.filter((data) => data.bookAuthor === authorId);
      setBooksData(newData);

      // setBooksData(newData);
    }
  }, [authorId]);
  return (
    <div>
      <NavbarHead />
      <PageContainer>
        <ContentContainer>
          <HeadTitle style={{ marginTop: "130px" }}>Books Library</HeadTitle>
          <Container fluid>
            <Row className="">
              {!_.isEmpty(booksData) &&
                booksData.map((bData, idx) => {
                  let authorObj = authorsData.filter(
                    (data) => data.id == bData.bookAuthor
                  );
                  console.log("ViewBooks -> authorName", authorObj[0]);
                  return (
                    <Col sm={3} className="me-3">
                      <BookCards
                        key={idx}
                        bookTitle={bData.bookName}
                        bookAuthor={authorObj[0].authorName}
                        bookPrice={bData.price}
                        bookDescription={bData.bookDescription}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Container>
        </ContentContainer>
      </PageContainer>
    </div>
  );
};

export default ViewBooks;
