import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moment } from 'src/app/interfaces/Moment'; // importando a interface
import { Response } from 'src/app/interfaces/Response'; // importando a interface Response para criar o método "getMoments()"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  private baseApiUrl = environment.baseApiUrl; // esse environment é um objeto que vem do arquivo "environment.ts". Aqui estamos acessando a url lá definida.
  private apiUrl = `${this.baseApiUrl}api/moments`; // url completa da api

  constructor(private http: HttpClient) { }

  // cria o dado no Backend
  createMoment(formData: FormData): Observable<FormData> {
    // como estamos criando dados para salvar no backend, usamos o verbo "http.post"
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  // traz todos os momentos (select * from...)
  getMoments(): Observable<Response<Moment[]>> { // Aqui estamos dizendo que vamos receber uma resposta (Response) que vai conter um array de Moment
    return this.http.get<Response<Moment[]>>(this.apiUrl); // verbo get para trazer os dados
  }

  // método individual para um id do Banco. Equivalente à página que traz os dados de um id do CRUD
  getMoment(id: number): Observable<Response<Moment>> { // mesma declaração da função getMomentS mas sem o "[]" pois vai trazer somento 1 dado e não um array
    const url = `${this.apiUrl}/${id}`; // url com id de cada item da home page
    return this.http.get<Response<Moment>>(url); // procura pela url informada
  }

  removeMoment(id: number) {
    const url = `${this.apiUrl}/${id}`; // url com id de um item específico do Banco
    return this.http.delete(url); // procura pela url informada e deleta o item de acordo com o id
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> { // aqui a função recebe os dados do Form, e ele optou por passar o id separado
    const url = `${this.apiUrl}/${id}`; // url com id do meu item
    return this.http.put<FormData>(url, formData); // além da url, enviamos nossos dados do Form para esse método put()
  }

}
