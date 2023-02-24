import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {useStateContext} from '../contexts/ContextProvider';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
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

const theme = createTheme();

// TODO change required
// TODO Check data types
// TODO add tags to database
// TODO do not allow user to add nothing to a thread
// TODO remove thread
const TradeAdd = () => {
    const {selectedJournal, user, tags, setTags} = useStateContext();
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [threads, setThreads] = React.useState([
        {
            content: "",
            picture: ""
        }
    ]);

    const menuItems = [
        {value: 1, label: "1"},
        {value: 2, label: "2"},
        {value: 3, label: "3"},
        {value: 4, label: "4"},
        {value: 5, label: "5"},
        {value: 6, label: "6"},
        {value: 7, label: "7"},
        {value: 8, label: "8"},
        {value: 9, label: "9"},
        {value: 10, label: "10"},
    ]

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

    const handleTagsChange = (event, newValue) => {
        // Remove any tags that are not in the options list
        newValue = newValue.filter((tag) => {
            return tags.find((option) => option.tag === tag.tag && option.tagType === tag.tagType);
        });

        setSelectedTags([...selectedTags, newValue]);
    };

    // TODO bug where all input changes in tags field is listed
    const handleTagsInputChange = (event, value, tagType) => {
        // Check if the value is not empty and is not already in the tags array
        if (value && !tags.some((tag) => tag.tag === value)) {
            const newTag = {
                tag: value,
                tagType: tagType,
            };
            // Add the new tag to the tags array in state
            setTags([...tags, newTag]);
            // Set the selected tags to include the new tag
            setSelectedTags([...selectedTags, newTag]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(threads);
        const tradeData = {
            user: user._id,
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
            walletBalance: data.get("walletBalance"),
            accRisk: data.get("accRisk"),
            confidence: data.get("confidence"),
            execution: data.get("execution"),
            entryRating: data.get("entryRating"),
            management: data.get("management"),
            exitRating: data.get("exitRating"),
            plannedRisk: data.get("plannedRisk"),
            finalRisk: data.get("finalRisk"),
            isOpen: data.get("isOpen"),
            tags: selectedTags,
            thread: threads,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const data2 = await axios.post(
            "/api/trade", tradeData, config
        ).then((response) => {
            console.log(response.data)
            navigate(`/dashboard/journal/${selectedJournal._id}`);
        }, (error) => {
            console.log(error.message)
        }) || {}
    };

    const setTradeTags = async (event) => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const data2 = await axios.get(
            "/api/tag", config
        ).then((response) => {
            console.log(response.data)
            setTags(response.data)
        }, (error) => {
            console.log(error.message)
        }) || {}
    };

    // TODO fix when tags already have tags but not updated
    useEffect(() => {
        setTradeTags();
    }, []);

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
                                                    required
                                                    fullWidth
                                                    id="exchange"
                                                    label="Exchange"
                                                    name="exchange"
                                                    autoComplete="exchange"
                                                />
                                            </Grid>
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
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="side"
                                                    label="Side"
                                                    id="side"
                                                    autoComplete="side"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="symbol"
                                                    label="Symbol"
                                                    id="symbol"
                                                    autoComplete="symbol"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="avgEntry"
                                                    label="Entry"
                                                    id="avgEntry"
                                                    autoComplete="avgEntry"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="stop"
                                                    label="Stop"
                                                    id="stop"
                                                    autoComplete="stop"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="target"
                                                    label="Target"
                                                    id="target"
                                                    autoComplete="target"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="exit"
                                                    label="Exit"
                                                    id="exit"
                                                    autoComplete="exit"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="size"
                                                    label="Size"
                                                    id="size"
                                                    autoComplete="size"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="sizeFiat"
                                                    label="Size Fiat"
                                                    id="sizeFiat"
                                                    autoComplete="sizeFiat"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="walletBalance"
                                                    label="Wallet Balance"
                                                    id="walletBalance"
                                                    autoComplete="walletBalance"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="accRisk"
                                                    label="Account Risk"
                                                    id="accRisk"
                                                    autoComplete="accRisk"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="confidence"
                                                    label="Confidence"
                                                    id="confidence"
                                                    autoComplete="confidence"
                                                    select
                                                    defaultValue=""
                                                >
                                                    {menuItems.map((item) => (
                                                        <MenuItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="execution"
                                                    label="Execution Rating"
                                                    id="execution"
                                                    autoComplete="execution"
                                                    select
                                                    defaultValue=""
                                                >
                                                    {menuItems.map((item) => (
                                                        <MenuItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="entryRating"
                                                    label="Entry Rating"
                                                    id="entryRating"
                                                    autoComplete="entryRating"
                                                    select
                                                    defaultValue=""
                                                >
                                                    {menuItems.map((item) => (
                                                        <MenuItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="management"
                                                    label="Management Rating"
                                                    id="management"
                                                    autoComplete="management"
                                                    select
                                                    defaultValue=""
                                                >
                                                    {menuItems.map((item) => (
                                                        <MenuItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="exitRating"
                                                    label="Exit Rating"
                                                    id="exitRating"
                                                    autoComplete="exitRating"
                                                    select
                                                    defaultValue=""
                                                >
                                                    {menuItems.map((item) => (
                                                        <MenuItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="plannedRisk"
                                                    label="Planned Risk"
                                                    id="plannedRisk"
                                                    autoComplete="plannedRisk"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="finalRisk"
                                                    label="Final Risk"
                                                    id="finalRisk"
                                                    autoComplete="finalRisk"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    name="isOpen"
                                                    label="Open"
                                                    id="isOpen"
                                                    autoComplete="isOpen"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Autocomplete
                                                    multiple
                                                    name="setupTags"
                                                    id="setupTags"
                                                    options={tags.filter((tag) => tag.tagType === 'setup')}
                                                    getOptionLabel={(option) => option.tag}
                                                    freeSolo
                                                    onChange={handleTagsChange}
                                                    onInputChange={(event, value) => handleTagsInputChange(event, value, 'setup')}
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, index) => (
                                                            <Chip variant="outlined"
                                                                  label={option.tag} {...getTagProps({index})} />
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
                                                    options={tags.filter((tag) => tag.tagType === 'mistake')}
                                                    getOptionLabel={(option) => option.tag}
                                                    freeSolo
                                                    onChange={handleTagsChange}
                                                    onInputChange={(event, value) => handleTagsInputChange(event, value, 'mistake')}
                                                    renderTags={(value, getTagProps) =>
                                                        value.map((option, index) => (
                                                            <Chip variant="outlined"
                                                                  label={option.tag} {...getTagProps({index})} />
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
                                            <Grid item xs={12}>
                                                {threads.map((thread, index) => (
                                                    <>
                                                        <Grid item xs={12} key={index}>
                                                            <TextField
                                                                fullWidth
                                                                name="threadContent"
                                                                label="Thread Content"
                                                                id="threadContent"
                                                                autoComplete="threadContent"
                                                                value={thread.content}
                                                                onChange={event => handleThreadContentChange(event, index)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                name="threadPicture"
                                                                label="Thread Picture"
                                                                id="threadPicture"
                                                                autoComplete="threadPicture"
                                                                value={thread.picture}
                                                                onChange={event => handleThreadPictureChange(event, index)}
                                                            />
                                                        </Grid>
                                                    </>
                                                ))}
                                            </Grid>
                                            <Button onClick={handleAddThread}>Add Thread</Button>
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