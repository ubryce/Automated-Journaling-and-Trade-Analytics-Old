import React, { useEffect, useState } from "react"
import { JournalState } from "../Context/JournalProvider";
import SideDrawer from '../Components/misc/SideDrawer';
import MyJournals from '../Components/MyJournals';
import JournalBox from '../Components/JournalBox';
import { Box } from '@chakra-ui/layout';

const Journalspage = () => {
    const { user } = JournalState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div style={{width:'100%'}}>
            {user && <SideDrawer/>}
            <Box
                d="flex"
                justifyContent='space-between'
                w='100%'
                h='91.5vh'
                p='10px'>
                {user && <MyJournals fetchAgain={fetchAgain}/>}
                {user && <JournalBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </Box>
        </div>
    )
}

export default Journalspage;