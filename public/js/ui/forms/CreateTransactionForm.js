

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountsSelect = this.element.querySelector(".accounts-select");
    accountsSelect.innerHTML = "";
    Account.list(User.current(), (err, response) => {

      if (response && response.success) {
        accountsSelect.innerHTML = response.data.reduce((sum,{id,name})=>{
          return sum + `<option value="${id}">${name}</option>`;
        },0)
        
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err ,response)=>{
      this.element.reset();
      if (response && response.success) {
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();
      } else {
        alert(response.error)
      }
    })
  }
}