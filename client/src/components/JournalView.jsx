import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';


const JournalView = () => {
  const { selectedJournal, selectedTrades, setSelectedTrades, user } = useStateContext()

  const fetchTrades = async () => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        console.log(selectedJournal._id)
        const {data} = await axios.get(`/api/trade/${selectedJournal._id}`, config);
        // setJournals(data);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                Name: 
                {selectedJournal.journalName}
                Description: 
                {selectedJournal.journalDescription}
            </Paper>
        </Grid>
    </Grid>
  )
}

export default JournalView