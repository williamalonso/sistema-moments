import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @Input() btnText!: string;

  momentForm!: FormGroup // Essa declaração é para usar o [formGroup] no html.

  formGroup = ["form-group"]; // css class
  validationError = ["validation-error"]; // css class

  constructor() { }

  ngOnInit(): void {
    this.momentForm = new FormGroup({

      // Os campos aqui estão vazios, mas quando os dados vierem, eles vão ser preenchidos.

      id: new FormControl(''),
      title: new FormControl('', [Validators.required]), // aqui está especificando que o "title" é obrigatório
      description: new FormControl('', [Validators.required]), // aqui está especificando que o "description" é obrigatório
      image: new FormControl('')

    })
  }

  // Funções Getters
  get title() {
    return this.momentForm.get('title')!; // a exclamação no final é para confirmar ao Angular que esse dado vai existir
  }
  get description() {
    return this.momentForm.get('description')!; // a exclamação no final é para confirmar ao Angular que esse dado vai existir
  }

  submit() {

    if(this.momentForm.invalid) { // se o meu formulário for inválido (campos vazios), eu não deixo ele terminar o Submit. Dessa forma, o console.log abaixo não é exibido.
      return;
    }
    console.log("Enviou o formulário");
  }

}
