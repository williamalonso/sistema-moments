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
    console.log("removendo animal...");
    console.log(animal);
    this.animals = this.listService.remove(this.animals, animal);
  }

  getAnimals(){
    this.listService.getAll().subscribe((x) => (this.animals = x));
  }

}
