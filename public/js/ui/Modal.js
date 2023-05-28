
/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 **/
class Modal {
  
  constructor(element){

    if(!element){
      throw new Error('Пустой элемент'); 
    }
      this.element = element;
      this.registerEvents();  
  }

  registerEvents() {
    const closeBtn = document.querySelectorAll('[data-dismiss="modal"]');
    closeBtn.forEach((elemBtn)=>{
      elemBtn.addEventListener('click',(e)=>{
        this.onClose(e);
      });
    });
  };

  onClose(e) {
    this.close();
    e.preventDefault();
  };

  open() { 

    this.element.style.display = 'block';

  };
  
  close(){

    this.element.style.display = 'none';

  };
  
};
