import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, getUserUpdate } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import Message from "../componets/Message";
import Loader from "../componets/Loader";
import { Form, Button, Row, Col,Table } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const orderListMy = useSelector((state) => state.orderListMy);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdate = useSelector((state) => state.userUpdate);
  const { userInfo } = userLogin;
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const { loading, user } = userDetails;
  const {orders,error:errorOrders,loading:loadingOrders} = orderListMy
  const { name, email, password } = userData;
  const { success } = userUpdate;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders())
      } else {
        setUserData({
          ...userData,
          name: user.name,
          email: user.email,
        });
      }
    }
    // eslint-disable-next-line
  }, [history, dispatch, userInfo, user,success]);

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
  {loadingOrders?<Loader />:errorOrders?<Message variant='danger'>{errorOrders}</Message>: (
    
    <Table striped bordered hover responsive className='table-sm'>
    <thead>
      <tr>
        <th>ID</th>
        <th>DATE</th>
        <th>TOTAL</th>
        <th>PAID</th>
        <th>DELIVERED</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order) => (
        <tr key={order._id}>
          <td>{order._id}</td>
          <td>{order.createdAt.substring(0, 10)}</td>
          <td>{order.totalPrice}</td>
          <td>
            {order.isPaid ? (
              order.paidAt.substring(0, 10)
            ) : (
              <i className='fas fa-times' style={{ color: 'red' }}></i>
            )}
          </td>
          <td>
            {order.isDelivered ? (
              order.deliveredAt.substring(0, 10)
            ) : (
              <i className='fas fa-times' style={{ color: 'red' }}></i>
            )}
          </td>
          <td>
            <LinkContainer to={`/order/${order._id}`}>
              <Button className='btn-sm' variant='light'>
                Details
              </Button>
            </LinkContainer>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
