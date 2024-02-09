import React, { useState } from "react";
import axios from "axios";
import ViewSearchResults from "./ViewSearchResults";
import { useNavigate } from "react-router-dom";

import {
  GlobalStyle,
  Navbar,
  NavLinks,
  NavLink,
  NavItem,
  SearchBox,
  RightContainer,
  BrandLogo,
  LoginLink,
} from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import authActions from "../Redux/reducers/auth/actions";

const { setUserData, setAuthUser, logOutUser } = authActions;
const NavbarHead = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);
  console.log("authUser", authUser);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      console.log(searchValue);
      // Make a request to the Google Books API
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: searchValue,
          },
        }
      );

      // Handle the response data here
      console.log(response.data);
      setSearchResults(response.data);

      // Navigate to the SearchResults page with the search results
      navigate("/searchpage", { state: { searchResults: response.data } });

      // Reset the search term
      searchValue("");
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <div>
      <GlobalStyle />
      <Navbar>
        <NavLinks>
          {!_.isEmpty(authUser) ? (
            <NavItem>
              <NavLink
                onClick={() => {
                  dispatch(logOutUser());
                  navigate("/");
                }}
              >
                Logout
              </NavLink>
            </NavItem>
          ) : (
            <NavItem>
              <LoginLink href="/login">Login</LoginLink>
            </NavItem>
          )}

          {!_.isEmpty(authUser) && (
            <>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/viewbooks">View Books</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/add-book">Add Book</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/viewAuthors">View Authors</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/add-author">Add Author</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/students">Students</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/students-list">Students List</NavLink>
              </NavItem>
            </>
          )}
        </NavLinks>
      </Navbar>
      {searchResults && <ViewSearchResults searchResults={searchResults} />}
    </div>
  );
};

export default NavbarHead;
