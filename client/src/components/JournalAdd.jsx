import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';

const JournalAdd = () => {
    const navigate = useNavigate();
    function preventDefault(event) {
        event.preventDefault();
      }
  return (
    <div>
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            New Journal
            <Button variant="contained" onClick={() => navigate('/dashboard/journal')}>Create</Button>
            
            </Paper>
            </Grid>
        </Grid>
    </div>
  )
}

export default JournalAdd