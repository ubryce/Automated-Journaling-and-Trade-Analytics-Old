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
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupJournalModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupJournalName, setGroupJournalName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { user, journals, setJournals } = JournalState();

    const handleSearch = async (query) => {
        setSearch(query)
        if (!query) {
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/user?search=${search}`, config);
            
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const handleSubmit = async () => {
        if (!groupJournalName || !selectedUsers) {
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

            const {data} = await axios.post('/api/journal/group', {
                name: groupJournalName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
            }, config);

            setJournals([data, ...journals]);
            onClose();
            toast({
                title: "New Group Journal Created!",
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

    const handleDelete = (deletedUser) => {
        setSelectedUsers(selectedUsers.filter(sel => sel._id !== deletedUser._id))
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
              
            return;
        }
        
        setSelectedUsers([...selectedUsers, userToAdd]);
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
                    Create Group Journal
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody d="flex" flexDir="column" alignItems="center">
                    <FormControl>
                    <Input
                        placeholder="Journal Name"
                        mb={3}
                        onChange={(e) => setGroupJournalName(e.target.value)}
                    />
                    </FormControl>
                    <FormControl>
                    <Input
                        placeholder="Add Users eg: John, Piyush, Jane"
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    </FormControl>
                    <Box w="100%" d="flex" flexWrap="wrap">
                    {selectedUsers.map((u) => (
                        <UserBadgeItem
                        key={u._id}
                        user={u}
                        handleFunction={() => handleDelete(u)}
                        />
                    ))}
                    </Box>
                    {loading ? (
                    // <ChatLoading />
                    <div>Loading...</div>
                    ) : (
                    searchResult
                        ?.slice(0, 4)
                        .map((user) => (
                        <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={() => handleGroup(user)}
                        />
                        ))
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit} colorScheme="blue">
                    Create Journal
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default GroupJournalModal;