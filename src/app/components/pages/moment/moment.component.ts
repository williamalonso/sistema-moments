import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'src/app/interfaces/Moment';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { MomentService } from 'src/app/services/moment/moment.service';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/interfaces/Comment'; // importando a interface "Comment"
import { CommentService } from 'src/app/services/comment/comment.service'; // importando o serviço do comentário
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'; // para trabalhar com o formulário do Comentário

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

  commentForm!: FormGroup // a "!" é para informar ao Angular que essa entidade vai existir

  constructor( 
    private momentService: MomentService, // inicializando nosso service "MomentService".
    private route: ActivatedRoute, // O ActivatedRoute é para trazer o id para usar no ngOnInit
    private messageService: MessagesService, // chamando servico de Mensageria
    private router: Router, // serviço de rotas
    private commentService: CommentService // serviço de Comentários
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

    // Procedimento padrão. Estamos criando um objeto.
    this.commentForm = new FormGroup({
      text: new FormControl("", [Validators.required]), // Aqui ele vai iniciar com uma string vazia, e o "[Validators.required" está especificando que o "title" é obrigatório
      username: new FormControl("", [Validators.required])
    })
  }

  // Funções Getters
  get text() { // Procedimento padrão ao usar o "new FormGroup" no "ngOnInit"
    return this.commentForm.get('text')!; // a exclamação no final é para confirmar ao Angular que esse dado vai existir para não dar erro na página Html
  }
  get username() { // // Procedimento padrão ao usar o "new FormGroup" no "ngOnInit"
    return this.commentForm.get('username')!; // a exclamação no final é para confirmar ao Angular que esse dado vai existir para não dar erro na página Html
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe(); // vou esperar o registro ser excluído pelo Banco
    this.messageService.add("Momento excluído com sucesso!"); // exibe mensagem de sucesso
    this.router.navigate(['/']); // redireciona para home
  }

  // Essa função é acionada quando eu enviar o formulário de comentários na página Html
  async onSubmit(formDirective: FormGroupDirective) {
    // não deixa enviar o formulário se os campos estão vazios
    if(this.commentForm.invalid) {
      return;
    }

    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.moment!.id);

    await this.commentService.createComment(data).subscribe( (x) => this.moment!.comments!.push(x.data) ); // adiciona os valores do formulário no backend e no frontend

    this.messageService.add("Comentário adicionado!"); // adiciona mensagem para usuário

    this.commentForm.reset(); // limpa o formulário do backend
    formDirective.resetForm(); // reseta o formulário do frontend
  }

}
