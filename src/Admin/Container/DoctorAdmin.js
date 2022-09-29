import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik'
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function DoctorAdmin(props) {
    const [open, setOpen] = React.useState(false);
    const [dopen, setDopen] = React.useState(false);
    const [data, setData] = useState([]);
    const [did, setDid] = useState(false);
    const [update, setUpdate] = useState(false);


    const getData = () => {
        const localData = JSON.parse(localStorage.getItem('lists'))
        if (localData !== null) {
            setData(localData);
        }
    }

    useEffect(() => {

        getData();
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
        formik.resetForm();
    };

    const handleClose = (values) => {
        setOpen(false);
        setUpdate(false);
        formik.resetForm();
        setDopen(false);

    };

    const doctoradd = (values) => {

        const localData = JSON.parse(localStorage.getItem('lists'))

        let id = Math.floor(Math.random() * 1000)

        let data = { id: id, ...values }
        console.log(data, localData);


        if (localData === null) {
            localStorage.setItem('lists', JSON.stringify([data]))
        } else {
            localData.push(data);
            localStorage.setItem('lists', JSON.stringify(localData))
        }

        getData();
        setOpen(false);
        formik.resetForm();

    }

    let schema = yup.object().shape({
        name: yup.string().required('Please enter your name'),
        number: yup.number().required('Please enter your number'),
        experian: yup.string().required('Please enter your experian'),
        degree: yup.string().required('Please enter your degree'),
    });

    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            name: '',
            number: '',
            experian: '',
            degree: '',
        },
        onSubmit: values => {
            if (update) {
                handleUpdateData(values);
            } else {
                doctoradd(values);
            }
        },
    });

    const handleUpdateData = (values) => {
        const localData = JSON.parse(localStorage.getItem('lists'))

        let uData = localData.map((l) => {
            if (l.id === values.id) {
                return values
            } else {
                return l;
            }
        })

        setData(uData);
        localStorage.setItem("lists", JSON.stringify(uData));
        handleClose()

    }

    const handleEdit = (data) => {
        console.log(data);
        setOpen(true);
        formik.setValues(data);
        setUpdate(true);
    }

    const handleDelete = (data) => {
        setDopen(true);
        setDid(data.id)
    }

    const handleDeleteData = () => {
        const localData = JSON.parse(localStorage.getItem('lists'))
        let Ddata = localData.filter((l) => l.id !== did)

        localStorage.setItem("lists", JSON.stringify(Ddata))
        setData(Ddata);
        setDopen(false);

        console.log(Ddata);
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'number', headerName: 'Number', width: 130 },
        {
            field: 'experian',
            headerName: 'Experian',
            type: '',
            width: 90,
        },
        {
            field: 'degree',
            headerName: 'Degree',
            type: '',
            width: 90,
        },
        {
            field: '',
            headerName: 'Action',
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



    const { handleBlur, handleChange, handleSubmit, values, touched, errors } = formik
    return (
        <div>
            <h1>Doctor Admin Page</h1>
            <br />
            <div>
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
                    <DialogTitle>Doctor</DialogTitle>
                    <Formik value={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name='name'
                                    label="Docter Name"
                                    fullWidth
                                    variant="standard"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <p>{errors.name && touched.name ? errors.name : ''}</p>
                                <TextField
                                    margin="dense"
                                    id="number"
                                    name='number'
                                    label="Docter Number"
                                    fullWidth
                                    variant="standard"
                                    value={values.number}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <p>{errors.number && touched.number ? errors.number : ''}</p>
                                <TextField
                                    margin="dense"
                                    id="experian"
                                    name='experian'
                                    label="Docter Experian"
                                    fullWidth
                                    variant="standard"
                                    value={values.experian}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <p>{errors.experian && touched.experian ? errors.experian : ''}</p>
                                <TextField
                                    margin="dense"
                                    id="degree"
                                    name='degree'
                                    label="Docter Degree"
                                    fullWidth
                                    variant="standard"
                                    value={values.degree}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                <p>{errors.degree && touched.degree ? errors.degree : ''}</p>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type='submit'>{update ? "Update" : "Add"}</Button>
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
                <Dialog open={dopen} onClose={handleClose}>
                    <DialogTitle>Delete Doctor List</DialogTitle>
                    <DialogContent>Are You sure Delete Data</DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={() => handleDeleteData()}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default DoctorAdmin;