import React from 'react';
import { Stack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';

const JournalLoading = () => {
    return (
        <Stack>
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
            <Skeleton height="45px" />
        </Stack>
    )
};

export default JournalLoading;