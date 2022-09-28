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
import { RestoreFromTrash } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function MedicineAdmin(props) {
  const [open, setOpen] = React.useState(false);
  const [dopen, setDOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [did, setDid] = useState(false);
  const [update, setUpdate] = useState(false);

  const localData = () => {
    let localData = JSON.parse(localStorage.getItem('Medicine'));
    setData(localData);
  }

  const handleDelete = (data) => {
    setDOpen(true)
    setDid(data.id)
  }

  const handleEdit = (data) => {
    setOpen(true)
    console.log(data);
    formik.setValues(data);
    setUpdate(true);
  }


  const handledeletedata = () => {
    let localData = JSON.parse(localStorage.getItem('Medicine'));
    let Ddata = localData.filter((l) => l.id !== did);

    localStorage.setItem("Medicine", JSON.stringify(Ddata))
    setData(Ddata);
    setDOpen(false);

    console.log(Ddata);
  }


  useEffect(() => {
    localData();
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
    setUpdate(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleadd = (values) => {

    let localData = JSON.parse(localStorage.getItem("Medicine"))

    let id = Math.floor(Math.random() * 100);

    let data = { id: id, ...values }

    console.log(localData, data);

    if (localData === null) {
      localStorage.setItem("Medicine", JSON.stringify([data]))
    } else {
      localData.push(data);
      localStorage.setItem("Medicine", JSON.stringify(localData))
    }

    setOpen(false);
    formik.resetForm();
  }

  let schema = yup.object().shape({
    name: yup.string().required('Please enter your name'),
    price: yup.number().required('Please enter your price'),
    qty: yup.string().required('Please enter your qty'),
    expiry: yup.string().required('Please enter your expiry'),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: '',
      qty: '',
      price: '',
      expiry: '',

    },
    onSubmit: values => {
      handleadd(values);
    },
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'qty',
      headerName: 'Qnatity',
      type: 'number',
      width: 90,
    },
    {
      field: 'expiry',
      headerName: 'Expiry',
      type: 'number',
      width: 90,
    },
    {
      field: '',
      headerName: 'Action',
      width: 110,
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



  const { handleChange, handleSubmit, errors, touched, values, handleBlur } = formik;



  return (
    <div>
      <h1>Medicine Admin Component</h1>
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
          <DialogTitle>Medicine</DialogTitle>
          <Formik value={formik}>
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  name="name"
                  label="Medicine"
                  fullWidth
                  variant="standard"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.name && touched.name ? errors.name : ''}</p>
                <TextField
                  margin="dense"
                  id="price"
                  name="price"
                  label="Medicine Price"
                  fullWidth
                  variant="standard"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.price && touched.price ? errors.price : ''}</p>
                <TextField
                  margin="dense"
                  id="qty"
                  name="qty"
                  label="Medicine Quantity"
                  fullWidth
                  variant="standard"
                  value={values.qty}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.qty && touched.qty ? errors.qty : ''}</p>
                <TextField
                  margin="dense"
                  id="expiry"
                  name="expiry"
                  label="Medicine Expiry"
                  fullWidth
                  variant="standard"
                  value={values.expiry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.expiry && touched.expiry ? errors.expiry : ''}</p>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type='submit'>{update ? "Updata" : "Add"}</Button>
                </DialogActions>
              </DialogContent>
            </Form>
          </Formik>
        </Dialog>
        <Dialog open={dopen} onClose={handleClose}>
          <DialogTitle>Delete Medicine</DialogTitle>
          <DialogContent>
            Are You Sure Delete Data
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={() => handledeletedata()}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default MedicineAdmin;