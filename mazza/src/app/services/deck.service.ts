import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { PokemonCard } from '../../models/PokemonCard';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private cache: BehaviorSubject<any> = new BehaviorSubject([]);

  public createDeck(deckName: string): Observable<Deck> {
    let decks: Deck[] = this.getAllDecks();
    const existingDeck = this.findDeckByName(deckName);

    if (!existingDeck) {
      const newDeck: Deck = {
        id: decks.length + 1, // Use a proper way to generate unique IDs
        name: deckName,
        cards: [],
      };

      decks.push(newDeck);
      this.cache.next([...decks]);
      return of(newDeck); // Import 'of' from 'rxjs' to create an Observable
    } else {
      return throwError(new DuplicateDataError(`Deck '${deckName}' already exists.`)); // Import 'throwError' from 'rxjs'
    }
  }

  public getAllDecks(): Deck[] {
    return this.cache.getValue();
  }

  public findDeckById(id: number) {
    let decks: Deck[] = this.getAllDecks();
    return decks.find(e => e.id == id);
  }

  public findDeckByName(name: string) {
    let decks: Deck[] = this.getAllDecks();
    return decks.find(e => e.name == name);
  }

}

interface Deck {
  id: number
  name: string
  cards: number[]
}

class DuplicateDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateDataError";
  }
}