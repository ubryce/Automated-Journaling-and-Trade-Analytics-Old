import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

import Links from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Button from '@mui/material/Button';

const ExchangeView = () => {
    const { selectedExchange, user } = useStateContext()

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    Name: 
                    
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ExchangeView