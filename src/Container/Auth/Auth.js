import React, { useRef, useState } from 'react';
import * as yup from 'yup';

function Auth(props) {
    const [userType, setUserType] = useState('Login');

    const [reset, setReset] = useState(false);

    const EmailRef = useRef();
    const NameRef = useRef();
    const PassRef = useRef();

    function handleClick() {
        PassRef.current.style.border = '2px solid blue';
        PassRef.current.focus();
        console.log(EmailRef.current.value);
    }

    function Handleclick() {
        NameRef.current.focus();
        NameRef.current.style.border = '2px solid orange'
        console.log(EmailRef.current.value);
        PassRef.current.focus();
        PassRef.current.style.border = '2px solid orange'
    }

    function Handle() {
        EmailRef.current.focus();
        EmailRef.current.style.border = '2px solid darkblue'
        console.log(EmailRef.current.value);
    }

    // let signupschema = {
    //     name: yup.string().required("Enter your name"),
    //     email: yup.string().required("Enter your email").email("Enter your valid email"),
    //     Password: yup.string().required("")
    // }

    // let loginschema = {
    //     email: yup.string().required("Enter your email").email("Enter your valid email"),
    //     Password: yup.string().required("")
    // }

    // let resetschema = {
    //     email: yup.string().required("Enter your email").email("Enter your valid email")
    // }

    if (userType === 'Login'&& reset === false) {
        authschema ={
            email: yup.string().required("Enter your email").email("Enter your valid email"),
            Password: yup.string().min(8)
        }
    }else if (userType === 'singup' && reset === false) {
       authschema = {
            name: yup.string().required("Enter your name"),
            email: yup.string().required("Enter your email").email("Enter your valid email"),
            Password: yup.string().min(8)
        }
    }else if (reset === true) {
        authschema = {
            email: yup.string().required("Enter your email").email("Enter your valid email")
        }
    }


    let authschema;

    let schema = yup.object().shape();

    return (
        <div>
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title">
                        {
                            reset === true ?
                                <h2>Reset Password </h2>
                                :
                                userType === 'Login' ?
                                    <h2>Login</h2>
                                    :
                                    <h2>Signup</h2>
                        }
                    </div>

                    <div action method="post" role="form" className="php-email-form">
                        <div className="col-md-4 form-group">

                            {
                                reset === true ?
                                    null
                                    :
                                    userType === 'Login' ?
                                        null
                                        :
                                        <div className="row">
                                            <input ref={NameRef} type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                            <div className="validate" />
                                        </div>
                            }
                            <div className="row">
                                <input ref={EmailRef} type="email" name="email" className="form-control" id="email" placeholder="Your email" data-rule="minlen:4" data-msg="Please enter valid Email" />
                                <div className="validate" />
                            </div>
                            {
                                reset === true ?
                                    null
                                    :
                                    <div className="row">
                                        <input ref={PassRef} type="text" name="Password" className="form-control" id="password" placeholder="Your password" data-rule="minlen:4" data-msg="Please enter valid Password" />
                                        <div className="validate" />
                                    </div>
                            }

                        </div>
                        {
                            reset === true ?
                                <div className="text-center"><button onClick={() => Handle()} type="submit">Submit</button></div>
                                :
                                userType === 'Login' ?
                                    <div className="text-center"><button onClick={() => handleClick()} type="submit" >Login</button></div>
                                    :
                                    <div className="text-center"><button onClick={() => Handleclick()} type="submit">Signup</button></div>
                        }

                        {
                            userType === 'Login' ?
                                <div>Create a new Account <button onClick={() => { setReset(false); setUserType('Singup') }}>Signup</button></div>
                                :
                                <div>Already Have Account <button onClick={() => { setReset(false); setUserType('Login') }}>Login</button></div>
                        }

                        <span>Forgot Password <button onClick={() => setReset(true)}>Click Here</button></span>
                    </div>
                </div>
            </section >

        </div >
    );
}

export default Auth;