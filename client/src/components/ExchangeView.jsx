import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const ExchangeView = () => {
    const { selectedExchange, user } = useStateContext()
    let navigate = useNavigate();

    const fetchExchangeData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            console.log(selectedExchange._id)
            const {data} = await axios.get(`/api/exchange/${selectedExchange._id}`, config);
            
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExchangeData();
    }, []);

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