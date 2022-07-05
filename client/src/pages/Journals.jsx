import React, { useEffect, useState } from "react"
import { useStateContext } from '../contexts/ContextProvider';
import MyJournals from '../components/MyJournals';

const Journals = () => {
  const { user } = useStateContext();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className='mt-12'>
      {user && <MyJournals fetchAgain={fetchAgain}/>}
    </div>
  )
}

export default Journals