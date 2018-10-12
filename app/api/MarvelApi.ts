import qs from 'qs';
import md5 from 'md5';
import axios from 'axios';

import { marvelApi } from '../config.json';

const { hostname, basePath, publicKey, privateKey } = marvelApi;

console.log(marvelApi);

const callApi = async (path: string, payload: any) => {
  const ts = Date.now();
  const hash = md5(`${ts}${privateKey}${publicKey}`);
  const queryObj = {
    ...payload,
    hash,
    ts,
    apikey: publicKey,
  };

  console.log(queryObj);

  const query = `?${qs.stringify(queryObj)}`;
  const url = `${hostname}${basePath}${path}${query}`;

  try {
    const response = await axios.get(url);
    return response.data.data.results;
  } catch (error) {
    console.warn('marvel api error', error);
  }
};

export const callMarvelApi = (path: string, params?: any) => {
  return callApi(path, params);
};
