import React, { useState } from "react";
import {} from "../components/Styles";
import NavbarHead from "../components/NavbarHead";
import {
  HeadTitle,
  PageContainer,
  ContentContainer,
  FormGroup,
  Input,
  Label,
  Button,
  HeadDescription,
} from "../components/Styles";
import _ from "lodash";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../Redux/reducers/auth/actions";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const { setUserData, setAuthUser } = authActions;

const Signup = () => {
  const navigate = useNavigate();

  const generateUniqueId = () => {
    return uuidv4();
  };

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
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.userData);
  console.log("users", users);

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
  const handleSignup = (e) => {
    e.preventDefault();

    if (validateForm()) {
      let existingUser = false;
      if (!_.isEmpty(users)) {
        existingUser = users.find((user) => user.email === formData.email);
        if (existingUser) {
          alert("User with this email already exists.");
          return;
        }
      }

      if (_.isEmpty(users) || !existingUser) {
        formData.id = generateUniqueId();
        dispatch(setUserData(formData));
        setMessage("Sign up successfully...");
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <NavbarHead />
      <PageContainer>
        <ContentContainer>
          <HeadTitle style={{ marginTop: "130px" }}>User Signup</HeadTitle>
          <form
            onSubmit={handleSignup}
            style={{ marginTop: "50px", marginLeft: "550px" }}
          >
            <FormGroup>
              <Label style={{ marginRight: "45px" }}>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
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
              Signup
            </Button>
            <HeadDescription style={{ marginLeft: "20px" }}>
              Already an User? <a href="/login">Login!</a>{" "}
            </HeadDescription>
          </form>
        </ContentContainer>
      </PageContainer>
    </div>
  );
};

export default Signup;
