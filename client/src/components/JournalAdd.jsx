import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Button from '@mui/material/Button';

const theme = createTheme();

const JournalAdd = () => {
    const { selectedJournal, setSelectedJournal, user, journals, setJournals, currentColor } = useStateContext();
    const navigate = useNavigate();
    
    function preventDefault(event) {
        event.preventDefault();
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        console.log({
            name: data.get('name'),
            description: data.get('description'),
        });

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const { data2 } = await axios.post(
            "/api/journal/create", 
            {
                name: data.get('name'),
                description: data.get('description'),
            },
            config
        ).then((response) => {
            console.log(response.data)
            navigate('/dashboard/journal');
            }, (error) => {
            console.log(error.message)
            }) || {}
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
                                Create a New Journal
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    id="description"
                                    autoComplete="description"
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

export default JournalAdd