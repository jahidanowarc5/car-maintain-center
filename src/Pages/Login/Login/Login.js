

import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import axios from 'axios';
const Login = () => {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/'
    let errorElement;
    
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
      const [sendPasswordResetEmail, sending, ] = useSendPasswordResetEmail(auth);
      if (error) {
        
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
      }
      if(loading){
          return <Loading></Loading>
      }

    if(user){
        // navigate(from,{replace:true});
    }
    const handleFormSubmit = async (event) =>{
        event.preventDefault()
       const email = emailRef.current.value
       const password = passwordRef.current.value
       await signInWithEmailAndPassword(email,password);
       const {data} = await axios.post('http://localhost:5000/login',{email})
       localStorage.setItem('accessToken',data.accessToken);
       navigate(from,{replace:true});
    }
    const navigateRegister = () => {
        navigate(`/register`);

    }
    const resetPassword = async()=> {
        const email = emailRef.current.value
        if(email){
            await sendPasswordResetEmail(email)
            toast('email sent')
        }
        else{
            toast('please enter your email')
        }
       

    }
  
    return (
        <div className='w-50 mx-auto'>
            <PageTitle title='login'></PageTitle>
            <h2 className='text-primary'>Please login</h2>
            <Form onSubmit={handleFormSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                   
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                </Form.Group>
               
                <Button className='w-50 mx-auto d-block' variant="primary" type="submit">
                    login
                </Button>
            </Form>
            {errorElement}
            
             <p>New to car maintain <Link to='/register' className='text-primary pe-auto text-decoration-none ' onClick={navigateRegister}>Register please</Link></p>
             <p>Forget password <button  className=' btn btn-link text-primary pe-auto text-decoration-none ' onClick={resetPassword}>Reset password</button></p>
            <SocialLogin></SocialLogin>
            <ToastContainer />
        </div>
    );
};

export default Login;