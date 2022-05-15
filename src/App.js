import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import './App.css';

function App() {

  const [value, setValue] = useState('');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal Trainer
          </Typography>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Customerlist" value="customer" />
            <Tab label="Traininglist" value="training" />

          </Tabs>
        </Toolbar>
      </AppBar>
      {value==='customer' && <div><Customerlist/></div>}
      {value==='training' && <div><Traininglist/></div>}
    </div>
  );
}

export default App;
