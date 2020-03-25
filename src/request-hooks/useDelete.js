import React from 'react';
import axios from 'axios';
import {defaultDeleteConfig} from './default-config';

const useDelete = config => {
    const {reqHeaders, errorComponent} = config || defaultDeleteConfig;
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const [last, setLast] = React.useState(null);
    const [headers, setHeaders] = React.useState(reqHeaders);

    const modifyHeaders = customHeaders => setHeaders({...headers, ...customHeaders});

    const resetStates = () => {
        setIsLoading(false);
        setResponse(null);
        setError(null);
        setLast(null);
    };

    const request = (req) => {
        setIsLoading(true);
        const {endpoint, params} = req;
        let url = endpoint;
        if(params) {
            url += '/';
            url += `${params.id}`;
        }
        axios
            .delete(url, headers)
            .then(res => {
                if(res.data || res.data.length > 0) {
                    setResponse(res.data);
                }
                setIsLoading(false);
                setLast(req);
            })
            .catch(e => {
                setError(errorComponent);
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

export default useDelete;