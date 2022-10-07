import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages/messages.service'; // importando o serviço de mensagem


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  faTimes = faTimes; // para usar o fontawesome no html

  message = ["message"]; // css
  messageHeader = ["message-header"];
  clear = ["clear"];

  constructor(public messagesService: MessagesService) { } // inicializando serviço de mensagem. É public para o html ter acesso. Esse "MessagesService" é o service que eu criei chamado "messages.service.ts"

  ngOnInit(): void {
  }

}
