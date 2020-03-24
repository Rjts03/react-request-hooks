import React from 'react';
import axios from 'axios';

const useGet = (passed_headers) => {
    const default_headers = {
        'Content-Type': 'application/json',
    };
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const [isEmpty, setIsEmpty] = React.useState(false);
    const [last, setLast] = React.useState(null);
    const [headers, setHeaders] = React.useState(passed_headers || default_headers);

    const modifyHeaders = customHeaders => setHeaders({...headers, ...customHeaders});

    const resetStates = () => {
        setIsLoading(true);
        setResponse(null);
        setError(null);
        setIsEmpty(false);
        setLast(null);
    };

    const request = (req) => {
        const {endpoint, query} = req;
        let url = endpoint;
        if(query) {
            url += '?';
            Object.keys(query).forEach(q => {
                url += `${q}=${query[q]}`;
            });
        }
        axios
            .get(url, headers)
            .then(res => {
                if(res.data.length > 0) {
                    setResponse(res.data);
                }else {
                    setIsEmpty(true);
                }
                setIsLoading(false);
                setLast(req);
            })
            .catch(e => {
                setError('Error Loading Data');
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
            empty: isEmpty,
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

export default useGet;