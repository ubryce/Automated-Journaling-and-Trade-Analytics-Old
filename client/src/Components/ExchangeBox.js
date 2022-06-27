import React from 'react';
import { JournalState } from '../Context/JournalProvider'
import { Box } from "@chakra-ui/layout";

import SingleExchange from "./SingleExchange";

const ExchangeBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedExchange } = JournalState()
    return (
        <Box
            d={{ base: selectedExchange ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="white"
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
            >
            <SingleExchange fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    )
};

export default ExchangeBox;