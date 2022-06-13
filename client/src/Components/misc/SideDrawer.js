import React, { useState } from 'react';
import { Box, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, Tooltip, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { JournalState } from '../../Context/JournalProvider';
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';

const SideDrawer = () => {
    const [ search, setSearch ] = useState("");
    const [ searchResult, setSearchResult ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ loadingJournal, setLoadingJournal ] = useState();

    const { user } = JournalState();
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate('/');
    }

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
                    <Button variant="ghost">
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
        </>
    )
};

export default SideDrawer;