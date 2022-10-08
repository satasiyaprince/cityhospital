import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

function ListAppointment(props) {
    const [data, setData] = useState([]);

    const getData = () => {
        let localData = JSON.parse(localStorage.getItem("apt"));

        // console.log(localData);
        setData(localData);
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div className='row'>
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
                                    {d.phone}<br/>
                                    {d.date}
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