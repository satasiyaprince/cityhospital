import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Update } from '@mui/icons-material';

function PatientAdmin(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [dopen, setDopen] = useState(false);
    const [did, setDid] = useState(false);
    const [update, setUpdate] = useState(false);

    const getData = () => {
        let localdata = JSON.parse(localStorage.getItem("Patient"))
        if (localdata !== null) {
            setData(localdata);
        }

    }

    useEffect(() => {
        getData();
    })

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        formik.resetForm();
        setDopen(false);
    };

    const handleadd = (values) => {

        let localdata = JSON.parse(localStorage.getItem("Patient"))

        let id = Math.floor(Math.random() * 100)

        let data = { id: id, ...values }

        console.log(data, localdata);

        localStorage.setItem("Patient", JSON.stringify([data]));

        if (localdata === null) {
            localStorage.setItem("Patient", JSON.stringify([data]));
        } else {
            localdata.push(data);
            localStorage.setItem("Patient", JSON.stringify(localdata));
        }

        setOpen(false);
        formik.resetForm();
        getData();
    }

    const handleDelete = (data) => {
        setDopen(true);
        setDid(data.id);
    }

    const handleDeleteDetails = () => {
        let localdata = JSON.parse(localStorage.getItem("Patient"));

        let Ddata = localdata.filter((l) => l.id !== did);

        localStorage.setItem("Patient", JSON.stringify(Ddata))
        setData(Ddata);
        setDopen(false);

        console.log(Ddata);
    }

    const handleEdit = (data) =>{
        setOpen(true);
        formik.setValues(data);
        setUpdate(true);
    }

    const handleupdatedata = (values) => {
        let localdata = JSON.parse(localStorage.getItem("Patient"));

        let uData = localdata.map((l) =>{
            if(l.id === values.id){
                return values;
            }else{
                return l;
            }
        })

        setData(uData);
        localStorage.setItem("Patient", JSON.stringify(uData));
        handleClose()
    }


    let schema = yup.object().shape({
        name: yup.string().required(),
        age: yup.number().required().positive().integer(),
        number: yup.string().required(),
        address: yup.string().required(),
    });


    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            name: '',
            age: '',
            number: '',
            address: '',
        },
        onSubmit: values => {
            if(update){
                handleupdatedata(values);
            }else{
                handleadd(values);
            }
        },
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'number', headerName: 'Number', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'address',
            headerName: 'Address',
            type: 'number',
            width: 90,
        },
        {
            field: '',
            headerName: 'Action',
            type: '',
            width: 90,
            renderCell: (parms) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(parms.row)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" onClick={() => handleEdit(parms.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        },
    ];


    const { handleChange, handleSubmit, errors, handleBlur, touched, values } = formik;

    return (
        <div>
            <h1>Patient Admin Page</h1>
            <br />
            <br />
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <br />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Patient Details</DialogTitle>
                <Formik value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name='name'
                                label="Patient Name"
                                type="name"
                                fullWidth
                                variant="standard"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <p>{errors.name && touched.name ? errors.name : ''}</p>
                            <TextField
                                margin="dense"
                                id="age"
                                name='age'
                                label="Patient Age"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={values.age}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <p>{errors.age && touched.age ? errors.age : ''}</p>
                            <TextField
                                margin="dense"
                                id="number"
                                name='number'
                                label="Patient Number"
                                type="name"
                                fullWidth
                                variant="standard"
                                value={values.number}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <p>{errors.number && touched.number ? errors.number : ''}</p>
                            <TextField
                                margin="dense"
                                id="address"
                                name='address'
                                label="Patient Address"
                                type="name"
                                fullWidth
                                variant="standard"
                                value={values.address}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <p>{errors.address && touched.address ? errors.address : ''}</p>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>{update ? "Update" : "Add"}</Button>
                            </DialogActions>
                        </DialogContent>
                    </Form>
                </Formik>
            </Dialog>
            <Dialog open={dopen} onClose={handleClose}>
                <DialogTitle>Delete Details</DialogTitle>
                <DialogContent>Are You Sure Delete Details</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDeleteDetails()}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default PatientAdmin;