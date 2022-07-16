import React, { useEffect, useState } from "react"
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ITEM_HEIGHT = 48;

const SingleJournal = ({fetchAgain, setFetchAgain}) => {
    const { selectedJournal, setSelectedJournal, user, journals, setJournals } = useStateContext();;

    const [journalName, setJournalName] = useState();
    const [journalDescription, setJournalDescription] = useState();

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

            const {data} = await axios.put('/api/journal/rename', {
                journalId: selectedJournal._id,
                journalName: journalName,
                journalDescription: journalDescription
            }, config);
            setJournals([data, ...journals]);
            handleEditClose()
            setFetchAgain(!fetchAgain);
            console.log("edited")
        } catch (error) {
            console.log("failed to edit journal")
        }
    };

    const handleDeleteSubmit = async () => {
        if (!selectedJournal) return
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                data: {
                    journalId: selectedJournal._id,
                }
            };
            console.log(config)
            await axios.delete('/api/journal', config);

            setSelectedJournal();
            setFetchAgain(!fetchAgain);
            console.log("deleted")
        } catch (error) {
            console.log("failed to delete journal")
        }

        
    };

  return (
    <>
        <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth={true}> 
            <DialogTitle>Edit Journal</DialogTitle>
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
                            label="Journal Name"
                            id="standard-size-normal"
                            defaultValue={selectedJournal.journalName}
                            variant="standard"
                            onChange={(e) => setJournalName(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Journal Description"
                            id="standard-size-normal"
                            defaultValue={selectedJournal.journalDescription}
                            variant="standard"
                            onChange={(e) => setJournalDescription(e.target.value)}
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
            <DialogTitle>Delete Journal</DialogTitle>
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
                            Journal Name: {selectedJournal.journalName}
                        </>
                    </div>
                    <div>
                        <>
                            Journal Description: {selectedJournal.journalDescription}
                        </>
                    </div>
                    </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteClose}>Cancel</Button>
                <Button onClick={handleDeleteSubmit}>Confirm</Button>
            </DialogActions>
        </Dialog>
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
                <MenuItem onClick={handleClose} >
                    <AddIcon />
                    Add Exchange
                </MenuItem>
                <MenuItem onClick={handleDeleteOpen}>
                    <DeleteIcon/>
                    Delete
                </MenuItem>
            </Menu>
        </div>
    </>
  )
}

export default SingleJournal