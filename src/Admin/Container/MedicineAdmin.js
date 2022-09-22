import React from 'react';
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

function MedicineAdmin(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleadd = (values) => {
    setOpen(false);
    console.log(values);
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


  const { handleChange, handleSubmit, errors, touched, handleBlur } = formik;


  return (
    <div>
      <h1>Medicine Admin Component</h1>
      <br />
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.expiry && touched.expiry ? errors.expiry : ''}</p>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type='submit'>Add</Button>
                </DialogActions>
              </DialogContent>
            </Form>
          </Formik>
        </Dialog>
      </div>
    </div>
  );
}

export default MedicineAdmin;