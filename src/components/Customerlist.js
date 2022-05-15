import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';

import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Customerlist () {

    const [customer, setCustomer] = useState([]);

    

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers').then(async response => {
            try {
                const data = await response.json();
                console.log(data.content);
                setCustomer(data.content);
            } catch (error) {
                console.error(error);
            }
    })
}

    const columns = [

        {
            headerName: '',
            field: "links.0.href",
            width: 95,
            cellRendererFramework: params =>
             <Editcustomer link={params.value} customer={params.data} updateCustomer={updateCustomer}/>
        },
    
        {
            headerName: '',
            field: "links.0.href",
            width: 115,
            cellRendererFramework: params =>
             <Button variant="contained" onClick={() => deleteCustomer(params.value)} color="error" >
             Delete
             </Button>
        },

        {
            headerName:'',
            field: 'links.0.href',
            width: 170,
            cellRendererFramework: params  =>
            <Addtraining 
                link={params.value} 
                training={params.data} 
                addTraining={addTraining}
                customerId={params.value}
            />
        },


        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        
    ]

    const deleteCustomer = (url) => {
        if (window.confirm("Would you like to delete the selected customer?")) {
            fetch(url, { method: 'DELETE' })
                .then(res => { fetchData(); alert("Deleted")})
                .catch(err => console.error(err));
        }
    }

    const addCustomer = (newCustomer) => {

        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchData())
        .catch(err => console.error(err))
    }

    const updateCustomer = (url, updatedCustomer) => {

        fetch(url,
        {
            method: 'PUT',
            body: JSON.stringify(updatedCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchData())
        .catch(err => console.error(err))
    }

    const addTraining = (newTraining) => {

        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchData())
        .catch(err => console.error(err))
}


    useEffect( () => {
        fetchData();
    }, []);

    return (
        <div className="ag-theme-material" style={{height: 800, width: '1200', marginTop: 20, margin: 'auto'}}>
            <h2>Customers</h2>
            <Addcustomer addCustomer={addCustomer}/>

            <AgGridReact
                columnDefs={columns}
                rowData={customer}
                pagination="true"
                paginationPageSize="10"
                >
            </AgGridReact>  
        </div>
    );
}