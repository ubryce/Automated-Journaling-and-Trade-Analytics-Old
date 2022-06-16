import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';

const ScrollableJournal = ({trades}) => {
    return (
        <ScrollableFeed>
            {trades && trades.map((m,i) => {
                console.log(m.thread);
                <div style={{display:"flex"}} key={m._id}>
                    
                </div>
            })}
        </ScrollableFeed>
    )
};

export default ScrollableJournal;