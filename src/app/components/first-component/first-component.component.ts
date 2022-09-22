import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {

  class = ["class"];
  
  name: string = 'William'; // estamos explicitando o tipo string
  age: number = 30;
  hobbies = ['Correr', 'Jogar', 'Estudar'];
  car = {
    name: 'Polo',
    year: 2019,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
