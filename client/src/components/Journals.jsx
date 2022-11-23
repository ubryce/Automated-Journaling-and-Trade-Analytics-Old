import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

const Journals = () => {
  const { user, journals, setJournals, selectedJournal, setSelectedJournal } = useStateContext()
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