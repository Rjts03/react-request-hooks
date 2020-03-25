import React from 'react';
import axios from 'axios';
import {defaultGetConfig} from './default-config';

const useGet = config => {
    const {reqHeaders, isPaginated, paginationKey, errorComponent} = config || defaultGetConfig;
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [response, setResponse] = React.useState(null);
    const [isEmpty, setIsEmpty] = React.useState(false);
    const [last, setLast] = React.useState(null);
    const [headers, setHeaders] = React.useState(reqHeaders);
    const [pageNumber, setPageNumber] = React.useState(1);

    const modifyHeaders = customHeaders => setHeaders({...headers, ...customHeaders});
    
    const resetPagination = () => setPageNumber(1);

    const resetStates = () => {
        setIsLoading(true);
        setResponse(null);
        setError(null);
        setIsEmpty(false);
        setLast(null);
        setPageNumber(1);
    };

    const request = (req) => {
        const {endpoint, query} = req;
        let url = endpoint;
        if(query) {
            url += '?';
            Object.keys(query).forEach(q => {
                url += `${q}=${query[q]},`;
            });
        }
        if(isPaginated) {
            url += `${paginationKey}=${pageNumber}`;
        }
        axios
            .get(url, headers)
            .then(res => {
                if(res.data.length > 0) {
                    setResponse(res.data);
                    setPageNumber(pageNumber + 1);
                }else {
                    setIsEmpty(true);
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
            empty: isEmpty,
            error,
            loading: isLoading,
        },
        {
            request,
            retry,
            modifyHeaders,
            resetPagination,
        },
    ];
};

export default useGet;