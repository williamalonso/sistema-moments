import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'src/app/interfaces/Moment';


@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  // estamos emitindo o evento "onSubmit" para o componente pai "new-moment". O <Moment> é a interface
  @Output() onSubmit = new EventEmitter<Moment>();

  @Input() btnText!: string; // esse btnText vem do componente 'pai' chamado "new-moment"
  @Input() momentData: Moment | null = null; // estamos declarando essa variável e seu valor vem do componente Pai "edi-moment.component.ts". Ele é do tipo "Moment" ou "null" pois nem sempre vou ter ele. Além disso, seu valor é iniciado com null também.

  momentForm!: FormGroup // Essa declaração é para usar o [formGroup] no html.
  

  // ngClass
  formGroup = ["form-group"];
  validationError = ["validation-error"];

  constructor() { }

  ngOnInit(): void {

    // Procedimento padrão. Estamos criando um objeto.
    this.momentForm = new FormGroup({

      // Os campos aqui estão vazios, mas quando os dados vierem, eles vão ser preenchidos.
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]), // aqui está especificando que o "title" é obrigatório
      description: new FormControl('', [Validators.required]), // aqui está especificando que o "description" é obrigatório
      image: new FormControl('')

    })
  }

  // Funções Getters
  get title() { // Essa função é para o " *ngIf='title.invalid' " funcionar
    return this.momentForm.get('title')!; // a exclamação no final é para confirmar ao Angular que esse dado vai existir
  }
  get description() { // Essa função é para o " *ngIf='description.invalid' " funcionar
    return this.momentForm.get('description')!; // a exclamação no final é para confirmar ao Angular que esse dado vai existir
  }

  // Essa função joga a imagem para o "momentForm"
  onFileSelected(event: any) {
    // vou pegar o arquivo do input (a imagem)
    const file: File = event.target.files[0];
    this.momentForm.patchValue({image: file});

  }

  submit() {

    if(this.momentForm.invalid) { // se o meu formulário for inválido (campos vazios), eu não deixo ele terminar o Submit. A função trava aqui.
      return;
    }
    // console.log(this.momentForm.value);

    this.onSubmit.emit(this.momentForm.value); // estou enviando os dados do form para o componente pai "new-moment"
  }

}
