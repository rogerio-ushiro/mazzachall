import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonApiResponse } from '../models/PokemonApiResponse';

@Injectable({
  providedIn: 'root',
})

export class PokemonResourceService {
  private baseUrl = 'https://api.pokemontcg.io/v2';

  constructor(private http: HttpClient) { }

  getCards(): Observable<PokemonApiResponse> {
    return this.http.get<PokemonApiResponse>(`${this.baseUrl}/cards`);
  }
}