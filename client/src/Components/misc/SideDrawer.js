import React, { useState } from 'react';
import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, Tooltip, MenuList, MenuItem, MenuDivider, useToast, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
  } from "@chakra-ui/modal";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { JournalState } from '../../Context/JournalProvider';
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import JournalLoading from '../JournalLoading';
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
    const [ search, setSearch ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ loadingJournal, setLoadingJournal ] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { user, setSelectedJournal, journals, setJournals } = JournalState();
    const navigate = useNavigate();
    const toast = useToast();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate('/');
    }

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter something",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get(`/api/user?search=${search}`, config)

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

    const accessJournal = async (userId) => {
        try {
            setLoadingJournal(true);

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.post('/api/journal', { userId }, config);
            
            setSelectedJournal(data);
            setLoadingJournal(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching journal",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        };
    };

    return (
        <>
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px">
                <Tooltip label="Search users" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <Text d={{base:"none", md:"flex"}} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>

                <Text fontSize="2x1" fontFamily="Work sans">
                    Automated Trading Journal
                </Text>

                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1}/>
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                            <Avatar size="sm" cursor="pointer" name={user.name} />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>Profile</MenuItem>
                            </ProfileModal>
                                <MenuDivider></MenuDivider>
                                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>

            </Box>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search users</DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}/>
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <JournalLoading/>
                        ) : (
                            searchResult?.map((user) => (
                                <UserListItem 
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessJournal(user._id)}
                                />
                            ))
                        ) }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>


        </>
    )
};

export default SideDrawer;