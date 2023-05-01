import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ThreadComponent = ({
                             threads,
                             selectedTrade,
                             handleThreadContentChange,
                             handleThreadPictureChange,
                             handleAddThread,
                         }) => {
    return (
        <Grid item xs={12}>
            {selectedTrade && selectedTrade.thread
                ? selectedTrade.thread.map((thread, index) => (
                    <>
                        <Grid item xs={12} key={index}>
                            <TextField
                                fullWidth
                                name="threadContent"
                                label="Thread Content"
                                id="threadContent"
                                autoComplete="threadContent"
                                value={thread.content}
                                defaultValue=""
                                onChange={(event) => handleThreadContentChange(event, index)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleThreadPictureChange(event, index)}
                            />
                            <TextField
                                fullWidth
                                name="threadPicture"
                                label="Thread Picture"
                                id="threadPicture"
                                autoComplete="threadPicture"
                                value={thread.picture}
                                onChange={(event) => handleThreadPictureChange(event, index)}
                            />
                        </Grid>
                    </>
                ))
                : threads.map((thread, index) => (
                    <>
                        <Grid item xs={12} key={index}>
                            <TextField
                                fullWidth
                                name="threadContent"
                                label="Thread Content"
                                id="threadContent"
                                autoComplete="threadContent"
                                defaultValue=""
                                onChange={(event) => handleThreadContentChange(event, index)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => handleThreadPictureChange(event, index)}
                            />
                            <TextField
                                fullWidth
                                name="threadPicture"
                                label="Thread Picture"
                                id="threadPicture"
                                autoComplete="threadPicture"
                                defaultValue=""
                                onChange={(event) => handleThreadPictureChange(event, index)}
                            />
                        </Grid>
                    </>
                ))}
            <Button onClick={handleAddThread}>Add Thread</Button>
        </Grid>
    );
};

export default ThreadComponent;
