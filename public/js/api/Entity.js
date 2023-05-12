/**
 *
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
const {xhr, createRequest} = require('./createRequest')

class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    xhr.open('GET',Entity.URL);
    xhr.send()
    createRequest({data, callback});
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    xhr.open('PUT',Entity.URL);
    xhr.send()
    createRequest({data, callback});
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    xhr.open('DELETE',Entity.URL);
    xhr.send()
    createRequest({data, callback});
  }
}
