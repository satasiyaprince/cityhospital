import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';

function ListAppointment(props) {
    const [data, setData] = useState([]);
    const history = useHistory();

    const getData = () => {
        let localData = JSON.parse(localStorage.getItem("apt"));

        // console.log(localData);
        setData(localData);
    }

    useEffect(() => {
        getData();
    }, [])

    const handleDelete = (id) => {
        let localData = JSON.parse(localStorage.getItem("apt"));

        let Ddata = localData.filter((l) => l.id !== id);

        localStorage.setItem("apt", JSON.stringify(Ddata));

        console.log(localData, id);

        history.push("/appointment");
    }

    const handleEdit = (data) => {
        console.log(data);

        history.push("/appointment", data);
    }
    return (

        <div className='row'>
            <>
                <NavLink exact className="nav-link scrollto" to={"/appointment"} activeStyle={{ color: "red" }}>Appointment</NavLink>
            </>
            {
                data.map((d, i) => (

                    <div key={i} className='col-md-4'>
                        <Card
                            style={{
                                width: '18rem'
                            }}
                        >
                            <CardBody>
                                <CardTitle tag="h5">
                                    {d.name}
                                </CardTitle>
                                <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                >
                                    {d.phone}<br />
                                    {d.date}<br />
                                    {d.gender}<br />
                                    {d.checkbox}<br />
                                    <button onClick={() => handleDelete(d.id)}>Delete</button>
                                    <button onClick={() => handleEdit(d)}>Edit</button>
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                    </div>
                ))
            }
        </div>
    );
}

export default ListAppointment;