import React from "react";
import {
  HeadTitle,
  PageContainer,
  ContentContainer,
} from "../components/Styles";
import NavbarHead from "../components/NavbarHead";
import AddBook from "./addBook";
import AuthorCard from "../components/authorCard";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import _ from "lodash";

const ViewAuthors = () => {
  const authors = useSelector((state) => state.auth.authorsData);

  console.log("authors", authors);

  return (
    <div>
      <NavbarHead />
      <PageContainer>
        <ContentContainer>
          <HeadTitle style={{ marginTop: "130px" }}>Authors List</HeadTitle>
          <Container fluid>
            <Row className="">
              {!_.isEmpty(authors) &&
                authors.map((bData, idx) => (
                  <Col sm={3} className="me-3">
                    <AuthorCard
                      key={idx}
                      authorId={bData.id}
                      authorName={bData.authorName}
                      authorCountry={bData.authorCountry}
                      authorAge={bData.authorAge}
                      authorDescription={bData.authorDescription}
                    />
                  </Col>
                ))}
            </Row>
          </Container>
        </ContentContainer>
      </PageContainer>
    </div>
  );
};

export default ViewAuthors;
