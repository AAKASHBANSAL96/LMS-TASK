import React from "react";
import {} from "../components/Styles";
import NavbarHead from "../components/NavbarHead";
import { useLocation } from "react-router-dom";
import ViewSearchResults from "../components/ViewSearchResults";

import { PageContainer, ContentContainer } from "../components/Styles";

const SearchPage = () => {
  const location = useLocation();
  const searchResults = location.state.searchResults;

  return (
    <div>
      <div>
        <NavbarHead />
        <PageContainer>
          <ContentContainer>
            {searchResults && (
              <ViewSearchResults searchResults={searchResults} />
            )}
          </ContentContainer>
        </PageContainer>
      </div>
    </div>
  );
};

export default SearchPage;
