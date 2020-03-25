const defaultGetConfig = {
    reqHeaders: {
      "Content-type": "application/json"
    },
    isPaginated: false,
    paginationKey: 'page',
    errorComponent: 'Error Loading Data',
};

const defaultPostConfig = {
    reqHeaders: {
      "Content-Type": "application/json",
    },
    errorComponent: 'Error Posting Data',
};

const defaultPutConfig = {
    reqHeaders: {
      "Content-Type": "application/json",
    },
    errorComponent: 'Error Updating Data',
};

const defaultDeleteConfig = {
    reqHeaders: {
      "Content-Type": "application/json",
    },
    errorComponent: 'Error Deleting Data',
};

export {
    defaultGetConfig,
    defaultPostConfig,
    defaultPutConfig,
    defaultDeleteConfig,
};