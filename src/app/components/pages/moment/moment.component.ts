import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/interfaces/Moment';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  // ngClass
  momentClass = ["moment"];
  aboutMoment = ["about-moment"];
  actions = ["actions"];
  editBtn = ["edit-btn"];
  removeBtn = ["remove-btn"];
  comments = ["comments"];

  // para usar ícone do fontawesome no html
  faTimes = faTimes
  faEdit = faEdit

  // busca a url da Api do arquivo "environment.ts"
  baseApiURL = environment.baseApiUrl;

  moment?: Moment; // esse é o nosso Momento em si. A "?" significa que ele é opcional, e seu tipo é Moment (uma interface).

  constructor( 
    private momentService: MomentService, // inicializando nosso service "MomentService".
    private route: ActivatedRoute, // O ActivatedRoute é para trazer o id para usar no ngOnInit
    private messageService: MessagesService, // chamando servico de Mensageria
    private router: Router // serviço de rotas
    ) {}

  ngOnInit(): void {
    // precisamos trazer o id que está na url
    const id = Number(this.route.snapshot.paramMap.get("id"));

    // função get que traz os dados do service.
    this.momentService.getMoment(id).subscribe( (item) =>  {
        //console.log(item.data);
        this.moment = item.data // atribui os dados do backend para a variável 'moment'
        //console.log(this.moment);
      });
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe(); // vou esperar o registro ser excluído pelo Banco
    this.messageService.add("Momento excluído com sucesso!"); // exibe mensagem de sucesso
    this.router.navigate(['/']); // redireciona para home
  }

}
