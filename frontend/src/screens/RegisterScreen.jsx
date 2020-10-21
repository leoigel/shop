import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import { Form, Button, Row, Col } from "react-bootstrap";

const RegisterScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const userCreate = useSelector((state) => state.userCreate);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { userInfo } = userCreate;
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const { name, email, password } = userData;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
  };
  const handlerInfo = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="name"
            placeholder="enter name"
            value={name}
            onChange={handlerInfo}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="enter Email"
            value={email}
            onChange={handlerInfo}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="enter password"
            value={password}
            onChange={handlerInfo}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" varient="primary">
          Sign Up
        </Button>
      </Form>
      <Row>
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default RegisterScreen;
