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
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../Redux/reducers/auth/actions";
import { useNavigate } from "react-router-dom";



const { setUserData, setAuthUser } = authActions;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.userData);
  
  console.log("users", users);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newValidationMessages = {};

    if (_.isEmpty(formData.email.trim())) {
      newValidationMessages.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newValidationMessages.email = "Invalid email address";
    }

    if (_.isEmpty(formData.password.trim())) {
      newValidationMessages.password = "Password is required";
    } else if (formData.password.length < 8) {
      newValidationMessages.password = "Minimum password length should be 8";
    }

    setValidation(newValidationMessages);
    return Object.keys(newValidationMessages).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("user",users);
      if (!_.isEmpty(users)) {
        const user = users.find(
          (u) =>
            u.email === formData.email &&
            u.password === formData.password
        );
          
        if (user) {
          // Set the authenticated user in Redux store
          dispatch(setAuthUser(user));
          setMessage("Login successfully...");
          navigate("/")
        } else {
          alert("Invalid credentials. Please try again.");
        }
      }
    }
  };

  return (
    <div>
      <NavbarHead />
      <PageContainer>
        <ContentContainer>
          <HeadTitle style={{ marginTop: "130px" }}>User Login</HeadTitle>
          {/* <form onSubmit={handleLogin}> */}

          <form onSubmit={handleLogin} style={{ marginTop: "50px", marginLeft: "550px" }}>
            <FormGroup>
              <Label style={{ marginRight: "45px" }}>Email</Label>
              <Input
                type="email"
                placeholder="Enter your Email"
                id="email"
                name="email"
                onChange={handleChange}
              />
              <span className="validation-message">{validation.email}</span>
            </FormGroup>

            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                id="pw"
                name="password"
                onChange={handleChange}
              />
              <span className="validation-message">{validation.password}</span>
            </FormGroup>
            <span className="success-message">{message}</span>

            <Button
              style={{ marginLeft: "110px", marginTop: "50px" }}
              type="submit"
            >
              Login
            </Button>
            <HeadDescription style={{ marginLeft: "30px" }}>
              New User? <a href="/signup">Signup!</a>{" "}
            </HeadDescription>
          </form>
        </ContentContainer>
      </PageContainer>
    </div>
  );
};

export default Login;
