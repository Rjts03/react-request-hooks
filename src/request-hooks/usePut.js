import React from 'react';
import axios from 'axios';

const usePut = (passed_headers) => {
    const default_headers = {
        'Content-Type': 'application/json',
    };

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const [last, setLast] = React.useState(null);
    const [headers, setHeaders] = React.useState(passed_headers || default_headers);

    const modifyHeaders = customHeaders => setHeaders({...headers, ...customHeaders});

    const resetStates = () => {
        setIsLoading(false);
        setResponse(null);
        setError(null);
        setLast(null);
    };

    const request = (req) => {
        setIsLoading(true);
        const {endpoint, body, params} = req;
        let url = endpoint;
        if(params) {
            url += '/';
            url += `${params.id}`;
        }
        axios
            .put(url, body, headers)
            .then(res => {
                setResponse(res.data);
                setIsLoading(false);
                setLast(req);
            })
            .catch(e => {
                setError('Error Updating Data');
                setIsLoading(false);
            });
    };

    const retry = (interval, times, timeout=false) => {
        const call = () => {
            const prevReq = {...last};
            resetStates();
            request(prevReq);
        };
        if(timeout) {
            setTimeout(() => {
                call();
            }, interval);
        }else {
            let count = 0;
            const intervalId = setInterval(() => {
                call();
                if(++count === times) {
                    clearInterval(intervalId);
                }
            }, interval);
        }
    };

    return [
        {
            res: response,
            error,
            loading: isLoading,
        },
        {
            request,
            retry,
            modifyHeaders,
        },
    ];
};

export default usePut;