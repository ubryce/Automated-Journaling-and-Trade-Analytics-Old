import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { SubHeader } from './';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
  
const ITEM_HEIGHT = 48;

const SingleExchange = ({fetchAgain, setFetchAgain}) => {
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchanges } = useStateContext();;

    const [exchangeName, setExchangeName] = useState();
    const [exchangeAPI, setExchangeAPI] = useState();
    const [exchangeSecret, setExchangeSecret] = useState();

    const [editOpen, setEditOpen] = useState(false);
    const handleEditOpen = () => {
        setAnchorEl(null);
        setEditOpen(true);
    };
    const handleEditClose = () => {
        setAnchorEl(null);
        setEditOpen(false);
    };

    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => {
        setAnchorEl(null);
        setDeleteOpen(true);
    };
    const handleDeleteClose = () => {
        setAnchorEl(null);
        setDeleteOpen(false);
    };

    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditSubmit = async () => {
        // if (!journalName ) {
        //     console.log("missing name")
        //     return;
        // }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.put('/api/exchange/rename', {
                exchangeId: selectedExchange._id,
                exchangeName: exchangeName,
                exchangeAPI: exchangeAPI,
                exchangeSecret: exchangeSecret
            }, config);

            setSelectedExchange();
            handleEditClose()
            setFetchAgain(!fetchAgain);
            console.log("edited")
        } catch (error) {
            console.log("failed to edit journal")
        }

        setExchangeName('');
        setExchangeAPI('');
        setExchangeSecret('');
    };

    const handleDeleteSubmit = async () => {
        if (!selectedExchange) return
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                data: {
                    exchangeId: selectedExchange._id,
                }
            };
            console.log(config)
            await axios.delete('/api/exchange', config);

            setSelectedExchange();
            setFetchAgain(!fetchAgain);
            console.log("deleted")
        } catch (error) {
            console.log("failed to delete exchange")
        }

        
    };

    useEffect(() => {
        
    }, [fetchAgain]);

    return (
        <>
            <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth={true}> 
                <DialogTitle>Edit Exchange</DialogTitle>
                <DialogContent>
                    <Box noValidate
                        component="form"
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                        }}
                    >
                        <div>
                            <TextField
                                label="Exchange Name"
                                id="standard-size-normal"
                                defaultValue={selectedExchange.exchangeName}
                                variant="standard"
                                onChange={(e) => setExchangeName(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Exchange API"
                                id="standard-size-normal"
                                defaultValue={selectedExchange.exchangeAPI}
                                variant="standard"
                                onChange={(e) => setExchangeAPI(e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Exchange Secret"
                                id="standard-size-normal"
                                defaultValue=''
                                variant="standard"
                                onChange={(e) => setExchangeSecret(e.target.value)}
                            />
                        </div>
                        </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteOpen} onClose={handleDeleteClose} maxWidth="sm" fullWidth={true}> 
                <DialogTitle>Delete Exchange?</DialogTitle>
                <DialogContent>
                    <Box noValidate
                        component="form"
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                        }}
                    >
                        <div>
                            <>
                                Exchange Name: {selectedExchange.exchangeName}
                            </>
                        </div>
                        <div>
                        <>
                                Exchange API: {selectedExchange.exchangeAPI}
                            </>
                        </div>
                        </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Cancel</Button>
                    <Button onClick={handleDeleteSubmit}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <div className="flex justify-between">
                <SubHeader name={selectedExchange.exchangeName} description=""/>
                <div className="md:flex items-center justify-end md:flex-1">
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                        'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                        }}
                    >
                        
                        <MenuItem onClick={handleEditOpen} >
                            <EditIcon />
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleDeleteOpen}>
                            <DeleteIcon/>
                            Delete
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </>
    )
}

export default SingleExchange