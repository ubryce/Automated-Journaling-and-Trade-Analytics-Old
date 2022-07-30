import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { PlusIcon, PencilAltIcon } from '@heroicons/react/outline'

const MyJournals = ({fetchAgain, setFetchAgain}) => {
    const { selectedJournal, setSelectedJournal, user, journals, setJournals, currentColor } = useStateContext();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const [journalName, setJournalName] = useState();
    const [journalDescription, setJournalDescription] = useState();

    const handleSubmit = async () => {
        if (!journalName ) {
            console.log("missing name")
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.post('/api/journal/create', {
                name: journalName,
                description: journalDescription,
            }, config);

            setJournals([data, ...journals]);
            handleClose()
            console.log("new journal")
        } catch (error) {
            console.log("failed to create journal")
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
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchJournals();
        setSelectedJournal();
    }, [fetchAgain]);
  
    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth={true}> 
                <DialogTitle>New Journal</DialogTitle>
                <DialogContent>
                    <Box noValidate
                        component="form"
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                        }}
                    >
                        <div>
                            <TextField
                                label="Journal Name"
                                id="standard-size-normal"
                                defaultValue=""
                                variant="standard"
                                onChange={(e) => setJournalName(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Journal Description"
                                id="standard-size-normal"
                                defaultValue=""
                                variant="standard"
                                onChange={(e) => setJournalDescription(e.target.value)}
                            />
                        </div>
                        </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
            <div className="md:flex items-center justify-end md:flex-1">
                <PlusIcon onClick={handleOpen} className="h-6 w-6 text-gray-600 hover:drop-shadow-xl cursor-pointer" aria-hidden="true" />
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="journal-label">Journal</InputLabel>
                    <Select
                    labelId="journal-label"
                    id="journal"
                    value={selectedJournal ? selectedJournal : ""}
                    defaultValue=""
                    label="Journal"
                    onChange={(e) => setSelectedJournal(e.target.value)}
                    >
                    {journals.map((journal) => (
                        <MenuItem key={journal._id} value={journal}>{journal.journalName}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
        </>
    )
}

export default MyJournals