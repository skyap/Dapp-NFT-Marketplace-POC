import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted')
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      })
    }, 1000);

    // abort the fetch
    return () => abortCont.abort();
  }, [url])

  return { data, isPending, error };
}


const fetchData = (url) => {
    // const [data, setData] = useState(null);
    // const [isPending, setIsPending] = useState(true);
    // const [error, setError] = useState(null);

    let data=null;
    let isPending = true;
    let error=null;

    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
      } 
      return res.json();
    })
    .then(_data => {
      isPending = false;
      data = _data;
      error =null;
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('fetch aborted')
      } else {
        // auto catches network / connection error
        isPending = false;
        error = err.message;
      }
    })  

    // abort the fetch
    return () => abortCont.abort();

  return { data, isPending, error };
}
 
export  {useFetch,fetchData};
