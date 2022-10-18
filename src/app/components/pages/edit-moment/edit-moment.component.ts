import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Moment } from 'src/app/interfaces/Moment';
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
    private route: ActivatedRoute // O ActivatedRoute é para trazer o id para usar no ngOnInit
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get("id")); // precisamos trazer o id que está na url
    
    this.momentService.getMoment(id).subscribe( (item) =>  { // função get que traz os dados do service.
      //console.log(item.data);
      this.moment = item.data // atribui os dados do backend para a variável 'moment'
      //console.log(this.moment);

  });
  }

}
