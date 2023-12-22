import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonApiResponse } from './types/PokemonApiResponse';
import { Card } from './types/Card';

@Injectable({
  providedIn: 'root',
})
export class PokemonResourceService {
  private baseUrl = 'https://api.pokemontcg.io/v2';
  private cache: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  public content(): Observable<any> {

    if (this.cache.getValue() !== null) {
      return new Observable<Card[]>((observer) => {
        observer.next(this.cache.getValue());
      })
    };

    console.log("loading card list from api resource...");
    return this.http.get<PokemonApiResponse>(`${this.baseUrl}/cards`).pipe(
      map((res) => {
        console.log("card list was loaded successfully ");
        this.cache.next(res.data);
        return this.cache.getValue();
      })
    );

  }

  public getCard(id: string): Observable<Card | null> {
    return this.content().pipe(
      map((response) => {
        const card = response.data.find((c: { id: string; }) => c.id === id);
        return card ? card as Card : null;
      })
    );
  }

}