import React from 'react'
import { useGet, usePost, useDelete, usePut } from '../request-hooks';

const pHeaders = {
    "Content-type": "application/json; charset=UTF-8"
}

const ComOne = () => {
  const [states, methods] = useGet();
  const [pStates, pMethods] = usePost(pHeaders);
  const [dStates, dMethods] = useDelete();
  const [puStates, puMethods] = usePut(pHeaders);

  React.useEffect(() => {
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';
    const query = {userId:1};
    methods.request({endpoint, query});
  }, []);

  const handleRetry = () => {
    const interval = 1000;
    methods.retry(interval, 1, true);
  };

  const handleRetryInfinte = () => {
    const interval = 1000;
    methods.retry(interval, 5, false);
  };

  const handlePost = () => {
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';
    const body = {
        title: 'foo',
        body: 'bar',
        userId: 14
    };

    pMethods.request({endpoint, body});
  };

  const rePost = () => {
    pMethods.retry(1000, 1, true);
  };

  const renderPost = () => {
    if(pStates.loading) return <div>posting...</div>;
    if(pStates.error) return <div>{pStates.error}</div>;
    if(pStates.res) return (
        <div>
            <div>{`title: ${pStates.res.title}`}</div>
            <div>{`body: ${pStates.res.body}`}</div>
            <button onClick={rePost}>RePost</button>
        </div>
    );
    return null;
  };

  const deletePost = () => {
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';
    const params = {
      id: 1,
    };

    dMethods.request({endpoint, params});
  };

  const renderDeleteProgress = () => {
    if(dStates.loading) return <div>deleting...</div>;
    if(dStates.error) return <div>{dStates.error}</div>;
    if(dStates.res) return <div>Deleted!</div>;
    return null;
  };

  const updatePost = () => {
    const params = {
      id: 1
    };
    const endpoint = 'https://jsonplaceholder.typicode.com/posts';
    const body = {
      id: 1,
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    puMethods.request({endpoint, body, params});
  };

  const renderUpdatedPost = () => {
    if(puStates.loading) return <div>updating...</div>;
    if(puStates.error) return <div>{puStates.error}</div>;
    if(puStates.res) return (
        <div>
            <div>{`title: ${puStates.res.title}`}</div>
            <div>{`body: ${puStates.res.body}`}</div>
        </div>
    );
    return null;
  };
  
  if(states.loading) return <div className="App">loading....</div>;
  if(states.error) return <div className="App">{states.error}</div>;
  if(states.empty) return <div className="App">empty</div>;
  if(states.res)
    return (
        <div>
          <button onClick={handleRetry}>retry ?</button>
          <button onClick={handleRetryInfinte}>retry infinite ?</button>
          <button onClick={handlePost}>Post</button>
          <button onClick={deletePost}>DeletePost</button>
          <button onClick={updatePost}>Update</button>
          {renderPost()}
          {renderDeleteProgress()}
          {renderUpdatedPost()}
        </div>
    )
  return null;
}

export default ComOne;
