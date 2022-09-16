import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';

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
        NameRef.current.style.border = '2px solid orange';
        console.log(EmailRef.current.value);
        PassRef.current.focus();
        PassRef.current.style.border = '2px solid orange';
    }

    function Handle() {
        EmailRef.current.focus();
        EmailRef.current.style.border = '2px solid darkblue';
        console.log(EmailRef.current.value);
    }

    let authschema, init;



    if (userType === 'Login' && reset === false) {
        authschema = {
            email: yup.string().required("Enter your email").email("Enter your valid email"),
            Password: yup.string().min(8),
        }

        init = {
            email: '',
            Password: '',

        }
    } else if (userType === 'Singup' && reset === false) {
        authschema = {
            name: yup.string().required("Enter your name"),
            email: yup.string().required("Enter your email").email("Enter your valid email"),
            Password: yup.string().min(8),
        }

        init = {
            name: '',
            email: '',
            Password: '',
        }
    } else if (reset === true) {
        authschema = {
            email: yup.string().required("Enter your email").email("Enter your valid email"),
        }
        init = {
            email: '',
        }
    }
    let schema = yup.object().shape(authschema);

    const formik = useFormik({
        initialValues: init,
        validationSchema: schema,
        onSubmit: values => {
            console.log(values);
        },
    });

    const { handleChange, handleSubmit, errors, touched, handleBlur } = formik;


    return (
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

                <Formik value={formik}>

                    <Form action method="post" onSubmit={handleSubmit} className="php-email-form">
                        <div className="col-md-4 form-group">

                            {
                                reset === true ?
                                    null
                                    :
                                    userType === 'Login' ?
                                        null
                                        :
                                        <div className="row">
                                            <input ref={NameRef}
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                id="name"
                                                placeholder="Your Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            <p>{errors.name && touched.name ? errors.name : ''}</p>
                                            <div className="validate" />
                                        </div>
                            }
                            <div className="row">
                                <input ref={EmailRef}
                                    type="email" name="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Your email"
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                                <p>{errors.email && touched.email ? errors.email : ''}</p>
                                <div className="validate" />
                            </div>
                            {
                                reset === true ?
                                    null
                                    :
                                    <div className="row">
                                        <input ref={PassRef}
                                            type="password"
                                            name="Password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Your password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                        <p>{errors.Password && touched.Password ? errors.Password : ''}</p>
                                        <div className="validate" />
                                    </div>
                            }

                        </div>
                        {
                            reset === true ?
                                <div className="text-center"><button type="submit">Submit</button></div>
                                :
                                userType === 'Login' ?
                                    <div className="text-center"><button type="submit" >Login</button></div>
                                    :
                                    <div className="text-center"><button type="submit">Signup</button></div>
                        }
                    </Form>
                </Formik>
                {
                    userType === 'Login' ?
                        <div>Create a new Account <button onClick={() => { setReset(false); setUserType('Singup') }}>Signup</button></div>
                        :
                        <div>Already Have Account <button onClick={() => { setReset(false); setUserType('Login') }}>Login</button></div>
                }

                <span>Forgot Password <button onClick={() => setReset(true)}>Click Here</button></span>
            </div>
        </section >

    );
}

export default Auth;