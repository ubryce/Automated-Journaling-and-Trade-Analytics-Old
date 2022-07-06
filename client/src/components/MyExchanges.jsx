import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { Button } from '../components';

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const MyExchanges = ({fetchAgain}) => {
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchanges, currentColor } = useStateContext();

    const fetchExchanges = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get("/api/exchange", config);
            setExchanges(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchExchanges();
    }, [fetchAgain]);

    return (
        <>
            <div className="md:flex items-center justify-end md:flex-1">
                <Button color="white" bgColor={currentColor} text="Create a Exchange" borderRadius="10px" size="md" />
            </div>
            <Listbox value={selectedExchange} onChange={setSelectedExchange}>
                {({ open }) => (
            <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">Selected Exchange</Listbox.Label>
            <div className="mt-1 relative">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span className="flex items-center">
                    <span className="ml-3 block truncate">{ selectedExchange ? selectedExchange.exchangeName : "Select a Exchange"}</span> 
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
                    {exchanges.map((exchange) => (
                    <Listbox.Option
                        key={exchange._id}
                        className={({ active }) =>
                        classNames(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                        }
                        value={exchange}
                    >
                        {({ selected, active }) => (
                        <>
                            <div className="flex items-center">
                            <span
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                                {exchange.exchangeName}
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

export default MyExchanges