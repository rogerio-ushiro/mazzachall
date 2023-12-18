import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonCard } from '../models/PokemonCard'; // Import PokemonCard interface

@Injectable({
  providedIn: 'root',
})
export class PokemonResourceService {
  private baseUrl = 'https://api.pokemontcg.io/v2';

  constructor(private http: HttpClient) { }

  getCards(): Observable<PokemonCard[]> {
    return this.http.get<PokemonCard[]>(`${this.baseUrl}/cards`);
  }
}