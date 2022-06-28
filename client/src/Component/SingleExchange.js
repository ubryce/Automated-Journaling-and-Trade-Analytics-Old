import React from 'react';
import { JournalState } from '../Context/JournalProvider';
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { IconButton, Spinner, Toast, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./misc/ProfileModal";
import UpdateExchangeModal from './misc/updateExchangeModal';
import './styles.css';
import ScrollableJournal from './ScrollableJournal';


const SingleExchange = ({fetchAgain, setFetchAgain}) => {
    const { user, selectedExchange, setSelectedExchange } = JournalState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    // const sendTrade = async (event) => {
    //     if (event.key === "Enter" && newTrade) {
    //         try {
    //             const config = {
    //                 headers: {
    //                     "Content-Type":"application/json",
    //                     Authorization:`Bearer ${user.token}`,
    //                 },
    //             };

    //             setNewTrade("");
    //             const {data} = await axios.post('/api/trade', {
    //                 thread: { content: newTrade,
    //                     picture: ""},
    //                 journalId: selectedJournal._id,
    //             }, config);

    //             setTrades([...trades, data]);
    //         } catch (error) {
    //             toast({
    //                 title: "Error occured",
    //                 description: "Failed to send the trade",
    //                 status: "error",
    //                 duration: 5000,
    //                 isClosable: true,
    //                 position: "bottom",
    //             });
    //         }
    //     }
    // };

    // const typingHandler = (e) => {
    //     setNewTrade(e.target.value);
    // };

    const fetchTrades = async () => {
    //     if (!selectedJournal) return;

    //     try {
    //         const config = {
    //             headers: {
    //                 Authorization:`Bearer ${user.token}`,
    //             },
    //         };

    //         setLoading(true);

    //         const {data} = await axios.get(`/api/trade/${selectedJournal._id}`, config);

    //         setTrades(data);
    //         setLoading(false);
    //     } catch (error) {
    //         toast({
    //             title: "Error occured",
    //             description: "Failed to send the trade",
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom",
    //         });
    //     }
    };

    // useEffect(() => {
    //     fetchTrades();
    // }, [selectedJournal])

    return (
        <>
            {selectedExchange ? (
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
                            onClick={() => setSelectedExchange("")}/>
                        {selectedExchange.exchangeName.toUpperCase()}
                        <UpdateExchangeModal
                            fetchAgain={fetchAgain}
                            setFetchAgain={setFetchAgain}
                            fetchTrades={fetchTrades}/>
                        {selectedExchange.exchangeAPI}
                    </Text>
                    <Box
                        d="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w='100%'
                        h='100%'
                        borderRadius='lg'
                        overflowY="hidden">
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"/>
                        ) : (
                            <div className='trades'>
                                {/* <ScrollableJournal trades={trades}></ScrollableJournal> */}
                            </div>
                        )}
                        {/* <FormControl
                            onKeyDown={sendTrade}
                            isRequired
                            mt={3}>
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a trade"
                                onChange={typingHandler}
                                value={newTrade}/>
                        </FormControl> */}
                    </Box>
                </>
            ) : (
                <Box d="flex" alignItems="center" justifyContent='center' h='100%'>
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on an exchange
                    </Text>
                </Box>
            )}
        </>
    )
};

export default SingleExchange;