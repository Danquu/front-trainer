import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Traininglist() {

    const [training, setTraining] = useState([]);


    
    const fetchTraining = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings').then(async response => {
            try {
                const data = await response.json();               
                setTraining(data.content);
            } catch (error) {
            }
    })
}

    const columns = [

        { field: 'activity', sortable: true, filter: true },
        { field: 'date', sortable: true, filter: true,
          cellRenderer: params => { return moment(params.value).format('DD/MM/YYYY HH:mm')}},
        { field: 'duration', sortable: true, filter: true },
    ]

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
