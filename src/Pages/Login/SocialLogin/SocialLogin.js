

import React from 'react';
import google from '../../../images/social/google1.png';
import facebook from '../../../images/social/facebook 1.png';
import github from '../../../images/social/github 1.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    let errorElement;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/'
    if(loading || loading1){
        return <Loading></Loading>
    }
    if (error || error1) {
        
        errorElement = <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
                      
      }
      if(user || user1){
          navigate(from,{replace:true})
      }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{height: '1px'}} className='bg-info w-50 '></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{height: '1px'}} className='bg-info w-50 '></div>
            </div>
            {errorElement}
            <button onClick={()=>signInWithGoogle()} className='btn btn-outline-primary w-50 d-block mx-auto my-2'>
                <img src={google} alt="" />
               <span> Google sign in </span>
            </button>
            
            <button className='btn btn-outline-primary w-50 d-block mx-auto my-2'>
                <img src={facebook} alt="" />
               <span>  Facebook sign in </span>
            </button>
            <button onClick={()=> signInWithGithub()} className='btn btn-outline-primary w-50 d-block mx-auto my-2'>
                <img src={github} alt="" />
               <span> Github sign in </span>
            </button>
        </div>
    );
};

export default SocialLogin;