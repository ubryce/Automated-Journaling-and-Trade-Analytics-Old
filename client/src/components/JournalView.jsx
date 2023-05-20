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

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// TODO Add filtering
const JournalView = () => {
    const {selectedJournal, selectedTrades, setSelectedTrades, user, setSelectedTrade, visibility} = useStateContext()
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
                        <Link to={`/dashboard/journal/${selectedJournal._id}/add`} onClick={() => setSelectedTrade(null)}>
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
                                <TableCell>Size</TableCell>
                                <TableCell>Side</TableCell>
                                <TableCell>Exchange</TableCell>
                                <TableCell>Symbol</TableCell>
                                <TableCell>Avg Entry</TableCell>
                                <TableCell>Exit</TableCell>
                                <TableCell>PnL</TableCell>
                                <TableCell>Setup Tags</TableCell>
                                <TableCell>Mistake Tags</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedTrades?.map((trades) => (
                                <TableRow key={trades._id} component={Link} to={trades._id} onClick={() => setSelectedTrade(trades)}>
                                    <TableCell>{`${trades.size}`}</TableCell>
                                    <TableCell>{`${trades.side}`}</TableCell>
                                    <TableCell>{`${trades.exchange}`}</TableCell>
                                    <TableCell>{`${trades.symbol}`}</TableCell>
                                    <TableCell>{`${trades.avgEntry}`}</TableCell>
                                    <TableCell>{`${trades.exit}`}</TableCell>
                                    <TableCell>{visibility ? `${trades.pnl}` : "Hidden"}</TableCell>
                                    <TableCell>
                                        {trades.tags
                                            .filter((tag) => tag.tagType === 'setup')
                                            .map((tag, index) => (
                                            <span key={index}>{`${tag.tag}, `}</span>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {trades.tags
                                            .filter((tag) => tag.tagType === 'mistake')
                                            .map((tag, index) => (
                                                <span key={index}>{`${tag.tag}, `}</span>
                                            ))}
                                    </TableCell>
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