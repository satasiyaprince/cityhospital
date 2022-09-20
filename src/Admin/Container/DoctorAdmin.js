import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DoctorAdmin(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <h1>Doctor Admin Page</h1>
            <br />
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Doctor</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name='name'
                            label="Docter Name"
                            fullWidth
                            variant="standard"
                        />
                           <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name='name'
                            label="Docter Number"
                            fullWidth
                            variant="standard"
                        />
                           <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name='name'
                            label="Docter Age"
                            fullWidth
                            variant="standard"
                        />
                           <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name='name'
                            label="Docter Weight"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default DoctorAdmin;