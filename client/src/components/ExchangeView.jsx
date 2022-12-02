import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { useHistory } from 'react-router-dom';
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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const ExchangeView = () => {
    const { selectedExchange, user } = useStateContext()

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Tooltip title="Back">
                        <IconButton onClick={() => console.log("ran")}>
                        <ArrowBackIosNewIcon />
                        </IconButton>
                    </Tooltip>
                    Name: 
                    {selectedExchange.exchangeName}
                    Exchange: 
                    {selectedExchange.exchange}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ExchangeView