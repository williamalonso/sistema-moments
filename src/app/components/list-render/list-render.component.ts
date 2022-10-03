import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/Animal';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.css']
})
export class ListRenderComponent implements OnInit {

  animals: Animal[] = [];

  class = ["class"];

  animalDetails = '';

  constructor(private listService: ListService) {
    this.getAnimals();
  }

  ngOnInit(): void {
  }

  showAge(animal: Animal) {
    this.animalDetails = `O pet ${animal.name} tem ${animal.age} anos`;
  }

  removeAnimal(animal: Animal) {
    this.animals = this.animals.filter( (i) => animal.name != i.name ); // esse filter percorre todos os animais do meu objeto. O "animal.name" vem do evento click do html. O filter então verifica se eu possuo algum objeto com o nome igual ao que veio do html. Se tiver algum igual, ele remove, se forem diferentes eles ficam.
    this.listService.remove(animal.id).subscribe(); // aqui removemos os itens do nosso arquivo 'db.json'. O "subscribe" aqui é só a invocação, pois é a maneira do angular dizer que o evento foi executado.
  }

  getAnimals(){
    this.listService.getAll().subscribe((x) => (this.animals = x));
  }

}
