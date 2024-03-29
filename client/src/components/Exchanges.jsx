import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

import Links from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';

const Exchanges = () => {
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchanges } = useStateContext();
    const navigate = useNavigate();

    const handleEditSubmit = async (exchangeIdEdit) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                data: {
                    exchangeId: exchangeIdEdit,
                }
            };
            console.log(config)
            await axios.delete('/api/exchange', config);

            fetchExchanges();
            console.log("deleted")
        } catch (error) {
            console.log("failed to delete exchange")
        }
    };

    const handleDeleteSubmit = async (exchangeIdDelete) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                data: {
                    exchangeId: exchangeIdDelete,
                }
            };
            console.log(config)
            await axios.delete('/api/exchange', config);

            fetchExchanges();
            console.log("deleted")
        } catch (error) {
            console.log("failed to delete exchange")
        }
    };

    const fetchExchanges = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get("/api/exchange", config);
            setExchanges(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    function preventDefault(event) {
        event.preventDefault();
    }

    useEffect(() => {
        fetchExchanges();
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                Exchanges
                <Button variant="contained" onClick={() => navigate('/dashboard/exchange/add')}>+ Add an Exchange</Button>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {exchanges.map((exchange) => (
                        <TableRow key={exchange._id} onClick={() => setSelectedExchange(exchange)}>
                            <Link to={exchange._id}>
                                <TableCell>{exchange.exchangeName}</TableCell>
                                <TableCell>{exchange.exchangeAPI}</TableCell>
                                <TableCell>{exchange.exchange}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">{`$${exchange.amount}`}</TableCell>
                            </Link>
                            <Tooltip title="Edit">
                                <IconButton onClick={() => handleEditSubmit(exchange._id)}>
                                <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => handleDeleteSubmit(exchange._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Links color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                    See more orders
                </Links>
                </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Exchanges