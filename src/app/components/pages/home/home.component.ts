import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment/moment.service'; // importando o serviço de mensagem
import { Moment } from 'src/app/interfaces/Moment'; // importando a Interface
import { environment } from 'src/environments/environment'; // importando environment para usar a url da api
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // importando para usar ícone de Busca

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // ngClass
  homeContainer = ["home-container"];
  momentsContainer = ["moments-container"];
  momentClass = ["moment"];
  date = ["date"];
  searchContainer = ["search-container"];

  // array para pegar os Momentos do Banco
  allMoments: Moment[] = [];

  // array para filtrar o que vai ser exibido depois da Busca
  moments: Moment[] = [];

  // busca a url da Api do arquivo "environment.ts"
  baseApiURL = environment.baseApiUrl;

  constructor(
    private momentService: MomentService // inicializando no construtor o nosso Serviço Moment
  ) { }

  ngOnInit(): void {

    // chama a função getMoment() do serviço "moment.service.ts" que lista todos os dados do Banco
    this.momentService.getMoments().subscribe( (items) => {
      //console.log(items);
      const data = items.data;
      data.map( (item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR'); // Formatando a data antes de adicionar em nosso sistema. A "!" é para informar que o dado vai existir, pois lá na interface nós colocamos "?" (informando que é opcional).
      })
      this.allMoments = data // insere os dados do back em nosso array
      this.moments = data;
    });

  }

  // Faz a pesquisa no campo de Busca
  faSearch = faSearch // para ter acesso ao icone da Lupa
  searchTerm: string = '';
  search(e: Event): void { // aqui estamos usando o Event pois ele está derivando de um evento lá no input do html

    const target = e.target as HTMLInputElement; // pegamos o html que está sendo exibido em nosso input
    const value = target.value;

    this.moments = this.allMoments.filter( (moment) => { // vamos filtar o allMoments
      return moment.title.toLowerCase().includes(value); // O 'lower case' é para deixar tudo em minúsculo. O 'includes' verifica se meu texto contém outro texto, no caso, o "value" que veio do input html
    })
  }

}
