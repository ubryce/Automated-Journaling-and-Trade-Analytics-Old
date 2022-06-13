import axios from 'axios';
import React, { useEffect, useState } from "react"
import { JournalState } from "../Context/JournalProvider";
import SideDrawer from '../Components/misc/SideDrawer';
import MyJournals from '../Components/misc/MyJournals';
import JournalBox from '../Components/misc/JournalBox';
import { Box } from '@chakra-ui/layout';

const Journalspage = () => {
    const { user } = JournalState();

    return (
        <div style={{width:'100%'}}>
            {user && <SideDrawer/>}
            <Box
                d="flex"
                justifyContent='space-between'
                w='100%'
                h='91.5vh'
                p='10px'>
                {user && <MyJournals/>}
                {user && <JournalBox/>}
            </Box>
        </div>
    )
}

export default Journalspage;