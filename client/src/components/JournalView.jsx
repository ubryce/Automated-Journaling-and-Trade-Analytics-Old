import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';


const JournalView = () => {
  const { selectedJournal } = useStateContext()

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