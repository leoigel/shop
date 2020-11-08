import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../componets/Message'
import Loader from '../componets/Loader'
import FormContainer from '../componets/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen  = ({match,history}) => {
    const userId = match.params.id;
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails)
    const userUpdate = useSelector((state) => state.userAdminUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
      } = userUpdate
    const { loading, error, user } = userDetails
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        isAdmin:false
      });

      

      const { name, email,isAdmin } = userData;

      useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
          }else {
            if(!user.name ||  user._id !== userId) {
                dispatch(getUserDetails(userId))
            }else {
                setUserData({
                    name:user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                })
            }
          }
       
      },[dispatch, history, userId,user,successUpdate])


      const submitHandler = () => {
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
      }

      const handlerInfo = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value  });
      };
      const handleIsAdmin = (e) => {
        setUserData({ ...userData, isAdmin: e.target.checked  });
      }


      return (
          <>
        <Link to='/admin/userlist' className='btn btn-light my-3'>
             Go Back
        </Link>
        <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ): (
            <Form onSubmit={submitHandler}>
                 <Form.Label>Name</Form.Label>
                <Form.Group>
                <Form.Control 
                    name="name"
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={handlerInfo}> 
                 </Form.Control>
                </Form.Group>
                 <Form.Group>
                 <Form.Control
                    name="email"
                    type="email"
                    placeholder="enter Email"
                    value={email}
                    onChange={handlerInfo}>
                </Form.Control>
                 </Form.Group>
                <Form.Group>
                <Form.Check
                    type='checkbox'
                    label='Is Admin'
                    checked={isAdmin}
                    onChange={handleIsAdmin}>
                </Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary'>
                  Update
               </Button>
            </Form>
        )}
        </FormContainer>
          </>
      )
}


export default UserEditScreen