import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string = ''; // essa mensagem vai ser exibida no popup

  constructor() { }

  // adiciona mensagem
  add(message: string) {
    this.message = message;
    setTimeout( () => {
      this.clear()
    } , 4000);
  }

  // limpa mensagem
  clear() {
    this.message = '';
  }

}
