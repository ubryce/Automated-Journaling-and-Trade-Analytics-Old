import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { Button, JournalModal, Header } from '../components';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
            {/* <JournalModal /> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                </Box>
            </Modal>
            <div className="md:flex items-center justify-end md:flex-1">
                <Button customFunc={() => setAddJournal(true)} color="white" bgColor={currentColor} text="Create a Journal" borderRadius="10px" size="md" />
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