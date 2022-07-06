import React, { useEffect, useState } from "react"
import { useStateContext } from '../contexts/ContextProvider';
import MyExchanges from '../components/MyExchanges';

const Exchanges = () => {
    const { user } = useStateContext();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div className='mt-12'>
            {user && <MyExchanges fetchAgain={fetchAgain}/>}
        </div>
    )
}

export default Exchanges