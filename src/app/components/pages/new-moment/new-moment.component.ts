import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/interfaces/Moment'; // importando a interface
import { MomentService } from 'src/app/services/moment/moment.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnValue = "Compartilhar!";

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService, // inicializando serviço de mensageria para usar a função "messagesService.add()". Essa função foi definida no arquivo "messages.service.ts"
    private router: Router // inicializando serviço que permite usar funções de router como "router.navigate()"
  ) { }

  ngOnInit(): void {
  }

  // como vamos ter operações assíncronas com a API, então fazemos o "async"
  async createHandler(event: Moment) {

    // estamos recebendo um objeto com os dados do form, mas precisamos transformá-lo em FormData que é uma estrutura de formulário padrão de envio. 
    // O FormData é do javascript então não precisamos importar nada
    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('description', event.image);
    if(event.image) { // se existir a imagem
      formData.append('image', event.image);
    }

    // enviar para o service p/ cadastrar no banco
    await this.momentService.createMoment(formData).subscribe();

    // exibir msg de sucesso (mensageria)
    this.messagesService.add("Momento adicionado com sucesso!");

    // redirecionar user para outra página após enviar o form
    this.router.navigate(['/']);

    // Outra forma de escrever os comendos acima:
    // this.momentService.createMoment(formData).subscribe({
    //   next: () => {
    //     this.messagesService.add("Momento adicionado com sucesso!");
    //     this.router.navigate(['/']);
    //   }
    // });

  }

}
