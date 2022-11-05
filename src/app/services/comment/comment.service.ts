import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/interfaces/Comment';
import { Response } from 'src/app/interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseApiUrl = environment.baseApiUrl; // esse environment é um objeto que vem do arquivo "environment.ts". Aqui estamos acessando a url lá definida.
  private apiUrl = `${this.baseApiUrl}api/moments`; // parte da url da api (é determinada pela própria api)

  constructor(private http: HttpClient) { }

  // cria o comentário no Backend
  createComment(data: Comment): Observable<Response<Comment>> { // aqui estamos esperando dados que virão no formato da interface de 'Comment'. Também estamos dizendo que vamos receber uma resposta (Response) que vai conter um único elemento de 'Comment'. Se fosse retornar vários elementos, teria um '[]' no final: <Comment[]>

    const url = `${this.apiUrl}/${data.momentId}/comments`; // monta a url completa

    // como estamos criando dados para salvar no backend, usamos o verbo "http.post"
    return this.http.post<Response<Comment>>(url, data);
  }
}
