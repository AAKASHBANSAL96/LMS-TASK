import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import _ from "lodash";
//pages
import Home from "./pages/home";
import Login from "./pages/user_login";
import Signup from "./pages/user_signup";
import ViewBooks from "./pages/ViewBooks";
import Students from "./pages/students";
import StudentsList from "./pages/studentsList";
import SearchPage from "./pages/search_page";
import AddBook from "./pages/addBook";
import AddAuthor from "./pages/addAuthors";
import ViewAuthors from "./pages/viewAuthors";

import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const authUser = useSelector((state) => state.auth.authUser);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          {!_.isEmpty(authUser) && (
            <>
              <Route path="/viewBooks" element={<ViewBooks />} />
              <Route path="/viewAuthors" element={<ViewAuthors />} />

              <Route path="/add-book" element={<AddBook />} />
              <Route path="/add-author" element={<AddAuthor />}/>
              <Route path="/searchpage" element={<SearchPage />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students-list" element={<StudentsList />}/>
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
