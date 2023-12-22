import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonApiResponse } from '../../models/PokemonApiResponse';
import { PokemonCard } from '../../models/PokemonCard';

@Injectable({
  providedIn: 'root',
})
export class PokemonResourceService {
  private baseUrl = 'https://api.pokemontcg.io/v2';

  private cache: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  public content(): Observable<any> {
    if (this.cache.getValue() !== null) {
      // load pokemon cards from cache
      return new Observable<any>((observer) => {
        observer.next(this.cache.getValue());
      })
    };
    // load pokemon cards from api source
    return this.http.get<PokemonApiResponse>(`${this.baseUrl}/cards`).pipe(
      map((res) => {
        this.cache.next(res.data);
        return this.cache.getValue();
      })
    );
  }

  public getCard(id: string): Observable<PokemonCard | null> {
    return this.content().pipe(
      map((response) => {
        const card = response.data.find((c: { id: string; }) => c.id === id);
        return card ? card as PokemonCard : null;
      })
    );
  }

}