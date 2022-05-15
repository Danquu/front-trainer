import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns';


export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: new Date(), 
        activity: '',
        duration: '',
        customer: props.customerId
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

    const handleDateChange = (value) => {
        setTraining({ ...training, date: value })
    }


    return (
        <div>
        
        <Button color="secondary" variant="contained" onClick={handleClickOpen}>
            Add training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training</DialogTitle>
            <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <InputLabel id="datetime-label">Date and time</InputLabel>
                        <DateTimePicker 
                            renderInput={(props) => <TextField {...props} />}
                            labelId="datetime-label"
                            name="date"
                            value={training.date}
                            onChange={(value) => handleDateChange(value)}
                            format="dd.mm.yyyy hh:mm"
                            variant="standard"
                            fullWidth
                        />
                    </LocalizationProvider>
            <TextField
                margin="dense"
                label="Activity"
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                fullWidth
            />
            <TextField
                margin="dense"
                label="Duration (min)"
                name="duration"
                value={training.duration}
                onChange={inputChanged}
                fullWidth
            />
            
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}