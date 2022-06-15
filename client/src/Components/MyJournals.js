import React, { useState } from 'react';
import { JournalState } from '../Context/JournalProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const MyJournal = () => {
    const [ loggedUser, setLoggedUser ] = useState();
    const { selectedJournal, setSelectedJournal, user, journals, setJournals } = JournalState();
    const toast = useToast();

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
            toast({
                title: "Error occured",
                description: "Failed to load the Journals",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    }
    return (
        <div>
            My Journal
        </div>
    )
};

export default MyJournal;