class Transaction extends Entity {

    static url = '/transaction';  

  list(data, callback){
    createRequest({
        url: this.URL,
        data,
        method:'GET',
        callback
    });
  }
  create(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method:'PUT',
      callback
    });
  }

  remove(data, callback ) {
    createRequest({
      url: this.URL,
      data,
      method:'DELETE',
      callback
    });
  }
      
};
