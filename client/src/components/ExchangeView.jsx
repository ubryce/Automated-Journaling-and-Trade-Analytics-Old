import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const ExchangeView = () => {
    const { selectedExchange } = useStateContext()
    let navigate = useNavigate();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Tooltip title="Back">
                        <IconButton onClick={() => navigate("/dashboard/exchange")}>
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