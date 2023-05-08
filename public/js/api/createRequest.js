const { response } = require("express");

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData()
  
    if (options.method === 'GET') {
      xhr.open(options.method, `${options.url}?${options.data.mail}&${options.data.password}`);
      xhr.send();
    };
  
    if (options.method != 'GET') {
      formData.append('mail', options.data.mail);
      formData.append('password', options.data.password);
  
      xhr.open(options.method, options.url);
      xhr.send(formData);
    };
  
    xhr.responseType = 'json';
  
    xhr.addEventListener('readystatechange', () => {
  
      if (xhr.readyState === 4 && xhr.status === 200) {
       let response = xhr.responseText
        console.log(response)
      } else {
       let err = xhr.responseStatus
        console.log(err)
      }
    });
  };