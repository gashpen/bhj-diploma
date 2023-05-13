class Account extends Entity {
  
  static url = '/account/2';

  static get(id = '', callback){

      createRequest({
        url: this.url,
        data,
        method:'GET',
        callback,
        id
      });
  }
}
