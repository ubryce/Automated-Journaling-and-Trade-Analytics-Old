import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const ThreadComponent = ({ threads, handleThreadContentChange, handleThreadPictureChange, handleAddThread, handleRemoveThread }) => {
    return (
        <Grid item xs={12}>
            {threads.map((thread) => (
                <React.Fragment key={thread.id}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="threadContent"
                            label="Thread Content"
                            id={`threadContent-${thread.id}`}
                            autoComplete="threadContent"
                            value={thread.content}
                            onChange={(event) => handleThreadContentChange(event, thread.id)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleThreadPictureChange(event, thread.id)}
                        />
                        <TextField
                            fullWidth
                            name="threadPicture"
                            label="Thread Picture"
                            id={`threadPicture-${thread.id}`}
                            autoComplete="threadPicture"
                            value={thread.picture}
                            onChange={(event) => handleThreadPictureChange(event, thread.id)}
                        />
                        <Button onClick={() => handleRemoveThread(thread.id)}>Remove Thread</Button>
                    </Grid>
                </React.Fragment>
            ))}
            <Button onClick={handleAddThread}>Add Thread</Button>
        </Grid>
    );
};

export default ThreadComponent;
