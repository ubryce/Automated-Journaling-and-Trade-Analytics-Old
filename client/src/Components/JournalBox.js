import React from 'react';
import { JournalState } from '../Context/JournalProvider'
import { Box } from "@chakra-ui/layout";

import SingleJournal from "./SingleJournal";

const JournalBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedJournal } = JournalState()
    return (
        <Box
            d={{ base: selectedJournal ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="white"
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
            >
            <SingleJournal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    )
};

export default JournalBox;