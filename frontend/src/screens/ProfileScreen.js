import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, getUserUpdate } from "../actions/userActions";
import Message from "../componets/Message";
import Loader from "../componets/Loader";
import { Form, Button, Row, Col } from "react-bootstrap";

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdate = useSelector((state) => state.userUpdate);
  const { userInfo } = userLogin;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, user } = userDetails;
  const { name, email, password } = userData;
  const { success } = userUpdate;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setUserData({
          ...userData,
          name: user.name,
          email: user.email,
        });
      }
    }
    // eslint-disable-next-line
  }, [history, dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getUserUpdate({ id: user._id, name, email, password }));
  };
  const handlerInfo = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {loading && <Loader />}
          {/* {error && <Message variant="danger">{error}</Message>} */}
          {success && <Message variant="success">Profile Updated</Message>}
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
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
