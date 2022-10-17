import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Moment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment/moment.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {

  // ngClass
  momentClass = ["moment"];

  moment?: Moment; // esse é o nosso Momento em si. A "?" significa que ele é opcional, e seu tipo é Moment (uma interface).

  constructor( private momentService: MomentService, private route: ActivatedRoute ) { // inicializando nosso service "MomentService". O ActivatedRoute é para trazer o id para usar no ngOnInit

  }

  ngOnInit(): void {
    // precisamos trazer o id que está na url
    const id = Number(this.route.snapshot.paramMap.get("id"));

    // função get que traz os dados do service.
    this.momentService.getMoment(id).subscribe( (item) =>  {
        //console.log(item.data);
        this.moment = item.data // atribui os dados do backend para a variável 'moment'
        console.log(this.moment);
      });
  }

}
