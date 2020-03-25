const defaultGetConfig = {
    reqHeaders: {
        headers: {
            "Content-type": "application/json"
        }
    },
    isPaginated: false,
    paginationKey: 'page',
    errorComponent: 'Error Loading Data',
};

const defaultPostConfig = {
    reqHeaders: {
        headers: {
            "Content-type": "application/json"
        }
    },
    errorComponent: 'Error Posting Data',
};

const defaultPutConfig = {
    reqHeaders: {
        headers: {
            "Content-type": "application/json"
        }
    },
    errorComponent: 'Error Updating Data',
};

const defaultDeleteConfig = {
    reqHeaders: {
        headers: {
            "Content-type": "application/json"
        }
    },
    errorComponent: 'Error Deleting Data',
};

export {
    defaultGetConfig,
    defaultPostConfig,
    defaultPutConfig,
    defaultDeleteConfig,
};