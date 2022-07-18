import React, { useEffect, useState } from "react"
import { useStateContext } from '../contexts/ContextProvider';
import MyJournals from '../components/MyJournals';
import SingleJournal from '../components/SingleJournal';
import { Header } from '../components';

const Journals = () => {
  const { user, selectedJournal } = useStateContext();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className='mt-12'>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="flex justify-between">
            <Header category="Page" title="Journals" />
            {user && <MyJournals fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
          </div>
            {user && selectedJournal && <SingleJournal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        </div>
    </div>
  )
}

export default Journals