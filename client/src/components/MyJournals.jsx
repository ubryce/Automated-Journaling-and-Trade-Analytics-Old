import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const MyJournals = ({fetchAgain}) => {
    const { selectedJournal, setSelectedJournal, user, journals, setJournals } = useStateContext();

    const fetchJournals = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
    
            const {data} = await axios.get("/api/journal", config);
            setJournals(data);
        } catch (error) {
            // toast({
            //     title: "Error occured",
            //     description: "Failed to load the Journals",
            //     status: "error",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom-left",
            // })
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchJournals();
    }, [fetchAgain]);
  
    return (
        <>
        <Listbox value={selectedJournal} onChange={setSelectedJournal}>
            {({ open }) => (
        <>
        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <a
            href="#"
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
            Create a Journal
            </a>
        </div>
          <Listbox.Label className="block text-sm font-medium text-gray-700">Selected Journal</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{ selectedJournal ? selectedJournal.journalName : "Select a Journal"}</span> 
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {journals.map((journal) => (
                  <Listbox.Option
                    key={journal._id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={journal}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                        <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {journal.journalName}
                          </span>
                        </div>

                        {selected ? (
                          <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
        </Listbox>
        
      </>
    )
}

export default MyJournals