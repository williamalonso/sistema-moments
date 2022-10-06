import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moment  } from 'src/app/interfaces/Moment'; // importando a interface
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  private baseApiUrl = environment.baseApiUrl; // esse environment é um objeto que vem do arquivo "environment.ts". Aqui estamos acessando a url lá definida.
  private apiUrl = `${this.baseApiUrl}api/moments`; // url completa da api

  constructor(private http: HttpClient) { }

  createMoment(formData: FormData): Observable<FormData> {
    // como estamos criando dados para salvar no backend, usamos o verbo "http.post"
    return this.http.post<FormData>(this.apiUrl, formData);
  }

}
