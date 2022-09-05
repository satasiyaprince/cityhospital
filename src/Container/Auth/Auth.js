import React, { useState } from 'react';

function Auth(props) {
    const [userType, setUserType] = useState('Login');

    const [reset , setReset] = useState(false);

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
                                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                        <div className="validate" />
                                    </div>
                            }
                           <div className="row">
                                        <input type="email" name="email" className="form-control" id="email" placeholder="Your email" data-rule="minlen:4" data-msg="Please enter valid Email" />
                                        <div className="validate" />
                                    </div>
                            {
                                reset === true ?
                                null
                                :
                                <div className="row">
                                <input type="text" name="Password" className="form-control" id="password" placeholder="Your password" data-rule="minlen:4" data-msg="Please enter valid Password" />
                                <div className="validate" />
                            </div>
                            }
                           
                        </div>
                        {
                            reset === true?
                            <div className="text-center"><button type="submit">Submit</button></div>
                            :
                            userType === 'Login' ?
                                <div className="text-center"><button type="submit">Login</button></div>
                                :
                                <div className="text-center"><button type="submit">Signup</button></div>
                        }

                        {
                            userType === 'Login' ?
                                <div>Create a new Account <button onClick={() => {setReset(false); setUserType('Singup')}}>Signup</button></div>
                                :
                                <div>Already Have Account <button onClick={() => {setReset(false); setUserType('Login')}}>Login</button></div>
                        }

                        <span>Forgot Password <button onClick={() =>  setReset(true)}>Click Here</button></span>
                    </div>
                </div>
            </section >

        </div >
    );
}

export default Auth;