import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import FormContainer from '../componets/FormContainer';
import CheckoutSteps from '../componets/CheckoutStpes';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { shippingAddress } = cart;
  const [buttonAvalible, setButtonAvalible] = useState(true);
  const [infoAddress, setInfoAddress] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const { address, city, postalCode, country } = infoAddress;

  useEffect(() => {
    const isAvailable = [address, city, postalCode, country].every(
      (itemInfoAddress) => itemInfoAddress
    );
    isAvailable ? setButtonAvalible(false) : setButtonAvalible(true);
  }, [address, city, postalCode, country]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };
  const handlerInfo = (e) => {
    setInfoAddress({ ...infoAddress, [e.target.name]: e.target.value });
  };
  console.log(infoAddress);
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>address</Form.Label>
          <Form.Control
            name='address'
            type='text'
            placeholder='Enter Address'
            value={address}
            onChange={handlerInfo}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='City'>
          <Form.Label>City</Form.Label>
          <Form.Control
            name='city'
            type='text'
            placeholder='Enter City'
            value={city}
            onChange={handlerInfo}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='PostalCode'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            name='postalCode'
            type='text'
            placeholder='Enter PostalCode'
            value={postalCode}
            onChange={handlerInfo}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>country</Form.Label>
          <Form.Control
            name='country'
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={handlerInfo}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' disabled={buttonAvalible}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
