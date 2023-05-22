import React, {useEffect} from 'react'
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Switch,
    TextField,
    ThemeProvider,
    Tooltip,
    Typography
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import CustomTextField from './TradeForm/CustomTextField';
import RatingTextField from './TradeForm/RatingTextField';
import ThreadField from './TradeForm/ThreadField';

const theme = createTheme();
// TODO bug when tags is long
// TODO trade tag edit bug
// TODO fix edit trade tags
// TODO fix edit trade textfields
const TradeAdd = () => {
    const {selectedTrade, selectedJournal, user, tags, setTags} = useStateContext();
    const navigate = useNavigate();
    const [initSetupTags, setInitSetupTags] = React.useState([]);
    const [initMistakeTags, setInitMistakeTags] = React.useState([]);
    const [selectedSetupTags, setSelectedSetupTags] = React.useState([]);
    const [selectedMistakeTags, setSelectedMistakeTags] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [threads, setThreads] = React.useState([]);
    const [entry, setEntry] = React.useState();
    const [exit, setExit] = React.useState();
    const [side, setSide] = React.useState('');
    const [size, setSize] = React.useState();
    const [pnl, setPnl] = React.useState();

    const [openDate, setOpenDate] = React.useState();
    const [closeDate, setCloseDate] = React.useState();

    const handleSwitchChange = (event) => {
        setIsOpen(event.target.checked);
    };

    const textFields = [
        {name: "exchange", label: "Exchange", required: true, readOnly: false},
        {
            name: "side",
            label: "Side",
            required: true,
            select: true,
            readOnly: false,
            menuItems: [
                {value: "long", label: "Long"},
                {value: "short", label: "Short"},
            ],
            onChange: (e) => setSide(e.target.value),
        },
        {name: "symbol", label: "Symbol", required: true, readOnly: false},
        {name: "avgEntry", label: "Entry", required: true, onChange: (e) => setEntry(e.target.value), readOnly: false},
        {name: "stop", label: "Stop", readOnly: false},
        {name: "target", label: "Target", readOnly: false},
        {name: "exit", label: "Exit", onChange: (e) => setExit(e.target.value), readOnly: false},
        {name: "size", label: "Size", required: true, onChange: (e) => setSize(e.target.value), readOnly: false},
        {name: "sizeFiat", label: "Size Fiat", readOnly: false},
        {name: "pnl", label: "PnL", readOnly: true, value: pnl},
        {name: "walletBalance", label: "Wallet Balance", readOnly: false},
        {name: "accRisk", label: "Account Risk", readOnly: false},
        {name: "plannedRisk", label: "Planned Risk", required: false, readOnly: false},
        {name: "finalRisk", label: "Final Risk", required: false, readOnly: false},
    ];

    const ratingTypes = [
        {name: "confidence", label: "Confidence"},
        {name: "execution", label: "Execution Rating"},
        {name: "entryRating", label: "Entry Rating"},
        {name: "management", label: "Management Rating"},
        {name: "exitRating", label: "Exit Rating"},
    ];

    const formatDate = (date) => {
        let formattedDate = new Date(date).toISOString();
        formattedDate = formattedDate.slice(0,16);
        return formattedDate;
    }

    const handleRemoveThread = (id) => {
        setThreads(threads.filter(thread => thread.id !== id));
    };

    const handleThreadContentChange = (event, id) => {
        const newThreads = threads.map((thread) => {
            if (thread.id === id) {
                return {
                    ...thread,
                    content: event.target.value
                };
            }
            return thread;
        });
        setThreads(newThreads);
    };

    const handleThreadPictureChange = (event, id) => {
        const newThreads = threads.map((thread) => {
            if (thread.id === id) {
                return {
                    ...thread,
                    picture: event.target.value
                };
            }
            return thread;
        });
        setThreads(newThreads);
    };

    const handleAddThread = () => {
        if (threads.length > 0) {
            const lastThread = threads[threads.length - 1];
            if (lastThread.content === '' && lastThread.picture === '') {
                alert("Cannot add a new thread until the last one has content or picture.");
                return;
            }
        }

        const newThread = {
            id: new Date().getTime(),
            content: '',
            picture: ''
        };
        setThreads([...threads, newThread]);
    };

    const handleDeleteTag = (tag) => {
        setTags(tags.filter((t) => t._id !== tag._id));
    };

    const handleTagsChange = (event, value, tagType) => {
        const newTags = value.map((tag) => {
            if (!tag.tagType) {
                const newTag = {
                    tag: tag,
                    tagType: tagType
                };
                if (tagType == 'setup') {
                    setInitSetupTags([...initSetupTags, newTag])
                } else {
                    setInitMistakeTags([...initMistakeTags, newTag])
                }
                return newTag
            }
            return tag;
        });
        if (tagType === 'setup') {
            setSelectedSetupTags(newTags)
        } else {
            setSelectedMistakeTags(newTags)
        }
    };

    // TODO only send this request if it for sure passes
    const handleAddNewTags = (filteredTags, config) => {
        const tagsData = {
            tags: filteredTags
        };
        return axios.post("/api/tag", tagsData, config)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let allTagsToSend = [...selectedSetupTags, ...selectedMistakeTags];
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const newTagsToCreate = allTagsToSend.filter((obj1) => {
            const exists = tags.some(obj2 => obj2.tag === obj1.tag);
            return !exists;
        });
        if (newTagsToCreate.length > 0) {
            const newTagsToAdd = await handleAddNewTags(newTagsToCreate, config)
            newTagsToAdd.forEach((newTag) => {
                const index = allTagsToSend.findIndex((oldTag) => oldTag.tag === newTag.tag && !oldTag.id);
                if (index !== -1) {
                    allTagsToSend.splice(index, 1, newTag);
                }
            });
        }

        const tradeData = {
            journalId: selectedJournal._id,
            openDate: openDate,
            closeDate: closeDate,
            side: data.get("side"),
            exchange: data.get("exchange"),
            symbol: data.get("symbol"),
            avgEntry: data.get("avgEntry"),
            stop: data.get("stop"),
            target: data.get("target"),
            exit: data.get("exit"),
            size: data.get("size"),
            sizeFiat: data.get("sizeFiat"),
            pnl: data.get("pnl"),
            walletBalance: data.get("walletBalance"),
            accRisk: data.get("accRisk"),
            confidence: data.get("confidence"),
            execution: data.get("execution"),
            entryRating: data.get("entryRating"),
            management: data.get("management"),
            exitRating: data.get("exitRating"),
            plannedRisk: data.get("plannedRisk"),
            finalRisk: data.get("finalRisk"),
            isOpen: isOpen,
            tags: allTagsToSend,
            thread: threads,
        };

        console.log(tradeData);
        // TODO empty selected trade if navigate away form this page
        try {
            if (selectedTrade) {
                await axios.put(
                    `/api/trade/${selectedTrade._id}`, tradeData, config
                );
            } else {
                await axios.post(
                    "/api/trade", tradeData, config
                );
            }
            navigate(`/dashboard/journal/${selectedJournal._id}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    const fetchTradeTagsFromDataBase = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        await axios.get(
            "/api/tag", config
        ).then((response) => {
            setInitSetupTags(tags.filter((tag) => tag.tagType === 'setup'))
            setInitMistakeTags(tags.filter((tag) => tag.tagType === 'mistake'))
            setTags(response.data)
        }, (error) => {
            console.log(error.message)
        })
    };

    const calculatePnl = () => {
        if (entry && exit && side && size && !isNaN(entry) && !isNaN(exit) && !isNaN(size)) {
            const result = side === 'long'
                ? (exit - entry) * size
                : (entry - exit) * size;

            setPnl(result.toFixed(2));
        } else {
            setPnl("0.00");
        }
    }

    useEffect(() => {
        if (selectedTrade) {
            setEntry(selectedTrade.avgEntry);
            setExit(selectedTrade.exit);
            setSide(selectedTrade.side);
            setSize(selectedTrade.size);

            calculatePnl();
        }
        // TODO bug where after creating a new tag it doesnt automatically upload
        fetchTradeTagsFromDataBase();
    }, []);

    useEffect(() => {
        calculatePnl();
    }, [entry, exit, side, size]);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <ThemeProvider theme={theme}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline/>
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Tooltip title="Back">
                                        <IconButton
                                            onClick={() => navigate(`/dashboard/journal/${selectedJournal._id}`)}>
                                            <ArrowBackIosNewIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Typography component="h1" variant="h5">
                                        New Trade Entry
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="opendate"
                                                    label="Open Date"
                                                    id="opendate"
                                                    type="datetime-local"
                                                    autoComplete="opendate"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    defaultValue={selectedTrade && selectedTrade.openDate ? formatDate(selectedTrade.openDate) : ""}
                                                    onChange={(event) => setOpenDate(new Date(event.target.value))}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="closedate"
                                                    label="Close Date"
                                                    id="closedate"
                                                    type="datetime-local"
                                                    autoComplete="closedate"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    defaultValue={selectedTrade && selectedTrade.closeDate ? formatDate(selectedTrade.closeDate) : ""}
                                                    onChange={(event) => setCloseDate(new Date(event.target.value))}
                                                />
                                            </Grid>
                                            {textFields.map((field) => (
                                                <CustomTextField
                                                    key={field.name}
                                                    required={field.required}
                                                    name={field.name}
                                                    label={field.label}
                                                    id={field.name}
                                                    autoComplete={field.name}
                                                    defaultValue={
                                                        selectedTrade && selectedTrade[field.name]
                                                            ? selectedTrade[field.name]
                                                            : ""
                                                    }
                                                    onChange={field.onChange}
                                                    readOnly={field.readOnly}
                                                    value={field.value}
                                                    select={field.select}
                                                    menuItems={field.menuItems}
                                                />
                                            ))}
                                            {ratingTypes.map((rating) => (
                                                <RatingTextField
                                                    key={rating.name}
                                                    name={rating.name}
                                                    label={rating.label}
                                                    defaultValue={
                                                        selectedTrade && selectedTrade[rating.name]
                                                            ? selectedTrade[rating.name]
                                                            : ""
                                                    }
                                                />
                                            ))}
                                            <Grid item xs={12}>
                                                <Switch
                                                    checked={isOpen}
                                                    onChange={handleSwitchChange}
                                                    name="isOpen"
                                                    id="isOpen"
                                                    defaultValue={selectedTrade && selectedTrade.isOpen ? selectedTrade.isOpen : ""}
                                                />
                                                <label htmlFor="isOpen">Open</label>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    multiple
                                                    name="setupTags"
                                                    id="setupTags"
                                                    options={initSetupTags}
                                                    getOptionLabel={(option) => option.tag}
                                                    freeSolo
                                                    onChange={(event, value) => handleTagsChange(event, value, 'setup')}
                                                    renderTags={(value, getTagProps) =>
                                                        selectedSetupTags.map((option, index) => (
                                                            <Chip variant="outlined"
                                                                // TODO fix default value for edit trade
                                                                  label={option.tag}
                                                                  onDelete={() => handleDeleteTag(option)}
                                                                  {...getTagProps({index})} />
                                                        ))
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Setup Tags"
                                                            placeholder="Favorites"
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    multiple
                                                    name="mistakeTags"
                                                    id="mistakeTags"
                                                    options={initMistakeTags}
                                                    getOptionLabel={(option) => option.tag}
                                                    freeSolo
                                                    onChange={(event, value) => handleTagsChange(event, value, 'mistake')}
                                                    renderTags={(value, getTagProps) =>
                                                        selectedMistakeTags.map((option, index) => (
                                                            <Chip variant="outlined"
                                                                  label={option.tag}
                                                                  onDelete={() => handleDeleteTag(option)}
                                                                  {...getTagProps({index})} />
                                                        ))
                                                    }
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Mistake Tags"
                                                            placeholder="Favorites"
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            <ThreadField
                                                threads={ selectedTrade && selectedTrade.thread ? selectedTrade.thread : threads}
                                                handleThreadContentChange={handleThreadContentChange}
                                                handleThreadPictureChange={handleThreadPictureChange}
                                                handleAddThread={handleAddThread}
                                                handleRemoveThread={handleRemoveThread}
                                            />
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{mt: 3, mb: 2}}
                                        >
                                            Create
                                        </Button>
                                    </Box>
                                </Box>
                            </Container>
                        </ThemeProvider>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default TradeAdd