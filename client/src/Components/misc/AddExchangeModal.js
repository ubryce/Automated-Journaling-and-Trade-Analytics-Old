import React from 'react';
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
  } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { JournalState } from "../../Context/JournalProvider";

const GroupJournalModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [exchangeName, setExchangeName] = useState();
    const [exchangeAPI, setExchangeAPI] = useState();
    const [exchangeSecret, setExchangeSecret] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { user, exchanges, setExchanges } = JournalState();

    const handleSubmit = async () => {
        if (!exchangeName || !exchangeAPI || !exchangeSecret) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.post('/api/exchange', {
                exchangeName: exchangeName,
                exchangeAPI: exchangeAPI,
                exchangeSecret: exchangeSecret,
            }, config);

            setExchanges([data, ...exchanges]);
            onClose();
            toast({
                title: "Exchange API added!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            toast({
                title: "Failed to Create the Journal!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader
                    fontSize="35px"
                    fontFamily="Work sans"
                    d="flex"
                    justifyContent="center"
                >
                    Add an Exchange
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDir="column" alignItems="center">
                    <FormControl>
                    <Input
                        placeholder="Exchange Name"
                        mb={3}
                        onChange={(e) => setExchangeName(e.target.value)}
                    />
                    </FormControl>
                    <FormControl>
                    <Input
                        placeholder="Add Exchange API"
                        mb={1}
                        onChange={(e) => setExchangeAPI(e.target.value)}
                    />
                    </FormControl>
                    <FormControl>
                    <Input
                        placeholder="Add Exchange Secret"
                        mb={1}
                        onChange={(e) => setExchangeSecret(e.target.value)}
                    />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit} colorScheme="blue">
                    Add Exchange
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default GroupJournalModal;