import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { Button, JournalModal, Header, Toast } from '../components';


import { Listbox, Transition } from '@headlessui/react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { PlusIcon } from '@heroicons/react/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const MyJournals = ({fetchAgain}) => {
    const { selectedJournal, setSelectedJournal, user, journals, setJournals, currentColor, addJournal, setAddJournal } = useStateContext();

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
            <JournalModal />
            <div className="md:flex items-center justify-end md:flex-1">
                <Button customFunc={() => setAddJournal(true)} color="white" bgColor={currentColor} text="Create a Journal" borderRadius="10px" size="md" />
                <PlusIcon onClick={() => setAddJournal(true)} className="h-6 w-6 text-gray-600 hover:drop-shadow-xl cursor-pointer" aria-hidden="true" />
            </div>
            <div>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-helper-label">Journal</InputLabel>
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