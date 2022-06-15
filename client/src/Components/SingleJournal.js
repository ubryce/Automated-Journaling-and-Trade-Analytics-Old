import REact from 'react';
import { JournalState } from '../Context/JournalProvider';
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./misc/ProfileModal";


const SingleJournal = ({fetchAgain, setFetchAgain}) => {
    const { user, selectedJournal, setSelectedJournal } = JournalState();
    return (
        <>
            {selectedJournal ? (
                <>
                    <Text
                        fontSize={{ base:"28px", md:"30px"}}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center">
                        <IconButton
                            d={{ base: "flex", md: "none"}}
                            icon={<ArrowBackIcon/>}
                            onClick={() => setSelectedJournal("")}/>
                        {selectedJournal.journalName.toUpperCase()}
                    </Text>
                </>
            ) : (
                <Box d="flex" alignItems="center" justifyContent='center' h='100%'>
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start Journal
                    </Text>
                </Box>
            )}
        </>
    )
};

export default SingleJournal;