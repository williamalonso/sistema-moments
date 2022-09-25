import { Injectable } from '@angular/core';
import { Animal } from '../interfaces/Animal';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  remove(animals: Animal[], animal: Animal) {    
    return animals.filter( (i) => animal.name != i.name ); // esse filter percorre todos os animais do meu objeto. O "animal.name" vem do evento click do html. O filter então verifica se eu possuo algum objeto com o nome igual ao que veio do html. Se tiver algum igual, ele remove, se forem diferentes eles ficam.
  }
}
