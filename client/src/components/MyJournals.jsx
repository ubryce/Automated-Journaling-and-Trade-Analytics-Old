import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import {  JournalModal, Header } from '../components';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { PlusIcon } from '@heroicons/react/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const MyJournals = ({fetchAgain}) => {
    const { selectedJournal, setSelectedJournal, user, journals, setJournals, currentColor, addJournal, setAddJournal } = useStateContext();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

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
            // toast({
            //     title: "Error occured",
            //     description: "Failed to load the Journals",
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom-left",
            // })
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchJournals();
        setSelectedJournal();
    }, [fetchAgain]);
  
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Journals" />
            <Dialog open={open} onClose={handleClose}> 
                <DialogTitle>New Journal</DialogTitle>
                <DialogContent>
                <div>
                    <TextField
                    label="Journal Name"
                    id="standard-size-normal"
                    defaultValue=""
                    variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        label="Journal Description"
                        id="standard-size-normal"
                        defaultValue=""
                        variant="standard"
                    />
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
            <div className="md:flex items-center justify-end md:flex-1">
                <PlusIcon onClick={handleOpen} className="h-6 w-6 text-gray-600 hover:drop-shadow-xl cursor-pointer" aria-hidden="true" />
            </div>
            <div>
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

            {/* <div>
                {selectedJournal ? selectedJournal.journalDescription : ""}
            </div> */}

        </div>
    )
}

export default MyJournals