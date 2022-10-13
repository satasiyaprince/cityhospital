import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { NavLink, useHistory } from 'react-router-dom';


function Appointment(props) {
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        console.log(props.location.state);
        if (props.location.state !== null) {
            formik.setValues(props.location.state);
            setUpdate(true);
        }
    }, [])
    const history = useHistory();

    let appschema, initc;

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    appschema = {
        name: yup.string().required("Enter your name")
            .min(2, "Mininum 2 characters")
            .max(30, "Maximum 30 characters")
            .matches(
                /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                'Enter valid name'
            ),
        email: yup.string().required("Enter your email").email("Enter valid email"),

        phone: yup.string().required("Enter your phone number")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(10, 'Enter min 10 digits')
            .max(10, 'Enter max 10 digits'),

        date: yup.string().required("Enter your appointment date")
            .matches(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/, "Enter Date in Format."),

        department: yup.string().required("Enter your Select Department"),

        message: yup.string().required("Enter your message")
            .min(2, 'minimum required 2 diget')
            .max(50, 'maximum required 50 diget')
            .required('Enter your messge'),

        gender: yup.string().required("Enter your Gender"),

        checkbox: yup.array().min(1).of(yup.string().required()).required("select your Hobby"),


    }
    initc = {
        name: '',
        email: '',
        phone: '',
        date: '',
        department: '',
        message: '',
        gender: '',
        checkbox: [],


    }

    const handleAdd = (values) => {

        let localData = JSON.parse(localStorage.getItem("apt"));
        console.log(localData);

        let id = Math.floor(Math.random() * 100);

        if (localData === null) {
            localStorage.setItem("apt", JSON.stringify([{ id: id, ...values }]));
        } else {
            localData.push({ id: id, ...values });
            localStorage.setItem("apt", JSON.stringify(localData));
        }

        history.push("/listappointment");
    }

    const UpdateData = (data) => {

        const localData = JSON.parse(localStorage.getItem("apt"));

        let Udata = localData.map((l) => {
            if (l.id === data.id) {
                return data;
            } else {
                return l;
            }

        })
        localStorage.setItem("apt", JSON.stringify(Udata));

        history.replace();
        setUpdate(false);
        history.push("/listappointment");
        // console.log(data);
    }

    let schema = yup.object().shape(appschema);

    const formik = useFormik({
        initialValues: initc,
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                UpdateData(values);
            } else {
                handleAdd(values);
            }
        },
    });

    const { handleChange, handleSubmit, errors, touched, handleBlur, values } = formik
    return (
        <div>
            <section id="appointment" className="appointment">
                <div className="container">
                    <div className="section-title">
                        <h2>Make an Appointment</h2>
                        <p>Aenean enim orci, suscipit vitae sodales ac, semper in ex. Nunc aliquam eget nibh eu euismod. Donec dapibus
                            blandit quam volutpat sollicitudin. Fusce tincidunt sit amet ex in volutpat. Donec lacinia finibus tortor.
                            Curabitur luctus eleifend odio. Phasellus placerat mi et suscipit pulvinar.</p>
                    </div>
                    <Formik value={formik}>
                        <Form action method="post" onSubmit={handleSubmit} className="php-email-form">
                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <NavLink exact className="nav-link scrollto" to={"/listappointment"} activeStyle={{ color: "red" }}>ListAppointment</NavLink>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        placeholder="Your Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                    />
                                    <p>{errors.name && touched.name ? errors.name : ''}</p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input type="text"
                                        className="form-control"
                                        name="email" id="email"
                                        placeholder="Your Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                    <p>{errors.email && touched.email ? errors.email : ''}</p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input type="tel"
                                        className="form-control"
                                        name="phone"
                                        id="phone"
                                        placeholder="Your Phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.phone}

                                    />
                                    <p>{errors.phone && touched.phone ? errors.phone : ''}</p>
                                    <div className="validate" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 form-group mt-3">
                                    <input type="datetime"
                                        name="date"
                                        className="form-control datepicker"
                                        id="date"
                                        placeholder="Appointment Date"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.date}
                                    />
                                    <p>{errors.date && touched.date ? errors.date : ''}</p>
                                    <div className="validate" />
                                </div>
                                <div className="col-md-4 form-group mt-3" onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <select
                                        name="department"
                                        id="department"
                                        className="form-select"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.department}

                                    >
                                        <option value>Select Department</option>
                                        <option value="Department 1">Department 1</option>
                                        <option value="Department 2">Department 2</option>
                                        <option value="Department 3">Department 3</option>
                                    </select>
                                    <p>{errors.department && touched.department ? errors.department : ''}</p>
                                    <div className="validate" />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <textarea
                                    className="form-control"
                                    name="message"
                                    rows={5}
                                    placeholder="Message (Optional)"
                                    defaultValue={""}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.message}
                                />
                                <p>{errors.message && touched.message ? errors.message : ''}</p>
                                <div className="validate" />
                            </div>
                            <div className="mb-3">
                                <div className="loading">Loading</div>
                                <div className="error-message" />
                                <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                            </div>

                            <>
                                <label><b>Gender:-</b></label>

                                <input type="radio"
                                    id="gender"
                                    name="gender"
                                    value={"male"}
                                    onBlur={handleBlur}
                                    checked={values.gender === "male"}
                                    onChange={handleChange} />
                                Male

                                <input type="radio"
                                    id="gender"
                                    name="gender"
                                    value={"female"}
                                    checked={values.gender === "female"}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                Female

                            </>
                            <p>{errors.gender && touched.gender ? errors.gender : ''}</p>



                            <div className="row">
                                <div className="col-md-4 form-group">

                                    <input
                                        type="checkbox"
                                        value="Traveling"
                                        name="checkbox"
                                        onBlur={handleBlur}
                                        checked={values.checkbox.some((h) => h === "Traveling")}
                                        onChange={handleChange}
                                    />
                                    Traveling

                                    <input
                                        type="checkbox"
                                        value="Reading"
                                        name="checkbox"
                                        checked={values.checkbox.some((h) => h === "Reading")}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    Reading

                                    <input
                                        type="checkbox"
                                        value="Music"
                                        name="checkbox"
                                        checked={values.checkbox.some((h) => h === "Music")}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    Music

                                </div>
                            </div>
                            <p>{errors.checkbox && touched.checkbox ? errors.checkbox : ''}</p>


                            <div className="text-center"><button type="submit">{update ? "Update an Appointment" : "Make an Appointment"}</button></div>
                        </Form>
                    </Formik>
                </div>
            </section>

        </div>
    );
}

export default Appointment;