import React from 'react'
import {useStateContext} from '../contexts/ContextProvider';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react';

import Links from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const JournalView = () => {
    const {selectedJournal, selectedTrades, setSelectedTrades, user} = useStateContext()
    const navigate = useNavigate();

    const fetchTrades = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            console.log(selectedJournal._id)
            const {data} = await axios.get(`/api/trade/${selectedJournal._id}`, config);
            setSelectedTrades(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    function preventDefault(event) {
        event.preventDefault();
    }


    useEffect(() => {
        fetchTrades();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <Tooltip title="Back">
                        <IconButton onClick={() => navigate("/dashboard/journal")}>
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add Trade">
                        <Link to={`/dashboard/journal/${selectedJournal._id}/add`}>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                        </Link>
                    </Tooltip>
                    Name:
                    {selectedJournal.journalName}
                    Description:
                    {selectedJournal.journalDescription}
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
                            {selectedTrades?.map((trades) => (
                                <TableRow key={trades._id}>
                                    <Link>
                                        <TableCell>{trades.thread[0].content}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        {/* <TableCell align="right">{`$${trades.amount}`}</TableCell> */}
                                    </Link>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Links color="primary" href="#" onClick={preventDefault} sx={{mt: 3}}>
                        See more orders
                    </Links>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default JournalView