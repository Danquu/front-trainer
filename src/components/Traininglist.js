import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import Button from '@mui/material/Button';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Traininglist() {

    const [training, setTraining] = useState([]);


    
    const fetchTraining = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTraining(data))
            .catch(err => console.error(err))

    }


    const columns = [
        { cellRenderer: function (params) {
            return (
                <Button variant="contained" onClick={() => deleteTraining(params.data.id)} color="error">Delete</Button>);

        }
    },
        { field: 'activity', sortable: true, filter: true },
        { field: 'date', sortable: true, filter: true,
          cellRenderer: params => { return moment(params.value).format('DD/MM/YYYY HH:mm')}},
        { field: 'duration', sortable: true, filter: true },
        { field: 'customer.firstname', sortable: true, filter: true},
        { field: 'customer.lastname', sortable: true, filter: true},
        
]

    const deleteTraining = (id) => {
        if (window.confirm("Are you sure about deleting this training?")) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id,  { method: 'DELETE' })
                .then(res => { fetchTraining(); alert("Training deleted succesfully!")})
                .catch(error => console.error(error));
    }
}
    /*const addTraining = (newTraining) => {

        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchTraining())
        .catch(err => console.error(err))
}*/


    useEffect( () => {
        fetchTraining();
    }, []);

    return (
        <div className="ag-theme-material" style={{height: 800, width: '1200', marginTop: 20, margin: 'auto'}}>
            <h2>Trainings</h2>
            <AgGridReact
                columnDefs={columns}
                rowData={training}
                pagination="true"
                paginationPageSize="10"
                >
            </AgGridReact>  
        </div>
    );
}
