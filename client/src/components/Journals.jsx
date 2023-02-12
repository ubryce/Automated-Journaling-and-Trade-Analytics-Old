import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, useNavigate, Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {useStateContext} from '../contexts/ContextProvider';

import Links from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import {Edit} from "@mui/icons-material";
import {Icon} from "@mui/material";

const Journals = () => {
    const {user, journals, setJournals, selectedJournal, setSelectedJournal} = useStateContext()
    const navigate = useNavigate();
    const [journalName, setJournalName] = useState("");
    const [journalDescription, setJournalDescription] = useState("");
    const [editingJournalId, setEditingJournalId] = useState(null);

    const handleEditSubmit = async (journalIdEdit) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                data: {
                    journalId: journalIdEdit,
                    journalName: journalName,
                    journalDescription: journalDescription
                }
            };

            // await axios.delete('/api/journal', config);
            // fetchJournals();
            console.log("edited")

        } catch (error) {
            console.log("failed to edit journal")
        }
    };

    const handleDeleteSubmit = async (journalIdDelete) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                data: {
                    journalId: journalIdDelete,
                }
            };

            await axios.delete('/api/journal', config);
            fetchJournals();
            console.log("deleted")

        } catch (error) {
            console.log("failed to delete journal")
        }
    };

    const fetchJournals = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get("/api/journal", config);
            setJournals(data);
            console.log(data)

        } catch (error) {
            console.log(error);
        }
    };

    function preventDefault(event) {
        event.preventDefault();
    }

    useEffect(() => {
        fetchJournals();
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        Journals
                        <Button variant="contained" onClick={() => navigate('/dashboard/journal/add')}>+ Create a
                            Journal</Button>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {journals.map((journal) => (
                                    <>
                                        <TableRow component={Link}
                                                  to={editingJournalId === journal._id ? null : journal._id}
                                                  key={journal._id}
                                                  onClick={() => editingJournalId !== journal._id && setSelectedJournal(journal)}
                                                  style={{ cursor: editingJournalId === journal._id ? 'default' : 'pointer'}}>
                                            <TableCell>
                                                {editingJournalId === journal._id ? (
                                                    <TextField value={journalName}
                                                               onChange={(event) => setJournalName(event.target.value)}
                                                               onClick={preventDefault}/>
                                                ) : (
                                                    journal.journalName
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {editingJournalId === journal._id ? (
                                                    <TextField value={journalDescription}
                                                               onChange={(event) => setJournalDescription(event.target.value)}
                                                               onClick={preventDefault}/>
                                                ) : (
                                                    journal.journalDescription
                                                )}
                                            </TableCell>

                                        </TableRow>
                                        {editingJournalId === journal._id ? (
                                            <>
                                                <Tooltip title="Done">
                                                    <IconButton onClick={() => handleEditSubmit(journal._id)}>
                                                        <DoneIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Clear">
                                                    <IconButton onClick={() => setEditingJournalId(null)}>
                                                        <ClearIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </>
                                        ) : (
                                            <>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => setEditingJournalId(journal._id)}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleDeleteSubmit(journal._id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Tooltip>
                                                </>
                                            )}
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                        <Links color="primary" href="#" onClick={preventDefault} sx={{mt: 3}}>
                            See more orders
                        </Links>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Journals