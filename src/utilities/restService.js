// @flow

import { set, isEmpty } from 'lodash';

export async function restService({ api, third_party, method, params }) {
  const headers = {};

  let path;

  if (process.env.REACT_APP_ENV !== 'prod') {
    path = `${process.env.REACT_APP_DEVELOPMENT_API}${api}`;
  } else {
    path = `${process.env.REACT_APP_PRODUCTION_API}${api}`;
  }

  if (third_party) {
    path = api;
  }

  set(headers, 'Accept', 'application/json');
  set(headers, 'Content-Type', 'application/json');

  const reqBody = {
    method,
    headers
  };

  if (!isEmpty(params)) {
    reqBody.body = JSON.stringify(params);
  }

  return fetch(path, reqBody)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (third_party) {
        return {
          result: 'ok',
          data
        };
      }
      return data;
    })
    .catch(error => {
      return {
        result: 'error',
        message: error
      };
    });
}
