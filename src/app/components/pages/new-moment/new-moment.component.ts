import { Component, OnInit } from '@angular/core';
import { Moment } from 'src/app/interfaces/Moment'; // importando a interface
import { MomentService } from 'src/app/services/moment/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnValue = "Compartilhar!";

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
  }

  // como vamos ter operações assíncronas com a API, então fazemos o "async"
  async createHandler(event: Moment) {
    console.log(event);
    // estamos recebendo um objeto do form, mas precisamos transformá-lo em FormData que é uma estrutura de formulário padrão de envio. 
    // O FormData é do javascript então não precisamos importar nada
    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('description', event.image);
    if(event.image) {
      formData.append('image', event.image);
    }

    // enviar para o service p/ cadastrar no banco
    await this.momentService.createMoment(formData).subscribe();

    // exibir msg de sucesso (mensageria)
    
    // redirecionar user para outra página após enviar o form

  }

}
