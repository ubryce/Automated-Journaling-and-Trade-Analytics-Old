import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

const Journals = () => {
  const { user, journals, setJournals, selectedJournal, setSelectedJournal } = useStateContext()

  const fetchJournals = async () => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const {data} = await axios.get("/api/journal", config);
        setJournals(data);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchJournals();
    setSelectedJournal();
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Journals