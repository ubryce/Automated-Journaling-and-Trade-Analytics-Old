import React, { useEffect, useState } from 'react';
import { JournalState } from '../Context/JournalProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import JournalLoading from './JournalLoading';
import GroupJournalModal from './misc/GroupJournalModal';

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
            console.log(data);
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

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchJournals();
    }, []);

    return (
        <Box
            d={{ base: selectedJournal ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px">
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                d="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center">
                My Journals
                <GroupJournalModal>
                    <Button
                        d="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}>
                        New Journal
                    </Button>
                </GroupJournalModal>
            </Box>
            <Box
                d="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden">
                {journals ? (
                    <Stack overflowY='scroll'>
                        {journals.map((journal) => (
                            <Box
                                onClick={() => setSelectedJournal(journal)}
                                cursor="pointer"
                                bg={selectedJournal === journal ? "#38B2AC" : "#E8E8E8"}
                                color={selectedJournal === journal ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={journal._id}>
                                <Text>
                                    {journal.journalName}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <JournalLoading/>
                )}
            </Box>
        </Box>
    )
};

export default MyJournal;