class Account extends Entity {
  
  static url = '/account/';

  static get(id = '', callback){

      createRequest({
        url: this.URL + id,
        data,
        method:'GET',
        callback,
        id
      });
  }
}
