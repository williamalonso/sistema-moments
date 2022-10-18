import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'src/app/interfaces/Moment';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { MomentService } from 'src/app/services/moment/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  moment!: Moment; // esse é o nosso Momento em si. A "!" significa que ele vai vir com certeza, e seu tipo é Moment (uma interface).
  btnText: string = 'Editar'; // mensagem do botão que vamos enviar para o Form

  constructor( 
    private momentService: MomentService, // inicializando nosso service "MomentService"
    private route: ActivatedRoute, // O ActivatedRoute é para trazer o id para usar no ngOnInit
    private messagesService: MessagesService, // ativando serviço de mensageria
    private router: Router // serviço de rotas
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get("id")); // precisamos trazer o id que está na url
    
    this.momentService.getMoment(id).subscribe( (item) =>  { // função get que traz os dados do service.
      //console.log(item.data);
      this.moment = item.data // atribui os dados do backend para a variável 'moment'
      //console.log(this.moment);

    });
  }

  async editHandler(momentData: Moment) { // O "async" é para remover erro lá no "await"

    const id = this.moment.id; // pega o id do meu 'moment'

    const formData = new FormData(); // mesmo procedimento do 'new-moment.component.ts'
    formData.append('title', momentData.title); // isso é para enviarmos os dados para o service
    formData.append('description', momentData.description);
    if(momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.momentService.updateMoment(id!, formData).subscribe(); // precisa colocar "!" para informar que o id vai existir.

    // enviamos mensagem para usuário
    this.messagesService.add(`Momento ${id} atualizado com sucesso!`);

    // redireciona usuário
    this.router.navigate(['/']);
  }

}
