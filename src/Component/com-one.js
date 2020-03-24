import React from 'react'
import { useGet, usePost } from '../request-hooks';

const pHeaders = {
    "Content-type": "application/json; charset=UTF-8"
}

const ComOne = () => {
  const [states, methods] = useGet();
  const [pStates, pMethods] = usePost(pHeaders);

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
  
  if(states.loading) return <div className="App">loading....</div>;
  if(states.error) return <div className="App">{states.error}</div>;
  if(states.empty) return <div className="App">empty</div>;
  if(states.res)
    return (
        <div>
          <button onClick={handleRetry}>retry ?</button>
          <button onClick={handleRetryInfinte}>retry infinite ?</button>
          <button onClick={handlePost}>Post</button>
          {renderPost()}
        </div>
    )
  return null;
}

export default ComOne
