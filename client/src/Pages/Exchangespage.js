import React, { useEffect, useState } from "react"
import { JournalState } from "../Context/JournalProvider";
import SideDrawer from '../Components/misc/SideDrawer';
import MyExchanges from '../Components/MyExchanges';
import ExchangeBox from '../Components/ExchangeBox';
import { Box } from '@chakra-ui/layout';

const Exchangespage = () => {
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
                {user && <MyExchanges fetchAgain={fetchAgain}/>}
                {user && <ExchangeBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </Box>
        </div>
    )
}

export default Exchangespage;