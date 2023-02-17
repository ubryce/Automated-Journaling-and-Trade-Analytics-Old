import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';

const theme = createTheme();

const ExchangeAdd = () => {
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchanges } = useStateContext();
    const navigate = useNavigate();
    
    function preventDefault(event) {
        event.preventDefault();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        
        console.log({
            exchangeName: data.get('exchangeName'),
            exchangeAPI: data.get('exchangeAPI'),
            exchangeSecret: data.get('exchangeSecret'),
            exchange: data.get('exchange')
        });

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const { data2 } = await axios.post(
            '/api/exchange', 
            {
                exchangeName: data.get('exchangeName'),
                exchangeAPI: data.get('exchangeAPI'),
                exchangeSecret: data.get('exchangeSecret'),
                exchange: data.get('exchange')
            },
            config
        ).then((response) => {
            console.log(response.data)
            navigate('/dashboard/exchange');
            }, (error) => {
            console.log(error.message)
            }) || {}

        // try {
        //     const config = {
        //         headers: {
        //             Authorization: `Bearer ${user.token}`,
        //         },
        //     };

        //     const {data} = await axios.post('/api/exchange', {
        //         exchangeName: data.get('exchangeName'),
        //         exchangeAPI: data.get('exchangeAPI'),
        //         exchangeSecret: data.get('exchangeSecret'),
        //         exchange: data.get('exchange')
        //     }, config);

        //     setExchanges([data, ...exchanges]);
        //     handleClose();
        //     console.log("new exchange")
        // } catch (error) {
        //     console.log("failed to create exchange")
        // }
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <ThemeProvider theme={theme}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                                >
                                <Typography component="h1" variant="h5">
                                    Add an exchange
                                </Typography>
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                        required
                                        fullWidth
                                        id="exchangeName"
                                        label="Exchange Name"
                                        name="exchangeName"
                                        autoComplete="exchangeName"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                        required
                                        fullWidth
                                        name="exchangeAPI"
                                        label="Exchange API"
                                        id="exchangeAPI"
                                        autoComplete="exchangeAPI"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                        required
                                        fullWidth
                                        name="exchangeSecret"
                                        label="Exchange Secret"
                                        id="exchangeSecret"
                                        autoComplete="exchangeSecret"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                        required
                                        fullWidth
                                        name="exchange"
                                        label="Exchange"
                                        id="exchange"
                                        autoComplete="exchange"
                                        />
                                    </Grid>
                                    </Grid>
                                    <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    >
                                    Create
                                    </Button>
                                </Box>
                                </Box>
                            </Container>
                        </ThemeProvider>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default ExchangeAdd