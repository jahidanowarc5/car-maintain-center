
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';

import './Register.css'
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';


const Register = () => {
    const [agree,setAgree] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth,{sendEmailVerification : true});
      const [updateProfile, updating, updateError] = useUpdateProfile(auth)
      
      
      
    const navigate = useNavigate();

    const navigateLogin = () =>{
        navigate(`/login`)
    }
    if(loading || updating){
        return <Loading></Loading>
    }
    if(user){
        console.log('user', user)
        
    }
    const handleRegisterForm = async (event) =>{
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const agree = event.target.terms.checked;
        
         await createUserWithEmailAndPassword(email,password)
         await updateProfile({displayName:name})
         console.log('update profile')
         navigate(`/home`)
    
    }
    return (
        <div className='register-form'>
            <h2>please register</h2>
            <form onSubmit={handleRegisterForm}>
            <input type="text" name="name" placeholder='your name' id="" />
            <input type="email" name="email" placeholder='your email' id="" required/>
            <input type="password" name="password" placeholder='password' id="" required />
            <input onClick={() =>setAgree(!agree)} type="checkbox" name="terms" id="terms" />
            <label className= {agree ? 'text-primary': 'text-danger'} htmlFor="terms">Accepts all terms and condition</label>
            <input disabled = {!agree} className='w-50 btn btn-primary mx-auto mt-2' type="submit" value="Register" />
            </form>
            <p>Already register <Link to='/login' className='text-danger pe-auto text-decoration-none ' onClick={navigateLogin}>Please login</Link></p>
            <SocialLogin></SocialLogin>
            
        </div>
    );
};

export default Register;