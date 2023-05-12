const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  const responseServer = options.callback;
  
  for (elem in options.data) {

    if(options.method === 'GET'){
      xhr.open(options.method, options.data[elem]);
    } else {
      formData.append('data',options.data[elem]);
      xhr.open(options.method, options.url);
    }
  };

  options.method === 'GET' ?  xhr.send() : xhr.send(formData);

  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    responseServer(err = null,response = xhr.responseText);
  });

  xhr.addEventListener('error', () => {
    responseServer(err = xhr.responseStatus);
  });
};