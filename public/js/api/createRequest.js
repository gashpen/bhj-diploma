const { response } = require("express");

const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  const responseServer = options.callback;
  
  let arr = [];
  for (let elem in options.data) {
    arr.push(options.data[elem]);
  };

  if (options.method === 'GET') {
    xhr.open(options.method, `${options.url}?${arr[0]}&${arr[1]}`);
    xhr.send();
  };

  if (options.method != 'GET') {
    formData.append('mail', arr[0]);
    formData.append('password', arr[1]);

    xhr.open(options.method, options.url);
    xhr.send(formData);
  };

  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    responseServer(err = null, xhr.responseText);
  });

  xhr.addEventListener('error', () => {
    responseServer(xhr.responseStatus);
  })
};






