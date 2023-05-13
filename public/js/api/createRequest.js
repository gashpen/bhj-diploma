const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  const responseServer = options.callback;

  if(options.method === 'GET'){
    xhr.open(options.method, options.data);
  } else {
    xhr.open(options.method, options.url);
  }
  
  options.method === 'GET' ?  xhr.send() : xhr.send(formData);

  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    responseServer(err = null,response = JSON.parse(xhr.responseText));
  });

  xhr.addEventListener('error', () => {
    responseServer(err = JSON.parse(xhr.responseStatus));
  });
};

module.exports = {
  createRequest,
  xhr
};