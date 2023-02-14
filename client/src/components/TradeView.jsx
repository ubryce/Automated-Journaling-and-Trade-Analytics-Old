import React from 'react'
import {useEffect} from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {useStateContext} from '../contexts/ContextProvider';

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const TradeView = () => {
    const {user, selectedTrade, selectedJournal} = useStateContext();
    const navigate = useNavigate();
    
    useEffect(() => {
    }, []);
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <Tooltip title="Back">
                        <IconButton onClick={() => navigate(`/dashboard/journal/${selectedJournal._id}`)}>
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton>
                            <EditIcon/>
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