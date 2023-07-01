const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  let { url, data, method, callback } = options;

  let formData = new FormData();

  if (method == "GET") {
    url = url + "?";
    for (let key in data) {
      url += key + "=" + data[key] + "&";
    }
    url = url.slice(0, -1);
  } else {
    for (let key in data) {
      formData.append(key, data[key]);
     }
  }

  xhr.addEventListener("load",()=>{
      callback(xhr.response.error, xhr.response);
  });
  
  
  try {
    xhr.open(method, url);
    xhr.send(formData);  
  } catch (error) {
    callback(error);
  }
};