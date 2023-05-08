import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {useStateContext} from '../contexts/ContextProvider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Tooltip from "@mui/material/Tooltip";
import RatingTextField from './TradeForm/RatingTextField';
import CustomTextField from './TradeForm/CustomTextField';
import ThreadField from './TradeForm/ThreadField';

const theme = createTheme();
// TODO change required
// TODO do not allow user to add nothing to a thread
// TODO remove thread
// TODO remove tag
// TODO bug when tags is long
// TODO trade tag edit bug
// TODO fix trade tags
const TradeAdd = () => {
    const {selectedTrade, selectedJournal, user, tags, setTags} = useStateContext();
    const navigate = useNavigate();
    const [initSetupTags, setInitSetupTags] = React.useState([]);
    const [initMistakeTags, setInitMistakeTags] = React.useState([]);
    const [selectedSetupTags, setSelectedSetupTags] = React.useState([]);
    const [selectedMistakeTags, setSelectedMistakeTags] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [threads, setThreads] = React.useState([
        {
            content: "",
            picture: ""
        }
    ]);
    const [entry, setEntry] = React.useState();
    const [exit, setExit] = React.useState();
    const [side, setSide] = React.useState('');
    const [size, setSize] = React.useState();
    const [pnl, setPnl] = React.useState();

    const handleSwitchChange = (event) => {
        setIsOpen(event.target.checked);
    };

    const textFields = [
        { name: "exchange", label: "Exchange", required: true },
        {
            name: "side",
            label: "Side",
            required: true,
            select: true,
            menuItems: [
                { value: "long", label: "Long" },
                { value: "short", label: "Short" },
            ],
            onChange: (e) => setSide(e.target.value),
        },
        { name: "symbol", label: "Symbol", required: true },
        { name: "avgEntry", label: "Entry", required: true, onChange: (e) => setEntry(e.target.value) },
        { name: "stop", label: "Stop" },
        { name: "target", label: "Target" },
        { name: "exit", label: "Exit", onChange: (e) => setExit(e.target.value) },
        { name: "size", label: "Size", required: true, onChange: (e) => setSize(e.target.value) },
        { name: "sizeFiat", label: "Size Fiat" },
        { name: "pnl", label: "PnL", readOnly: true, value: pnl },
        { name: "walletBalance", label: "Wallet Balance" },
        { name: "accRisk", label: "Account Risk" },
        { name: "plannedRisk", label: "Planned Risk", required: false },
        { name: "finalRisk", label: "Final Risk", required: false },
    ];

    const ratingTypes = [
        { name: "confidence", label: "Confidence" },
        { name: "execution", label: "Execution Rating" },
        { name: "entryRating", label: "Entry Rating" },
        { name: "management", label: "Management Rating" },
        { name: "exitRating", label: "Exit Rating" },
    ];

    const handleRemoveThread = (index) => {
        const newThreads = [...threads];
        newThreads.splice(index, 1);
        setThreads(newThreads);
    };

    const handleThreadContentChange = (event, index) => {
        const newThreads = [...threads];
        newThreads[index].content = event.target.value;
        setThreads(newThreads);
    };

    const handleThreadPictureChange = (event, index) => {
        const newThreads = [...threads];
        newThreads[index].picture = event.target.value;
        setThreads(newThreads);
    };

    const handleAddThread = () => {
        setThreads([...threads, {content: '', picture: ''}]);
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
        console.log(newTags)
        if (tagType === 'setup') {
            setSelectedSetupTags(newTags)
        } else {
            setSelectedMistakeTags(newTags)
        }
    };

    // TODO only send this request if it for sure passes
    const handleAddNewTags = async (filteredTags, config) => {
        const tagsData = {
            tags: filteredTags
        }
        await axios.post(
            "/api/tag", tagsData, config
        ).then((response) => {
            console.log(response.data)
            return response.data
        }, (error) => {
            console.log(error.message)
        })
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
        console.log(allTagsToSend)

        // TODO use new tags with old tags and add into trade data
        const newTagsToCreate = allTagsToSend.filter((obj1) => {
            const exists = tags.some(obj2 => obj2.tag === obj1.tag);
            return !exists;
        });
        console.log(newTagsToCreate)
        if (newTagsToCreate.length > 0) {
            const newTagsToAdd = await handleAddNewTags(newTagsToCreate, config)
            newTagsToAdd.forEach((newTag) => {
                const index = allTagsToSend.findIndex((oldTag) => oldTag.tag === newTag.tag && !oldTag.id);
                if (index !== -1) {
                    allTagsToSend.splice(index, 1, newTag);
                }
            });
            console.log(newTagsToAdd)
        }
        console.log(allTagsToSend)

        const tradeData = {
            journalId: selectedJournal._id,
            openDate: new Date(data.get("openDate")),
            closeDate: new Date(data.get("closeDate")),
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
        await axios.post(
            "/api/trade", tradeData, config
        ).then((response) => {
            console.log(response.data)
            navigate(`/dashboard/journal/${selectedJournal._id}`);
        }, (error) => {
            console.log(error.message)
        })
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
            console.log("ran")
            console.log(response.data)
            setInitSetupTags(tags.filter((tag) => tag.tagType === 'setup'))
            setInitMistakeTags(tags.filter((tag) => tag.tagType === 'mistake'))
            setTags(response.data)
        }, (error) => {
            console.log(error.message)
        })
    };

    const calculatePnl = () => {
        if (entry && exit && side && size) {
            const result = side === 'long'
                ? (exit - entry) * size
                : (entry - exit) * size;

            setPnl(result.toFixed(2));
        }
    }

    useEffect(() => {
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
                                                    defaultValue={selectedTrade && selectedTrade.openDate ? selectedTrade.openDate : ""}
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
                                                    defaultValue={selectedTrade && selectedTrade.closeDate ? selectedTrade.closeDate : ""}
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
                                                threads={threads}
                                                selectedTrade={selectedTrade}
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