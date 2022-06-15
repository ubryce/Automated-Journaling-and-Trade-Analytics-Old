import { ViewIcon } from "@chakra-ui/icons";
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
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import React from 'react';

const UpdateJournalModal = ({fetchAgain, setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupJournalName, setGroupJournalName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();

    const { selectedJournal, setSelectedJournal, user } = JournalState();

    const handleSearch = () => {

    };

    const handleRename = () => {

    };

    const handleAddUser = () => {

    };

    const handleRemove = () => {

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
                    {selectedJournal.journalName}
                </ModalHeader>

                <ModalCloseButton />
                <ModalBody d="flex" flexDir="column" alignItems="center">
                    <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
                    {selectedJournal.users.map((u) => (
                        <UserBadgeItem
                        key={u._id}
                        user={u}
                        admin={selectedJournal.journalAdmin}
                        handleFunction={() => handleRemove(u)}
                        />
                    ))}
                    </Box>
                    <FormControl d="flex">
                    <Input
                        placeholder="Journal Name"
                        mb={3}
                        value={groupJournalName}
                        onChange={(e) => setGroupJournalName(e.target.value)}
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
                    </FormControl>
                    <FormControl>
                        <Input
                            placeholder="Add User to journal"
                            mb={1}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </FormControl>

                    {loading ? (
                    <Spinner size="lg" />
                    ) : (
                    searchResult?.map((user) => (
                        <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleAddUser(user)}
                        />
                    ))
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => handleRemove(user)} colorScheme="red">
                    Leave Group
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default UpdateJournalModal;