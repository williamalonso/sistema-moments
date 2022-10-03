import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/Animal';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  animal?: Animal; // o animal (dado) pode vir pela URL ou não, por isso a "?"

  classs = ["class"];

  constructor( private listService: ListService, private route: ActivatedRoute ) {
    this.getAnimal();
  }

  ngOnInit(): void {
  }

  getAnimal() { // com essa função, nós acessamos o service e puxamos o dado do Banco
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.listService.getItem(id).subscribe( (x) => (this.animal = x) ); // o subscribe é para pegar o retorno do Service e atribuit ao "animal" da linha 13
  }

}
