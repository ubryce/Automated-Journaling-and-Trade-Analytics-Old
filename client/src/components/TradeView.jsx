import React from 'react'
import {useEffect} from 'react';
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
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Links from "@mui/material/Link";

const TradeView = () => {
    const {user, selectedTrade} = useStateContext();
    const navigate = useNavigate();
    
    useEffect(() => {
    }, []);
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <Tooltip title="Back">
                        <IconButton onClick={() => navigate("/dashboard/journal/")}>
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                    </Tooltip>
                    Trade View
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Size</TableCell>
                                <TableCell>Side</TableCell>
                                <TableCell>Exchange</TableCell>
                                <TableCell>Symbol</TableCell>
                                <TableCell>Avg Entry</TableCell>
                                <TableCell>Exit</TableCell>
                                <TableCell>Tags</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={selectedTrade._id}>
                                <TableCell>{`${selectedTrade.size}`}</TableCell>
                                <TableCell>{`${selectedTrade.side}`}</TableCell>
                                <TableCell>{`${selectedTrade.exchange}`}</TableCell>
                                <TableCell>{`${selectedTrade.symbol}`}</TableCell>
                                <TableCell>{`${selectedTrade.avgEntry}`}</TableCell>
                                <TableCell>{`${selectedTrade.exit}`}</TableCell>
                                <TableCell>{`${selectedTrade.tags}`}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {selectedTrade.thread.map((thread, index) => {
                        return (
                            <div key={index}>
                                {thread.content}
                                {thread.picture && <img src={thread.picture} width="100%"/>}
                            </div>);
                    })}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default TradeView