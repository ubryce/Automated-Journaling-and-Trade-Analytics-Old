import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/outline'
import { useStateContext } from '../contexts/ContextProvider';
import axios from "axios";

const ExchangeModal = () => {
    const { addExchange, setAddExchange, user, exchanges, setExchanges } = useStateContext();
    const [exchangeName, setExchangeName] = useState();
    const [exchangeAPI, setExchangeAPI] = useState();
    const [exchangeSecret, setExchangeSecret] = useState();

    const cancelButtonRef = useRef(null);

    const handleSubmit = async () => {
        if (!exchangeName || !exchangeAPI || !exchangeSecret) {
            console.log("missing fields")
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.post('/api/exchange', {
                exchangeName: exchangeName,
                exchangeAPI: exchangeAPI,
                exchangeSecret: exchangeSecret,
            }, config);

            setExchanges([data, ...exchanges]);
            setAddExchange(false);
            console.log("new exchange")
        } catch (error) {
            console.log("failed to create exchange")
        }
    };

    return (
        <Transition.Root show={addExchange} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setAddExchange}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <form action="#" method="POST">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 bg-green-100 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                            <PlusIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            New Exchange
                        </Dialog.Title>
                            
                            <div className="py-5 bg-white space-y-6">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                        Exchange Name
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                        type="text"
                                        onChange={(e) => setExchangeName(e.target.value)}
                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 border inline-flex items-center px-3 py-1"
                                        placeholder="Enter your Exchange name"
                                        />
                                    </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Exchange API
                                    </label>
                                    <div className="mt-1">
                                    <textarea
                                        onChange={(e) => setExchangeAPI(e.target.value)}
                                        rows={3}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md inline-flex items-center px-3 py-1"
                                        placeholder="Enter a description for your journal"
                                        defaultValue={exchangeAPI}
                                    />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                        Exchange Secret
                                    </label>
                                    <div className="mt-1">
                                    <textarea
                                        onChange={(e) => setExchangeSecret(e.target.value)}
                                        rows={3}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md inline-flex items-center px-3 py-1"
                                        placeholder="Enter a description for your journal"
                                        defaultValue={exchangeSecret}
                                    />
                                    </div>
                                </div>

                                </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => {setAddExchange(false); handleSubmit();}}
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setAddExchange(false)}
                            ref={cancelButtonRef}
                        >
                            Cancel
                        </button>
                    </div>
                    </form>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}

export default ExchangeModal