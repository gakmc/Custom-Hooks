import React, { useEffect, useState } from "react";

const localCache = {};

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async () => {
    if (localCache[url]) {
      console.log("Usando Cache local");
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    }
    setLoadingState();

    //Se realiza la consulta a la api
    const resp = await fetch(url);

    //Sleep
    // await new Promise(resolve => setTimeout(resolve,2000))

    //Se evalua en caso que no exista data por algun motivo
    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        },
      });
      return;
    }

    //si contiene data
    const data = await resp.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });
  //cache
  localCache[url] = data;
  };


  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
