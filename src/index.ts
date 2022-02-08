const foobar = (input: string): string => {
    if (input === 'foo') {
        return 'bar';
    } else if (input === 'bar') {
        return 'foo';
    }
    return 'foobar';
};

export { foobar };
