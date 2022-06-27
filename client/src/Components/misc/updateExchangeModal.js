import { ViewIcon } from "@chakra-ui/icons";
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { JournalState } from "../../Context/JournalProvider";
import React from 'react';

const UpdateExchangeModal = ({fetchAgain, setFetchAgain, fetchTrades}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [exchangeName, setExchangeName] = useState();
    const [exchangeAPI, setExchangeAPI] = useState();
    const [exchangeSecret, setExchangeSecret] = useState();
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const [APILoading, setAPILoading] = useState(false);
    const [secretLoading, setSecretLoading] = useState(false);
    const toast = useToast();

    const { selectedExchange, setSelectedExchange, user } = JournalState();

    const handleRename = async () => {
        if (!exchangeName) return

        try {
            setRenameLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.put('/api/exchange/rename', {
                exchangeId: selectedExchange._id,
                exchangeName: exchangeName,
            }, config);

            setSelectedExchange(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);

        } catch (error) {
            toast({
                title: "Error occured",
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            setRenameLoading(false);
        }
        
        setExchangeName('');
    };

    const handleAPI = async () => {
        if (!exchangeAPI) return

        try {
            setAPILoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.put('/api/exchange/apikey', {
                exchangeId: selectedExchange._id,
                exchangeAPI: exchangeAPI,
            }, config);

            setSelectedExchange(data);
            setFetchAgain(!fetchAgain);
            setAPILoading(false);

        } catch (error) {
            toast({
                title: "Error occured",
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            
            setAPILoading(false);
        }
        
        setExchangeAPI('');
    };

    const handleSecret = async () => {
        if (!exchangeSecret) return

        try {
            setSecretLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.put('/api/exchange/secret', {
                exchangeId: selectedExchange._id,
                exchangeSecret: exchangeSecret,
            }, config);

            setSelectedExchange(data);
            setFetchAgain(!fetchAgain);
            setSecretLoading(false);

        } catch (error) {
            toast({
                title: "Error occured",
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            
            setSecretLoading(false);
        }
        
        setExchangeSecret('');
    };

    const handleDelete = async () => {
        
    };

    return (
        <>
            <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader
                    fontSize="35px"
                    fontFamily="Work sans"
                    d="flex"
                    justifyContent="center"
                >
                    {selectedExchange.exchangeName}
                </ModalHeader>

                <ModalCloseButton />
                <ModalBody d="flex" flexDir="column" alignItems="center">
                    <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                    {/* {selectedExchange.users.map((u) => (
                        <UserBadgeItem
                        key={u._id}
                        user={u}
                        admin={selectedJournal.journalAdmin}
                        handleFunction={() => handleRemove(u)}
                        />
                    ))} */}
                    </Box>
                    <FormControl d="flex">
                        <Input
                            placeholder={selectedExchange.exchangeName}
                            mb={3}
                            value={exchangeName}
                            onChange={(e) => setExchangeName(e.target.value)}
                        />
                        <Button
                            variant="solid"
                            colorScheme="teal"
                            ml={1}
                            isLoading={renameLoading}
                            onClick={handleRename}
                        >
                            Update
                        </Button>
                        <Input
                            placeholder={selectedExchange.exchangeAPI}
                            mb={3}
                            value={exchangeAPI}
                            onChange={(e) => setExchangeAPI(e.target.value)}
                        />
                        <Button
                            variant="solid"
                            colorScheme="teal"
                            ml={1}
                            isLoading={APILoading}
                            onClick={handleAPI}
                        >
                            Update
                        </Button>
                        <Input
                            placeholder= "Exchange Secret"
                            mb={3}
                            value={exchangeSecret}
                            onChange={(e) => setExchangeSecret(e.target.value)}
                        />
                        <Button
                            variant="solid"
                            colorScheme="teal"
                            ml={1}
                            isLoading={secretLoading}
                            onClick={handleSecret}
                        >
                            Update
                        </Button>
                    </FormControl>
                    
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => handleDelete(user)} colorScheme="red">
                        Delete Exchange API
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default UpdateExchangeModal;