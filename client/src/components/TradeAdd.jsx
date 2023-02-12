import React from 'react'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {useStateContext} from '../contexts/ContextProvider';

import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Tooltip from "@mui/material/Tooltip";

const theme = createTheme();

// TODO change required
// Check data types
const TradeAdd = () => {
    const {selectedJournal, user} = useStateContext();
    const navigate = useNavigate();
    const [ selectedTags, setSelectedTags ] = React.useState([])

    function preventDefault(event) {
        event.preventDefault();
    }

    const tags = [
        "tech", "early"
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const tradeData = {
            user: user._id,
            journalId: selectedJournal._id,
            openDate: new Date(data.get("openDate")),
            closeDate: new Date(data.get("closeDate")),
            side: data.get("side"),
            exchange: data.get("exchange"),
            symbol: data.get("symbol"),
            avgEntry: data.get("avgEntry"),
            stop: data.get("stop"),
            target: data.get("target"),
            exit: data.get("exit"),
            size: data.get("size"),
            sizeFiat: data.get("sizeFiat"),
            walletBalance: data.get("walletBalance"),
            accRisk: data.get("accRisk"),
            confidence: data.get("confidence"),
            plannedRisk: data.get("plannedRisk"),
            finalRisk: data.get("finalRisk"),
            isOpen: data.get("isOpen"),
            tags: selectedTags,
            thread: [
                {
                    content: data.get("threadContent"),
                    picture: data.get("threadPicture"),
                },
            ],
        };

        console.log(tradeData);

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const {data2} = await axios.post(
            "/api/trade", tradeData, config
        ).then((response) => {
            console.log(response.data)
            navigate(`/dashboard/journal/${selectedJournal._id}`);
        }, (error) => {
            console.log(error.message)
        }) || {}
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <ThemeProvider theme={theme}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline/>
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Tooltip title="Back">
                                        <IconButton onClick={() => navigate(`/dashboard/journal/${selectedJournal._id}`)}>
                                            <ArrowBackIosNewIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Typography component="h1" variant="h5">
                                        New Trade Entry
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="exchange"
                                                    label="Exchange"
                                                    name="exchange"
                                                    autoComplete="exchange"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="opendate"
                                                    label="Open Date"
                                                    id="opendate"
                                                    type="datetime-local"
                                                    autoComplete="opendate"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="closedate"
                                                    label="Close Date"
                                                    id="closedate"
                                                    type="datetime-local"
                                                    autoComplete="closedate"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="side"
                                                    label="Side"
                                                    id="side"
                                                    autoComplete="side"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="symbol"
                                                    label="Symbol"
                                                    id="symbol"
                                                    autoComplete="symbol"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="avgEntry"
                                                    label="Entry"
                                                    id="avgEntry"
                                                    autoComplete="avgEntry"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="stop"
                                                    label="Stop"
                                                    id="stop"
                                                    autoComplete="stop"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="target"
                                                    label="Target"
                                                    id="target"
                                                    autoComplete="target"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="exit"
                                                    label="Exit"
                                                    id="exit"
                                                    autoComplete="exit"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="size"
                                                    label="Size"
                                                    id="size"
                                                    autoComplete="size"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="sizeFiat"
                                                    label="Size Fiat"
                                                    id="sizeFiat"
                                                    autoComplete="sizeFiat"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="walletBalance"
                                                    label="Wallet Balance"
                                                    id="walletBalance"
                                                    autoComplete="walletBalance"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="accRisk"
                                                    label="Account Risk"
                                                    id="accRisk"
                                                    autoComplete="accRisk"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="confidence"
                                                    label="Confidence"
                                                    id="confidence"
                                                    autoComplete="confidence"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="plannedRisk"
                                                    label="Planned Risk"
                                                    id="plannedRisk"
                                                    autoComplete="plannedRisk"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="finalRisk"
                                                    label="Final Risk"
                                                    id="finalRisk"
                                                    autoComplete="finalRisk"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="isOpen"
                                                    label="Open"
                                                    id="isOpen"
                                                    autoComplete="isOpen"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    multiple
                                                    name="tags"
                                                    id="tags"
                                                    options={tags.map((option) => option)}
                                                    freeSolo
                                                    onChange={(event, newValue) => {
                                                        setSelectedTags(newValue);
                                                    }}
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, index) => (
                                                            <Chip variant="outlined"
                                                                  label={option} {...getTagProps({index})} />
                                                        ))
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Tags"
                                                            placeholder="Favorites"
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="threadContent"
                                                    label="Thread Content"
                                                    id="threadContent"
                                                    autoComplete="threadContent"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="threadPicture"
                                                    label="Thread Picture"
                                                    id="threadPicture"
                                                    autoComplete="threadPicture"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
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

export default TradeAdd