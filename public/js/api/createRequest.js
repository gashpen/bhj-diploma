const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  const responseServer = options.callback;
  
  let arr = [];
  for (let elem in options.data) {
    arr.push(options.data[elem]);
  };

  options.method === 'GET' ?  xhr.open(options.method, `${options.url}?${arr[0]}&${arr[1]}`) : ( 
    formData.append('mail', arr[0]),
    formData.append('password', arr[1]),
    xhr.open(options.method, options.url))
 
  options.method === 'GET' ?  xhr.send() : xhr.send(formData);

  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    responseServer(err = null,response = xhr.responseText);
  });

  xhr.addEventListener('error', () => {
    responseServer(err = xhr.responseStatus);
  });
};






