import React, { useEffect, useState } from 'react';
//import { JournalState } from '../Context/JournalProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";

import JournalLoading from './JournalLoading';
//import GroupExchangeModal from './misc/GroupExchangeModal';

const MyExchanges = ({fetchAgain}) => {
    const [ loggedUser, setLoggedUser ] = useState();
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchangess } = ExchangeState();
    const toast = useToast();

    const fetchExchanges = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            //const {data} = await axios.get("/api/journal", config);
            setExchanges(data);
        } catch (error) {
            toast({
                title: "Error occured",
                description: "Failed to load the Exchanges",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            })
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchExchangess();
    }, [fetchAgain]);

    return (
        <Box
            d={{ base: selectedExchange ? "none" : "flex", md: "flex" }}
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
                My Exchanges
                <GroupExchangeModal>
                    <Button
                        d="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />}>
                        New Exchange
                    </Button>
                </GroupExchangeModal>
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
                {exchanges ? (
                    <Stack overflowY='scroll'>
                        {exchanges.map((exchange) => (
                            <Box
                                onClick={() => setSelectedExchange(exchange)}
                                cursor="pointer"
                                bg={selectedExchange === exchange ? "#38B2AC" : "#E8E8E8"}
                                color={selectedExchange === exchange ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={exchange._id}>
                                <Text>
                                    {exchange.exchangeName}
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

export default MyExchanges;