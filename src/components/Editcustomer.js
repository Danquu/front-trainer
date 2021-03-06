import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCustomer(props) {

    const[open, setOpen] = React.useState(false);
    const[customer, setCustomer] = React.useState({

        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.updateCustomer(props.link, customer);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
             Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">EDIT CUSTOMER</DialogTitle>
            <DialogContent>
                <DialogContentText> 
                    Edit Current Customer Infomation 
                </DialogContentText>
                <TextField
                margin="dense"
                label="Firstname"
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}
                fullWidth
                />
                <TextField
                margin="dense"
                label="Lastname"
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}
                fullWidth
                />
                <TextField
                margin="dense"
                label="Street Address"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={inputChanged}
                fullWidth
                />
                <TextField
                margin="dense"
                label="Post Code"
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}
                fullWidth
                />
                <TextField
                margin="dense"
                label="City"
                name="city"
                value={customer.city}
                onChange={inputChanged}
                fullWidth
                />
                <TextField
                margin="dense"
                label="Email"
                name="email"
                value={customer.email}
                onChange={inputChanged}
                fullWidth
                />
                <TextField
                margin="dense"
                label="Phone"
                name="phone"
                value={customer.phone}
                onChange={inputChanged}
                fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save Edit
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}