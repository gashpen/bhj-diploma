/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */


class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   **/
  constructor( element ) {

    if(!element){
      throw new Error('Передан пустой элемент')
    }

    this.element = element
    this.registerEvents()
    this.update()
  }
  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click',(e)=>{

      e.preventDefault()
      const createAccountBtn = e.target.closest(".create-account");
      const accBtn = e.target.closest(".account");

      if (createAccountBtn) {
        return App.getModal("createAccount").open();
      }

      if (accBtn) {
        this.onSelectAccount(accBtn);
      }
    })
    
  }
  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const userCurrent = User.current();
    if(!userCurrent){
      return;
    }
    Account.list(userCurrent, (err, response) => {
      if (response && response.success) {
        this.clear();
        this.renderItem(response.data);
      }
    });
  }
  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
   const allAccounts = this.element.querySelectorAll('.account')
    allAccounts.forEach(elem =>{
      elem.remove()
    })
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const accountsActive = this.element.querySelectorAll('.active');
    element.classList.add("active");

    accountsActive.forEach(elem =>{
      elem.classList.remove('active')
    })

    App.showPage("transactions", { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    let { id, name , sum } = item;
    return `<li class="active account" data-id="${id}">
                <a href="#">
                    <span>${name}</span>
                    <span>${sum}</span>
                </a>
            </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    data.forEach((elem) => {
      this.element.insertAdjacentHTML("beforeend", this.getAccountHTML(elem));
    });
  }
}
