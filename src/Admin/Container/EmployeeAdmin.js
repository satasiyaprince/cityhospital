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

function EmployeeAdmin(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [dopen, setDopen] = useState(false);
    const [did, setDid] = useState(false);
    const [update, setUpdate] = useState(false);

    const getData = () => {
        const localData = JSON.parse(localStorage.getItem("Employee"));
        if (localData !== null) {
            setData(localData);
        }
    }

    useEffect(() => {
        getData();
    })

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
        
    };

    const handleClose = (values) => {
        setOpen(false);
    };

    const handleadd = (values) => {

        const localData = JSON.parse(localStorage.getItem("Employee"));

        let id = Math.floor(Math.random() * 100);
        let data = { id: id, ...values }

        console.log(data, localData);

        if (localData === null) {
            localStorage.setItem("Employee", JSON.stringify([data]));
        } else {
            localData.push(data);
            localStorage.setItem("Employee", JSON.stringify(localData));
        }
        setOpen(false);
        formik.resetForm();
        getData();
    }

    const handleDelete = (data) => {
        setDopen(true);
        setDid(data.id);

    }

    const handleDeleteData = () => {
        const localData = JSON.parse(localStorage.getItem("Employee"));
        let Ddata = localData.filter((l) => l.id !== did);

        localStorage.setItem("Employee", JSON.stringify(Ddata));

        setData(Ddata);
        setDopen(false);

    }

    const handleEdit = (data) => {
        setOpen(true);
        formik.setValues(data);
        setUpdate(true);
    }

    const handleUpdateData = (values) => {
        const localData = JSON.parse(localStorage.getItem("Employee"));

        let Udata = localData.map((l) =>{
            if(l.id === values.id){
                return values;
            }else{
                return l;
            }
        })
        setData(Udata);

        setOpen(false);

        localStorage.setItem("Employee",JSON.stringify(Udata));

    }

    let schema = yup.object().shape({
        name: yup.string().required(),
        age: yup.number().required().positive().integer(),
    });

    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            name: '',
            age: '',
        },
        onSubmit: values => {
            if (update) {
                handleUpdateData(values);
            } else {
                handleadd(values);
            }
        },
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'age', headerName: 'Age', width: 130 },
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


    const { handleChange, errors, handleSubmit, handleBlur, touched, values } = formik
    return (
        <div>
            <h1>Employee Admin Data</h1>
            <br />
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
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
                <DialogTitle>Employee Data</DialogTitle>
                <Formik value={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name='name'
                                label="Name"
                                type=""
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
                                label="Age"
                                type=""
                                fullWidth
                                variant="standard"
                                value={values.age}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <p>{errors.age && touched.age ? errors.age : ''}</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit'>{update ? "Update" : "Add"}</Button>
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
            <Dialog open={dopen} onClose={handleClose}>
                <DialogTitle>Delete Data</DialogTitle>
                <DialogContent>Are You Suer Delete Data</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDeleteData()}>Yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EmployeeAdmin;